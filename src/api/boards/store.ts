import BoardModel from "./model";

export const getBoardsByUserAndGroup = async () => {
  const board = await BoardModel.aggregate([
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
  console.log({ board });
  return board;
};

export const addBoardInGroup = async () => {
  const board = new BoardModel({
    name: "Grupo Familia",
    owner: "6333644586437f2045d9aee4",
    isActive: false,
    code: "AXc12112",
  });
  await board.save();
  console.log({ group: board });
  return board;
};
