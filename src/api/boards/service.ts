import { Board } from "./model";
import {
  getBoardsByUserAndGroup,
  addBoardInGroup,
  activateBoardById,
  getBoardWithPredsByBoardId,
  getBoardByBoardId,
  getBoardWithPreviousPredsByBoardId,
} from "./store";

export const getCurrentUserBoardsByGroup = async () => {
  return await getBoardsByUserAndGroup();
};

export const getBoardWithPreds = async (boardId: string) => {
  const board = await getBoardWithPredsByBoardId(boardId);
  return board;
};

export const getBoardWithPreviousPreds = async (boardId: string) => {
  const board = await getBoardWithPreviousPredsByBoardId(boardId);
  return board;
};

export const getBoardActiveIfExistByBoardId = async (boardId: string) => {
  const board = await getBoardByBoardId(boardId);
  return board;
};

export const createBoardInGroup = async (newBoard: Board) => {
  const board = await addBoardInGroup(newBoard);
  return board;
};

export const activateBoard = async (boardId: string) => {
  const board = await activateBoardById(boardId);

  return board;
};
