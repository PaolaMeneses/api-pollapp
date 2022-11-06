import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Board } from "../boards/model";
import { Match } from "../matches/model";

export class Prediction {
  _id: string;

  @prop({ ref: () => Board })
  board_id: Ref<Board>;

  @prop({ ref: () => Match })
  match_id: Ref<Match>;

  @prop({ default: null })
  localGoalPrediction: number;

  @prop({ default: null })
  visitorGoalPrediction: number;

  @prop({ default: 0 })
  points: number;
}

const PredictionModel = getModelForClass(Prediction);
export default PredictionModel;
