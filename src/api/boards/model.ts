import { getModelForClass, plugin, prop, Ref } from "@typegoose/typegoose";
import { AutoIncrementID } from "@typegoose/auto-increment";
import { Group } from "../groups/model";
import { User } from "../users/model";

@plugin(AutoIncrementID, { field: "number", startAt: 1000 })
export class Board {
  @prop({ ref: () => User, required: true })
  user_id: Ref<User>;

  @prop({ ref: () => Group, required: true })
  group_id: Ref<Group>;

  @prop()
  number: number;

  @prop({ default: null })
  current_pos: number;

  @prop({ default: null })
  previous_pos: number;

  @prop({ default: false })
  isActive: boolean;
}

const BoardModel = getModelForClass(Board);
export default BoardModel;
