import * as nano from "nanoid";
import { User } from "./../users/model";
import { Group } from "./model";
import { getGroups, createGroup } from "./store";

export const getGroupList = async () => {
  return await getGroups();
};

export const requestCreateGroup = async (
  newGroup: Group,
  auth: { user: User }
) => {
  const code = nano.nanoid(6);
  const group = await createGroup({ ...newGroup, owner: auth.user, code });
  return { group };
};
