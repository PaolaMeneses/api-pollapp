import { User } from "../users/model";
import userModel from "./model";

export const createUser = async (newUser: User) => {
  const user = new userModel(newUser);
  await user.save();
  return user;
};

export const updateUser = async (user: User) => {
  await userModel.findByIdAndUpdate(user._id, {
    $set: { password: user.password },
  });
  return user;
};

export const findOneUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email }, null, { lean: User });
  return user;
};
