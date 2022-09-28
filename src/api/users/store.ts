import userModel from "./model";

export const createUser = async () => {
  const user = new userModel({
    firstname: "Joe",
    lastname: "Doe",
    email: "joe.doe@email.com",
    password: "password",
  });
  await user.save();
  console.log({ user });
  return user;
};
