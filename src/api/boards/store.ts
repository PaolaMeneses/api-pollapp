import mongoose from "mongoose";
import createHttpError from "http-errors";
import BoardModel, { Board } from "./model";
import { Match } from "./../matches/model";
import MatchModel from "../matches/model";
import PredictionModel from "../predictions/model";

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

export const getBoardByBoardId = async (boardId: string) => {
  return BoardModel.findOne({
    _id: boardId,
    isActive: true,
  });
};

export const getBoardWithPredsByBoardId = async (boardId: string) => {
  const board = await BoardModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(boardId) },
    },
    {
      $lookup: {
        from: "predictions",
        localField: "_id",
        foreignField: "board_id",
        as: "predictions",
      },
    },
    {
      $unwind: {
        path: "$predictions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "matches",
        localField: "predictions.match_id",
        foreignField: "_id",
        as: "predictions.match",
      },
    },
    {
      $unwind: {
        path: "$predictions.match",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        $and: [
          { "predictions.match.isActive": true },
          {
            "predictions.match.isClosed": false,
          },
        ],
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "predictions.match.localTeam_id",
        foreignField: "_id",
        as: "predictions.match.localTeam",
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "predictions.match.visitorTeam_id",
        foreignField: "_id",
        as: "predictions.match.visitorTeam",
      },
    },
    {
      $unwind: {
        path: "$predictions.match.localTeam",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$predictions.match.visitorTeam",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $sort: { "predictions.match.matchNumber": 1 } },
    {
      $group: {
        _id: "$_id",
        current_pos: { $first: "$current_pos" },
        previous_pos: { $first: "$previous_pos" },
        number: { $first: "$number" },
        predictions: { $push: "$predictions" },
      },
    },

    {
      $project: {
        _id: 1,
        current_pos: 1,
        previous_pos: 1,
        number: 1,
        predictions: {
          _id: 1,
          localGoalPrediction: 1,
          visitorGoalPrediction: 1,
          points: 1,
          match: {
            _id: 1,
            localGoals: 1,
            visitorGoals: 1,
            localGeneralGoals: 1,
            visitorGeneralGoals: 1,
            date: 1,
            isActive: 1,
            isClosed: 1,
            phase: 1,
            matchNumber: 1,
            localTeam: {
              _id: 1,
              name: 1,
              flag: 1,
            },
            visitorTeam: {
              _id: 1,
              name: 1,
              flag: 1,
            },
          },
        },
      },
    },
  ]);
  const [firstBoard] = board;
  return firstBoard;
};

export const getBoardWithPreviousPredsByBoardId = async (boardId: string) => {
  const board = await BoardModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(boardId) },
    },
    {
      $lookup: {
        from: "predictions",
        localField: "_id",
        foreignField: "board_id",
        as: "predictions",
      },
    },
    {
      $unwind: {
        path: "$predictions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "matches",
        localField: "predictions.match_id",
        foreignField: "_id",
        as: "predictions.match",
      },
    },
    {
      $unwind: {
        path: "$predictions.match",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        $and: [
          { "predictions.match.isActive": true },
          {
            "predictions.match.isClosed": true,
          },
        ],
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "predictions.match.localTeam_id",
        foreignField: "_id",
        as: "predictions.match.localTeam",
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "predictions.match.visitorTeam_id",
        foreignField: "_id",
        as: "predictions.match.visitorTeam",
      },
    },
    {
      $unwind: {
        path: "$predictions.match.localTeam",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$predictions.match.visitorTeam",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $sort: { "predictions.match.matchNumber": -1 } },
    {
      $group: {
        _id: "$_id",
        current_pos: { $first: "$current_pos" },
        previous_pos: { $first: "$previous_pos" },
        number: { $first: "$number" },
        predictions: { $push: "$predictions" },
      },
    },

    {
      $project: {
        _id: 1,
        current_pos: 1,
        previous_pos: 1,
        number: 1,
        predictions: {
          _id: 1,
          localGoalPrediction: 1,
          visitorGoalPrediction: 1,
          points: 1,
          match: {
            _id: 1,
            localGoals: 1,
            visitorGoals: 1,
            localGeneralGoals: 1,
            visitorGeneralGoals: 1,
            date: 1,
            isActive: 1,
            isClosed: 1,
            phase: 1,
            matchNumber: 1,
            localTeam: {
              _id: 1,
              name: 1,
              flag: 1,
            },
            visitorTeam: {
              _id: 1,
              name: 1,
              flag: 1,
            },
          },
        },
      },
    },
  ]);
  const [firstBoard] = board;
  return firstBoard;
};

export const addBoardInGroup = async (newBoard: Board) => {
  const board = new BoardModel(newBoard);
  await board.save();
  return board;
};

export const activateBoardById = async (boardId: string) => {
  try {
    const board = await BoardModel.findByIdAndUpdate(
      boardId,
      {
        isActive: true,
      },
      {
        new: true,
      }
    );

    const matches: Match[] = await MatchModel.find({}, null);
    await Promise.all(
      matches.map((match) => {
        return new Promise<void>(async (resolve) => {
          const predFound = await PredictionModel.findOne({
            board_id: new mongoose.Types.ObjectId(boardId),
            match_id: new mongoose.Types.ObjectId(match._id),
          });
          if (!predFound) {
            await PredictionModel.create({
              board_id: board,
              match_id: match,
            });
          }
          resolve();
        });
      })
    );

    return board;
  } catch (error) {
    console.log("error.message :>> ", (error as Error).message);
    throw new createHttpError.BadRequest("Error activando tabla");
  }
};
