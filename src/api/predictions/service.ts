import { getAllPredictionsByBoard, addPredictionInBoard } from "./store";

export const getUserAuthPredictionListByBoard = async () => {
  return await getAllPredictionsByBoard();
};

export const createPredictioInBoard = async () => {
  const group = await addPredictionInBoard();
  return { group };
};
