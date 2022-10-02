import { Board } from "./model";
import {
  getBoardsByUserAndGroup,
  addBoardInGroup,
  activateBoardById,
} from "./store";

export const getCurrentUserBoardsByGroup = async () => {
  return await getBoardsByUserAndGroup();
};

export const createBoardInGroup = async (newBoard: Board) => {
  const board = await addBoardInGroup(newBoard);
  return { board };
};

export const activateBoard = async (boardId: string) => {
  const board = await activateBoardById(boardId);

  return { board };
};
