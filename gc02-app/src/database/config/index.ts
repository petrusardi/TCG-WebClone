// konek ke mongodb
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI!;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const DB = client.db("TCGhack");
