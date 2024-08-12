
import WishlistButton from "@/components/wishlistButton";
import { Product } from "@/database/models/product.model";

export type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  const data = await Product.findBySlug(params.id);

  if (!data) {
    throw new Error("Product with ID not found");
  }

  return (
    <section className="bg-white">
      <h1 className="text-3xl text-center text-slate-400 mt-5 font-semibold">
        (ONE PIECE CARD GAME)
      </h1>
      <h1 className="text-3xl text-center text-slate-600 mt-5 font-extrabold">
        {data.name}
      </h1>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid w-full grid-cols-1 items-start gap-x-3 gap-y-3 sm:grid-cols-12 lg:gap-x-8">
          <img
            src={data.imgUrl}
            className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg sm:col-span-8"
          />
          <div className="sm:col-span-8 lg:col-span-10">
            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
              {data.name}
            </h2>
            <section aria-labelledby="information-heading" className="mt-2">
              <p className="text-2xl text-gray-900">${data.price}</p>
              <div className="whitespace-pre-line">
                Description: {data.description}
              </div>
              <div className="flex">
                Tags:
                {data.tags.map((tag, index) => (
                  <p key={index} className="whitespace-pre-line">{tag}</p>
                ))}
              </div>
            </section>
            <WishlistButton productId={data._id.toString()} />
          </div>
        </div>
      </div>
    </section>
  );
}
