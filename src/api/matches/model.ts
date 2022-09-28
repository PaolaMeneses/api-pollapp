import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class Prediction {
  @prop()
  board_id: mongoose.Types.ObjectId;

  @prop()
  match_id: mongoose.Types.ObjectId;

  @prop()
  localGoalPrediction: number;

  @prop()
  visitorGoalPrediction: number;

  @prop()
  points: number;
}

const MatchModel = getModelForClass(Prediction);
export default MatchModel;
