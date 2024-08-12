import { Product } from "@/database/models/product.model";

export type ProductParam = { params: { id: string } };
export async function GET(request: Request, { params }: ProductParam) {
  const productId = params.id;

  const product = await Product.findBySlug(productId);

  return Response.json(product);
}
