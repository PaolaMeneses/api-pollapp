import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class User {
  @prop()
  firstname: string;

  @prop()
  lastname: string;

  @prop()
  email: string;

  @prop()
  password: string;
}

const userModel = getModelForClass(User);

export default userModel;
