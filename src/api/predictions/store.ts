import PredictionModel from "./model";

export const getAllPredictionsByBoard = async () => {
  const prediction = await PredictionModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $match: { code: "AXc12112" },
    },
  ]);
  console.log({ prediction });
  return prediction;
};

export const addPredictionInBoard = async () => {
  const prediction = new PredictionModel({
    name: "Grupo Familia",
    owner: "6333644586437f2045d9aee4",
    isActive: false,
    code: "AXc12112",
  });
  await prediction.save();
  console.log({ prediction });
  return prediction;
};
