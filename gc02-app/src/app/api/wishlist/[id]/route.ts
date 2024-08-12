import { Wishlist } from "@/database/models/wishlist.model";
import { ObjectId } from "mongodb";

export type WishlistParam = { params: { id: string } };
export async function DELETE(request: Request, { params }: WishlistParam) {
  const WishlistId = params.id;

  try {
    const wishlistId = new ObjectId(WishlistId);
    await Wishlist.deleteOne(wishlistId);
    return new Response(
      JSON.stringify({ message: "Product removed from wishlist" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Internal Server Error:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  
}