import mongoose from "mongoose";

export async function databaseInit() {
  const db = await mongoose.connect(
    "mongodb://mongo:Cx2riMpB2WummrIn401U@containers-us-west-24.railway.app:6705"
  );

  console.log("database is connected to :>> ", db.connection.db.databaseName);
}
