import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../users/model";

export class Group {
  @prop()
  name: string;

  @prop({ ref: () => User })
  owner: Ref<User>;

  @prop({ default: false })
  isActive: boolean;

  @prop()
  code: string;
}

export default getModelForClass(Group);
