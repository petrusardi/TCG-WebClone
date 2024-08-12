"use client";
import { WishlistCard } from "@/components/wishlistCard";
import { TWishlist } from "@/types/wishlist.types";
import { WithId } from "mongodb";
import { useEffect, useState } from "react";
export type Wishlist = WithId<TWishlist>;

export default function Page() {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then(setWishlist);
  }, []);

  const removeFromWishlist = async (id: string) => {
    await fetch(`/api/wishlist/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item._id.toString() !== id)
        );
      })
      .catch((error) => {
        console.error("Error removing item from wishlist:", error);
      });
  };

  return (
    <section className="bg-white">
      <h1 className="text-3xl mt-6 text-center text-gray-700 font-extrabold">
        Wish List
      </h1>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {wishlist?.map((wishlistItem) => {
            return (
              <WishlistCard
                key={wishlistItem._id?.toString()}
                wishlist={wishlistItem}
                onRemove={() => removeFromWishlist(wishlistItem._id.toString())}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
