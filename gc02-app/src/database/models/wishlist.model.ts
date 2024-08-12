import { TWishlist } from "@/types/wishlist.types";
import { ObjectId } from "mongodb";
import { DB } from "../config";

export class Wishlist {
  static async findAllByUserId(_id: string | ObjectId) {
    const collection = DB.collection<TWishlist>("wishlists");
    if (typeof _id === "string") {
      _id = new ObjectId(_id);
    }

    const wishlist = await collection
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $match: {
            userId: _id,
          },
        },
      ])
      .toArray();

    return wishlist;
  }

  static async findById(_id: string | ObjectId) {
    const collection = DB.collection<TWishlist>("wishlists");
    if (typeof _id === "string") {
      _id = new ObjectId(_id);
    }

    return await collection.findOne({ _id });
  }

  static async create(wishlist: Partial<TWishlist>) {
    const collection = DB.collection<TWishlist>("wishlists");
    const { insertedId } = await collection.insertOne(wishlist as TWishlist);

    return this.findById(insertedId);
  }

  static async deleteOne(wishlistId: ObjectId) {
    const collection = DB.collection<TWishlist>("wishlists");
    const data = await collection.deleteOne({ _id: wishlistId });
    return data;
  }

  static async findByUserIdAndProductId(
    userId: string | ObjectId,
    productId: string | ObjectId
  ) {
    const collection = DB.collection<TWishlist>("wishlists");
    if (typeof userId === "string") {
      userId = new ObjectId(userId);
    }
    if (typeof productId === "string") {
      productId = new ObjectId(productId);
    }

    return await collection.findOne({ userId, productId });
  }
}
