"use client"
import React from "react";
import { TWishlist } from "@/types/wishlist.types";

type WishlistCardProps = {
  wishlist: TWishlist;
  onRemove: () => void;
};

export const WishlistCard: React.FC<WishlistCardProps> = ({ wishlist, onRemove }) => {
  const { product } = wishlist;

  if (!product) {
    return null;
  }

  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={product.imgUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-700">{product.description}</p>
        <p className="mt-2 text-xl font-semibold text-gray-900">${product.price}</p>
        <button onClick={handleRemove} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Remove
        </button>
      </div>
    </div>
  );
};

