import * as nano from "nanoid";
import { User } from "./../users/model";
import { Group } from "./model";
import {
  getGroups,
  createGroup,
  findGroupListByCode,
  findGroupListByUser,
  findGroupListById,
} from "./store";

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

export const getGroupById = async (
  {
    groupId,
  }: {
    groupId: string;
  },
  { user }: { user: User }
) => {
  const group = await findGroupListById(groupId, user);
  return group;
};

export const getCurrentGroupListOrByCode = async (
  {
    code,
  }: {
    code?: string;
  },
  { user }: { user: User }
) => {
  if (code) {
    return findGroupListByCode(code, user);
  }

  return findGroupListByUser(user);
};
