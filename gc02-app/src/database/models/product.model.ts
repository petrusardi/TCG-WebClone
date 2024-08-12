import { TProduct } from "@/types/product.types";
import { DB } from "../config";

const collection = DB.collection<TProduct>("products");
export class Product {
  static async findAll() {
    const products = await collection.find().toArray();
    return products;
  }

  static async findBySlug(slug: string) {
    return await collection.findOne({ slug });
  }
  static async findFeat() {
    const products = await collection.find().limit(8).toArray();
    return products;
  }
} 
