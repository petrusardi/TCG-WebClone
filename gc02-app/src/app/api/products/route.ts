import { Product } from "@/database/models/product.model";

export async function GET(request: Request) {
  const products = await Product.findAll();

  return Response.json(products);
}
