import { getGroups, createGroup } from "./store";

export const getGroupList = async () => {
  return await getGroups();
};

export const requestCreateGroup = async () => {
  const group = await createGroup();
  return { group };
};
