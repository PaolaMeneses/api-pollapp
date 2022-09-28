import { createUser } from "./store";
export const getUsers = () => {
  return [
    {
      id: 12,
      name: "andres",
    },
  ];
};

export const registryUser = async () => {
  const user = await createUser();
  return {
    pong: user,
  };
};
