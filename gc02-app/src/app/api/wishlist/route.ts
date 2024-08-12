import { Wishlist } from "@/database/models/wishlist.model";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

export const GET = async (request: NextRequest) => {
  const header = headers();
  const userId = header.get("x-user-id")!;
  const wishlist = await Wishlist.findAllByUserId(userId);
  return NextResponse.json(wishlist);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const wishlistSchema = z.object({
      productId: z.string().min(1, "Product ID required"),
    });

    const { productId } = wishlistSchema.parse(body);
    const header = headers();
    const userId = header.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if the product is already in the wishlist
    const existingWishlistItem = await Wishlist.findByUserIdAndProductId(
      userId,
      productId
    );
    if (existingWishlistItem) {
      return NextResponse.json(
        { message: "Product already in wishlist" },
        { status: 409 }
      );
    }

    const now = new Date();
    const wishlistData = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: now,
      updatedAt: now,
    };

    const wishlistItem = await Wishlist.create(wishlistData);
    return NextResponse.json(
      { message: "Product added to wishlist", wishlistItem },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
