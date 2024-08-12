// components/homeCard.tsx
import { TProduct } from "@/types/product.types";
import { WithId } from "mongodb";
import Link from "next/link";

export type ProductCardProps = {
  product: WithId<TProduct>;
};

export const HomeCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-h-1 relative aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.imgUrl}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            alt={product.name}
          />
          <p className="absolute bottom-0 left-0 bg-lime-400 p-5 text-sm font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 font-extrabold">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
          </div>
        </div>
        <h3 className="text-sm text-gray-700">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.excerpt}
        </h3>
      </Link>
    </div>
  );
};
