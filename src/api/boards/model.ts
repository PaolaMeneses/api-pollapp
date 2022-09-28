import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class Board {
  @prop()
  user_id: mongoose.Types.ObjectId;

  @prop()
  group_id: mongoose.Types.ObjectId;

  @prop()
  number: number;

  @prop()
  current_pos: number;

  @prop()
  previous_pos: number;

  @prop()
  isActive: boolean;
}

const BoardModel = getModelForClass(Board);
export default BoardModel;
