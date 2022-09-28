import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class Group {
  @prop()
  name: string;

  @prop()
  owner: mongoose.Types.ObjectId;

  @prop()
  isActive: boolean;

  @prop()
  code: string;
}

export default getModelForClass(Group);
