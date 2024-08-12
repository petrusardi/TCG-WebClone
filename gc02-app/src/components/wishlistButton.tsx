"use client";

import { useEffect, useState } from "react";

export default function WishlistButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist?productId=${productId}`);
        if (response.ok) {
          const data = await response.json();
          setIsInWishlist(data.exists);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkWishlist();
  }, [productId]);

  const addToWishlist = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Product added to wishlist!");
        setIsInWishlist(true);
      } else if (response.status === 409) {
        setIsInWishlist(true);
        setError("Product already in wishlist");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isInWishlist ? (
        <div>
          <button
            disabled
            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
          >
            Added to Wishlist
          </button>
          <a
            href="/wishlist"
            className="ml-4 mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Go to Wishlist
          </a>
        </div>
      ) : (
        <button
          onClick={addToWishlist}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          {loading ? "Adding..." : "Add to Wishlist"}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
}
