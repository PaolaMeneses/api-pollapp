import { getModelForClass, prop } from "@typegoose/typegoose";

export class Team {
  @prop()
  name: string;

  @prop()
  flag: string;
}

const TeamModel = getModelForClass(Team);
export default TeamModel;
