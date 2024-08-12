import CarouselDemo from "@/components/carousel";
import { HomeCard } from "@/components/homeCard";
import { Product } from "@/database/models/product.model";
import Link from "next/link";

export default async function Home() {
  const data = await Product.findFeat();
  return (
    <>
      <div className="flex w-full items-center justify-center mt-10">
        <CarouselDemo />
      </div>
      <div className="bg-white py-8 md:py-32 dark:bg-slate-900 dark:text-slate-100 text-slate-900">
        <div className="p-4">
          <h1 className="text-3xl text-center text-blue-600 font-semibold">
            Find by Card Game
          </h1>
          <ul className="grid md:grid-cols-3 gap-4 mt-8 md:mt-16">
            <li
              className="flex flex-col p-20 shadow dark:shadow-none dark:border dark:border-blue-600 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://tcgrepublic.com/media/binary/000/074/080/74080.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></li>
            <Link
              className="flex flex-col p-20 shadow dark:shadow-none dark:border dark:border-blue-600 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://tcgrepublic.com/media/binary/000/315/014/315014.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              href={"/products"}
            ></Link>
            <li
              className="flex flex-col p-20 shadow dark:shadow-none dark:border dark:border-blue-600 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://tcgrepublic.com/media/binary/000/216/957/216957.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></li>
          </ul>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((prod) => (
          <HomeCard product={prod} key={prod.id?.toString()} />
        ))}
      </div>
      <Link
        href="/products"
        className="flex justify-center mt-5 rounded-md bg-white px-3 py-3 text-sm font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        SEE ALL
      </Link>
    </>
  );
}
