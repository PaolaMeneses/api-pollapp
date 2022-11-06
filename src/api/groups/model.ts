import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../users/model";

export class Group {
  _id: string;

  @prop({ required: true })
  name: string;

  @prop({ ref: () => User })
  owner: Ref<User>;

  @prop({ default: true })
  isActive: boolean;

  @prop()
  code: string;
}

const GroupModel = getModelForClass(Group);
export default GroupModel;
