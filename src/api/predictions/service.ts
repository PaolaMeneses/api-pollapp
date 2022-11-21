import dayjs from "dayjs";
import createHttpError from "http-errors";

import {
  getAllPredictionsByBoard,
  addPredictionInBoard,
  updatePredictionById,
  findPredictionWithMatchById,
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
  const currentPred = await findPredictionWithMatchById(predictId);
  if (!("_id" in currentPred)) {
    throw new createHttpError.NotFound("no sé encontró predicción");
  }
  if (dayjs().unix() >= dayjs(currentPred.match.date).unix()) {
    throw new createHttpError.BadRequest(
      "Ya no se pueden hacer predicciones a este partido"
    );
  }

  const prediction = await updatePredictionById(predictId, newPrediction);
  return prediction;
};
