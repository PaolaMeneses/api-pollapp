import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Team } from "../teams/model";

class Match {
  @prop({ ref: () => Team })
  localTeam_id: Ref<Team>;

  @prop({ ref: () => Team })
  visitorTeam_id: Ref<Team>;

  @prop({ default: null })
  localGoals: number;

  @prop({ default: null })
  visitorGoals: number;

  @prop({ default: null })
  localGeneralGoals: number;

  @prop({ default: null })
  visitorGeneralGoals: number;

  @prop()
  date: Date;

  @prop()
  isActive: boolean;

  @prop()
  isClosed: boolean;

  @prop()
  phase: string;

  @prop()
  matchNumber: number;
}

const MatchModel = getModelForClass(Match);
export default MatchModel;
