import mongoose from "mongoose";
import { DB_URI } from "./config";

export async function databaseInit() {
  const db = await mongoose.connect(DB_URI);

  console.log("database is connected to :>> ", db.connection.db.databaseName);
}
