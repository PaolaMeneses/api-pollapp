import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class Match {
  @prop()
  localTeam_id: mongoose.Types.ObjectId;

  @prop()
  visitorTeam_id: mongoose.Types.ObjectId;

  @prop()
  localGoals: number;

  @prop()
  visitorGoals: number;

  @prop()
  localGeneralGoals: number;

  @prop()
  visitorGeneralGoals: number;

  @prop()
  date: Date;
}

const MatchModel = getModelForClass(Match);
export default MatchModel;
