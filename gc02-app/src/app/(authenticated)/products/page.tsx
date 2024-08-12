"use client"
import { HomeCard } from "@/components/homeCard";
import { TProduct } from "@/types/product.types";
import { WithId } from "mongodb";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export type Product = WithId<TProduct>;

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []); 

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?page=${page}&perPage=${perPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => {
          const newProducts = data.filter((newProd: Product) => !prevProducts.some((prevProd) => prevProd.id === newProd.id));
          return [...prevProducts, ...newProducts];
        });
        setPage((prevPage) => prevPage + 1); 
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl text-center text-gray-700 font-extrabold">
          Best ONE PIECE CARD GAME
        </h1>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((prod) => (
              <HomeCard product={prod} key={prod.id?.toString()} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}
