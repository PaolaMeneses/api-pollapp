import mongoose from "mongoose";
// import createHttpError from "http-errors";
import createHttpError from "http-errors";
import { ClientSession } from "mongoose";
import PredictionModel from "../predictions/model";
import BoardModel, { Board } from "./model";

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

export const addBoardInGroup = async (newBoard: Board) => {
  const board = new BoardModel(newBoard);
  await board.save();
  return board;
};

export const activateBoardById = async (_boardId: string) => {
  // new Promise(async (resolve, reject) => {
  let session: ClientSession | undefined;
  try {
    await BoardModel.createCollection();
    await PredictionModel.createCollection();
    session = await mongoose.startSession();
    session.startTransaction();
    const board = await BoardModel.updateOne(
      {
        user_id: "6334c7c237da190f55426550",
        group_id: "633724157b52147484b2786a",
      },
      {
        previous_pos: 11,
      },
      {
        new: true,
        session,
      }
    );
    console.log("board :>> ", board);
    // await board.update();
    // const board = await BoardModel.findByIdAndUpdate(
    //   boardId,
    //   {
    //     $set: {
    //       isActive: true,
    //     },
    //   },
    //   {
    //     session,
    //     new: true,
    //   }
    // );

    const preds = await PredictionModel.create(
      { group_id: "633723183c8c03f85d6f99ce", localGeneralGoals: 1 },
      { session }
    );
    console.log("preds :>> ", preds);
    session.endSession();
    await session.commitTransaction();
    return board;
  } catch (error) {
    console.log("error.message :>> ", (error as Error).message);
    session?.abortTransaction();
    throw new createHttpError.BadRequest("Error activando tabla");
  } finally {
  }
};
