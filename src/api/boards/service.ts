import { getBoardsByUserAndGroup, addBoardInGroup } from "./store";

export const getCurrentUserBoardsByGroup = async () => {
  return await getBoardsByUserAndGroup();
};

export const createBoardInGroup = async () => {
  const group = await addBoardInGroup();
  return { group };
};
