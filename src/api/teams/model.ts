import { getModelForClass, prop } from "@typegoose/typegoose";

class Team {
  @prop()
  name: string;

  @prop()
  flag: string;
}

const TeamModel = getModelForClass(Team);
export default TeamModel;
