import {
  getAllPredictionsByBoard,
  addPredictionInBoard,
  updatePredictionById,
} from "./store";

export const getUserAuthPredictionListByBoard = async () => {
  return await getAllPredictionsByBoard();
};

export const createPredictioInBoard = async () => {
  const group = await addPredictionInBoard();
  return { group };
};

export const updatePredictById = async (
  predictId: string,
  newPrediction: {
    localGoalPrediction: number;
    visitorGoalPrediction: number;
  }
) => {
  const prediction = await updatePredictionById(predictId, newPrediction);
  return prediction;
};
