import MatchModel from "./model";

export const getMatchWithTeams = async () => {
  const match = await MatchModel.aggregate([
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
  console.log({ match });
  return match;
};

export const addMatch = async () => {
  const match = new MatchModel({
    name: "Grupo Familia",
    owner: "6333644586437f2045d9aee4",
    isActive: false,
    code: "AXc12112",
  });
  await match.save();
  console.log({ match });
  return match;
};
