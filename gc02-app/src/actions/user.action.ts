"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ZodUnknown } from "zod";

export const logoutAction = () => {
  const cookiesStore = cookies();
  cookiesStore.delete("Authorization");
  redirect("/login");
};

export const addToWishlist = async (productId: string) => {
  try {
    // Retrieve the token from cookies on the client-side
    const cookiesStore = cookies();
    const auth = cookiesStore.get("Authorization");
    const token = auth!.value.split(" ")[1];

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Use the token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    console.log("Product added to wishlist successfully");
  } catch (error: any) {
    console.error("Error adding product to wishlist:", error.message);
  }
};  
