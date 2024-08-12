import { ObjectId } from "mongodb";
import { DB } from "../config";
import { TUser } from "@/types/user.types";

const collection = DB.collection<TUser>("users");
export class User {
  static async findById(_id: string | ObjectId) {
    if (typeof _id === "string") {
      _id = new ObjectId(_id);
    }

    return await collection.findOne({ _id });
  }

  static async findByEmail(email: string) {
    return await collection.findOne({ email });
  }

  static async create(user: Partial<TUser>) {
    const { insertedId } = await collection.insertOne(user as TUser);

    return this.findById(insertedId);
  }
}
