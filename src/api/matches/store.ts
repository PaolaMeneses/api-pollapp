import dayjs from "dayjs";
import mongoose from "mongoose";
import BoardModel, { Board } from "../boards/model";
import GroupModel from "../groups/model";
import PredictionModel, { Prediction } from "../predictions/model";
import TeamModel from "../teams/model";
import MatchModel, { Match } from "./model";

export const getMatchWithTeams = async () => {
  const matches = await MatchModel.aggregate([
    {
      $match: {
        $and: [
          {
            isActive: true,
          },
          {
            isClosed: false,
          },
        ],
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "localTeam_id",
        foreignField: "_id",
        as: "localTeam",
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "visitorTeam_id",
        foreignField: "_id",
        as: "visitorTeam",
      },
    },
    {
      $unwind: {
        path: "$localTeam",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$visitorTeam",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  return matches;
};

export const findMatchByIdWithTeams = async (matchId: string) => {
  const matches = await MatchModel.aggregate([
    {
      $match: {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(matchId),
          },
        ],
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "localTeam_id",
        foreignField: "_id",
        as: "localTeam",
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "visitorTeam_id",
        foreignField: "_id",
        as: "visitorTeam",
      },
    },
    {
      $unwind: {
        path: "$localTeam",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$visitorTeam",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  const match = matches?.[0] || {};

  return match;
};

export const getPredictionsByMatchId = async (
  matchId: string,
  groupId: string
) => {
  const predictions = await PredictionModel.aggregate([
    {
      $match: {
        match_id: new mongoose.Types.ObjectId(matchId),
      },
    },
    {
      $lookup: {
        from: "boards",
        localField: "board_id",
        foreignField: "_id",
        as: "board",
      },
    },
    {
      $match: {
        "board.group_id": new mongoose.Types.ObjectId(groupId),
      },
    },
    {
      $unwind: {
        path: "$board",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "board.user_id",
        foreignField: "_id",
        as: "board.user",
      },
    },
    {
      $unset: "board.user.password",
    },
    {
      $unwind: {
        path: "$board.user",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  return predictions;
};

export const addMatch = async () => {
  const match = new MatchModel({
    name: "Grupo Familia",
    owner: "6333644586437f2045d9aee4",
    isActive: false,
    code: "AXc12112",
  });
  await match.save();
  return match;
};

export const matchSeeder = async () => {
  const matches: {
    localTeam_id: string;
    visitorTeam_id: string;
    date: Date;
    isActive: boolean;
    isClosed: boolean;
    phase: string;
    matchNumber: number;
  }[] = [
    {
      localTeam_id: "Catar",
      visitorTeam_id: "Ecuador",
      date: new Date("2022-11-20 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo A",
      matchNumber: 1,
      isClosed: false,
    },
    {
      localTeam_id: "Inglaterra",
      visitorTeam_id: "Irán",
      date: new Date("2022-11-21 08:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo B",
      matchNumber: 2,
      isClosed: false,
    },
    {
      localTeam_id: "Senegal",
      visitorTeam_id: "Paises Bajos",
      date: new Date("2022-11-21 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo A",
      matchNumber: 3,
      isClosed: false,
    },
    {
      localTeam_id: "Estados unidos",
      visitorTeam_id: "Gales",
      date: new Date("2022-11-21 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo B",
      matchNumber: 4,
      isClosed: false,
    },
    {
      localTeam_id: "Argentina",
      visitorTeam_id: "Arabia Saudita",
      date: new Date("2022-11-22 05:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo C",
      matchNumber: 5,
      isClosed: false,
    },
    {
      localTeam_id: "Dinamarca",
      visitorTeam_id: "Túnez",
      date: new Date("2022-11-22 08:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo D",
      matchNumber: 6,
      isClosed: false,
    },
    {
      localTeam_id: "México",
      visitorTeam_id: "Polonia",
      date: new Date("2022-11-22 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo C",
      matchNumber: 7,
      isClosed: false,
    },
    {
      localTeam_id: "Francia",
      visitorTeam_id: "Australia",
      date: new Date("2022-11-22 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo D",
      matchNumber: 8,
      isClosed: false,
    },
    {
      localTeam_id: "Marruecos",
      visitorTeam_id: "Croacia",
      date: new Date("2022-11-23 05:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo F",
      matchNumber: 9,
      isClosed: false,
    },
    {
      localTeam_id: "Alemania",
      visitorTeam_id: "Japón",
      date: new Date("2022-11-23 08:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo E",
      matchNumber: 10,
      isClosed: false,
    },
    {
      localTeam_id: "España",
      visitorTeam_id: "Costa Rica",
      date: new Date("2022-11-23 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo E",
      matchNumber: 11,
      isClosed: false,
    },
    {
      localTeam_id: "Bélgica",
      visitorTeam_id: "Canadá",
      date: new Date("2022-11-23 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo F",
      matchNumber: 12,
      isClosed: false,
    },
    {
      localTeam_id: "Suiza",
      visitorTeam_id: "Camerún",
      date: new Date("2022-11-24 05:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo G",
      matchNumber: 13,
      isClosed: false,
    },
    {
      localTeam_id: "Uruguay",
      visitorTeam_id: "Corea del Sur",
      date: new Date("2022-11-24 08:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo H",
      matchNumber: 14,
      isClosed: false,
    },
    {
      localTeam_id: "Portugal",
      visitorTeam_id: "Ghana",
      date: new Date("2022-11-24 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo H",
      matchNumber: 15,
      isClosed: false,
    },
    {
      localTeam_id: "Brasil",
      visitorTeam_id: "Serbia",
      date: new Date("2022-11-24 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo G",
      matchNumber: 16,
      isClosed: false,
    },
    {
      localTeam_id: "Gales",
      visitorTeam_id: "Irán",
      date: new Date("2022-11-25 05:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo B",
      matchNumber: 17,
      isClosed: false,
    },
    {
      localTeam_id: "Catar",
      visitorTeam_id: "Senegal",
      date: new Date("2022-11-25 08:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo A",
      matchNumber: 18,
      isClosed: false,
    },
    {
      localTeam_id: "Paises Bajos",
      visitorTeam_id: "Ecuador",
      date: new Date("2022-11-25 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo A",
      matchNumber: 19,
      isClosed: false,
    },
    {
      localTeam_id: "Inglaterra",
      visitorTeam_id: "Estados unidos",
      date: new Date("2022-11-25 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo B",
      matchNumber: 20,
      isClosed: false,
    },
    {
      localTeam_id: "Túnez",
      visitorTeam_id: "Australia",
      date: new Date("2022-11-26 05:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo D",
      matchNumber: 21,
      isClosed: false,
    },
    {
      localTeam_id: "Polonia",
      visitorTeam_id: "Arabia Saudita",
      date: new Date("2022-11-26 08:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo C",
      matchNumber: 22,
      isClosed: false,
    },
    {
      localTeam_id: "Francia",
      visitorTeam_id: "Dinamarca",
      date: new Date("2022-11-26 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo D",
      matchNumber: 23,
      isClosed: false,
    },
    {
      localTeam_id: "Argentina",
      visitorTeam_id: "México",
      date: new Date("2022-11-26 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo C",
      matchNumber: 24,
      isClosed: false,
    },
    {
      localTeam_id: "Japón",
      visitorTeam_id: "Costa Rica",
      date: new Date("2022-11-27 05:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo E",
      matchNumber: 25,
      isClosed: false,
    },
    {
      localTeam_id: "Bélgica",
      visitorTeam_id: "Marruecos",
      date: new Date("2022-11-27 08:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo F",
      matchNumber: 26,
      isClosed: false,
    },
    {
      localTeam_id: "Croacia",
      visitorTeam_id: "Canadá",
      date: new Date("2022-11-27 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo F",
      matchNumber: 27,
      isClosed: false,
    },
    {
      localTeam_id: "España",
      visitorTeam_id: "Alemania",
      date: new Date("2022-11-27 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo E",
      matchNumber: 28,
      isClosed: false,
    },
    {
      localTeam_id: "Camerún",
      visitorTeam_id: "Serbia",
      date: new Date("2022-11-28 05:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo G",
      matchNumber: 29,
      isClosed: false,
    },
    {
      localTeam_id: "Corea del Sur",
      visitorTeam_id: "Ghana",
      date: new Date("2022-11-28 08:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo H",
      matchNumber: 30,
      isClosed: false,
    },
    {
      localTeam_id: "Brasil",
      visitorTeam_id: "Suiza",
      date: new Date("2022-11-28 11:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo G",
      matchNumber: 31,
      isClosed: false,
    },
    {
      localTeam_id: "Portugal",
      visitorTeam_id: "Uruguay",
      date: new Date("2022-11-28 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo B",
      matchNumber: 32,
      isClosed: false,
    },
    {
      localTeam_id: "Ecuador",
      visitorTeam_id: "Senegal",
      date: new Date("2022-11-29 10:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo A",
      matchNumber: 33,
      isClosed: false,
    },
    {
      localTeam_id: "Paises Bajos",
      visitorTeam_id: "Catar",
      date: new Date("2022-11-29 10:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo A",
      matchNumber: 34,
      isClosed: false,
    },
    {
      localTeam_id: "Irán",
      visitorTeam_id: "Estados unidos",
      date: new Date("2022-11-29 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo B",
      matchNumber: 35,
      isClosed: false,
    },
    {
      localTeam_id: "Gales",
      visitorTeam_id: "Inglaterra",
      date: new Date("2022-11-29 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo B",
      matchNumber: 36,
      isClosed: false,
    },
    {
      localTeam_id: "Túnez",
      visitorTeam_id: "Francia",
      date: new Date("2022-11-30 10:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo D",
      matchNumber: 37,
      isClosed: false,
    },
    {
      localTeam_id: "Australia",
      visitorTeam_id: "Dinamarca",
      date: new Date("2022-11-30 10:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo D",
      matchNumber: 38,
      isClosed: false,
    },
    {
      localTeam_id: "Polonia",
      visitorTeam_id: "Argentina",
      date: new Date("2022-11-30 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo C",
      matchNumber: 39,
      isClosed: false,
    },
    {
      localTeam_id: "Arabia Saudita",
      visitorTeam_id: "México",
      date: new Date("2022-11-30 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo C",
      matchNumber: 40,
      isClosed: false,
    },
    {
      localTeam_id: "Croacia",
      visitorTeam_id: "Bélgica",
      date: new Date("2022-12-01 10:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo F",
      matchNumber: 41,
      isClosed: false,
    },
    {
      localTeam_id: "Canadá",
      visitorTeam_id: "Marruecos",
      date: new Date("2022-12-01 10:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo F",
      matchNumber: 42,
      isClosed: false,
    },
    {
      localTeam_id: "Japón",
      visitorTeam_id: "España",
      date: new Date("2022-12-01 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo E",
      matchNumber: 43,
      isClosed: false,
    },
    {
      localTeam_id: "Costa Rica",
      visitorTeam_id: "Alemania",
      date: new Date("2022-12-01 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo E",
      matchNumber: 44,
      isClosed: false,
    },
    {
      localTeam_id: "Corea del Sur",
      visitorTeam_id: "Portugal",
      date: new Date("2022-12-02 10:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo H",
      matchNumber: 45,
      isClosed: false,
    },
    {
      localTeam_id: "Ghana",
      visitorTeam_id: "Uruguay",
      date: new Date("2022-12-02 10:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo H",
      matchNumber: 46,
      isClosed: false,
    },
    {
      localTeam_id: "Serbia",
      visitorTeam_id: "Suiza",
      date: new Date("2022-12-02 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo G",
      matchNumber: 47,
      isClosed: false,
    },
    {
      localTeam_id: "Camerún",
      visitorTeam_id: "Brasil",
      date: new Date("2022-12-02 14:00"),
      isActive: true,
      phase: "Fase de grupos - Grupo G",
      matchNumber: 48,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-03 10:00"),
      isActive: false,
      phase: "Octavos de final",
      matchNumber: 49,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-03 14:00"),
      isActive: false,
      phase: "Octavos de final",
      matchNumber: 50,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-04 10:00"),
      isActive: false,
      phase: "Octavos de final",
      matchNumber: 51,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-04 14:00"),
      isActive: false,
      phase: "Octavos de final",
      matchNumber: 52,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-05 10:00"),
      isActive: false,
      phase: "Octavos de final",
      matchNumber: 53,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-05 14:00"),
      isActive: false,
      phase: "Octavos de final",
      matchNumber: 54,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-06 10:00"),
      isActive: false,
      phase: "Octavos de final",
      matchNumber: 55,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-06 14:00"),
      isActive: false,
      phase: "Octavos de final",
      matchNumber: 56,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-09 10:00"),
      isActive: false,
      phase: "Cuartos de final",
      matchNumber: 57,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-09 14:00"),
      isActive: false,
      phase: "Cuartos de final",
      matchNumber: 58,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-10 10:00"),
      isActive: false,
      phase: "Cuartos de final",
      matchNumber: 59,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-10 14:00"),
      isActive: false,
      phase: "Cuartos de final",
      matchNumber: 60,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-13 14:00"),
      isActive: false,
      phase: "Semifinales",
      matchNumber: 61,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-14 14:00"),
      isActive: false,
      phase: "Semifinales",
      matchNumber: 62,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-17 10:00"),
      isActive: false,
      phase: "Tercer lugar",
      matchNumber: 63,
      isClosed: false,
    },
    {
      localTeam_id: "Por definirse",
      visitorTeam_id: "Por definirse",
      date: new Date("2022-12-18 10:00"),
      isActive: false,
      phase: "Final",
      matchNumber: 64,
      isClosed: false,
    },
  ];

  await Promise.all(
    matches.map((match) => {
      return new Promise<void>(async (resolve) => {
        const matchFound = await MatchModel.findOne({
          matchNumber: match.matchNumber,
        });

        if (!matchFound) {
          const localTeam_id = await TeamModel.findOne({
            name: match.localTeam_id,
          });
          const visitorTeam_id = await TeamModel.findOne({
            name: match.visitorTeam_id,
          });
          const newMatch = new MatchModel({
            ...match,
            date: dayjs(match.date),
            localTeam_id,
            visitorTeam_id,
          });
          await newMatch.save();
        }
        resolve();
      });
    })
  );
};

export const updateMatchById = async (matchId: string, newMatch: Match) => {
  const match = await MatchModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(matchId) },
    newMatch,
    { new: true }
  );

  const preds: Prediction[] = await PredictionModel.find({
    match_id: new mongoose.Types.ObjectId(matchId),
  });

  await Promise.all(
    preds.map((pred) => {
      new Promise<void>(async (resolve) => {
        let points = 0;
        if (
          pred.localGoalPrediction !== null &&
          pred.visitorGoalPrediction !== null
        ) {
          const localGoal = Number(match?.localGoals);
          const visitorGoal = Number(match?.visitorGoals);
          const localGoalPred = Number(pred.localGoalPrediction);
          const visitorGoalPred = Number(pred.visitorGoalPrediction);

          if (localGoal === localGoalPred && visitorGoal === visitorGoalPred) {
            points = 3;
          } else if (
            (localGoal > visitorGoal && localGoalPred > visitorGoalPred) ||
            (localGoal < visitorGoal && localGoalPred < visitorGoalPred) ||
            (localGoal === visitorGoal && localGoalPred === visitorGoalPred)
          ) {
            points = 1;
          }
        }

        await PredictionModel.findByIdAndUpdate(pred._id, { points });
        resolve();
      });
    })
  );

  return {
    match,
    preds,
  };
};

export const updatePositionByGroup = async () => {
  const groups = await GroupModel.find({ isActive: true });

  await Promise.all(
    groups.map((group) => {
      return new Promise(async (resolve) => {
        const boards: Board[] = await BoardModel.aggregate([
          {
            $match: {
              $and: [
                { isActive: true },
                { group_id: new mongoose.Types.ObjectId(group._id) },
              ],
            },
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
            $group: {
              _id: "$_id",
              current_pos: { $first: "$current_pos" },
              previous_pos: { $first: "$previous_pos" },
              number: { $first: "$number" },
              totalPoints: { $sum: "$predictions.points" },
              predictions: { $push: "$predictions" },
            },
          },
          {
            $project: {
              _id: 1,
              current_pos: 1,
              previous_pos: 1,
              number: 1,
              totalPoints: 1,
              predsThreePoints: {
                $size: {
                  $filter: {
                    input: "$predictions",
                    as: "predictions",
                    cond: {
                      $and: [{ $eq: ["$$predictions.points", 3] }],
                    },
                  },
                },
              },
              predsOnePoints: {
                $size: {
                  $filter: {
                    input: "$predictions",
                    as: "predictions",
                    cond: {
                      $and: [{ $eq: ["$$predictions.points", 1] }],
                    },
                  },
                },
              },
            },
          },
          {
            $sort: {
              totalPoints: -1,
              predsThreePoints: -1,
              predsOnePoints: -1,
            },
          },
        ]);
        await Promise.all(
          boards.map((board, i) => {
            return new Promise<void>(async (resolve) => {
              await BoardModel.findByIdAndUpdate(board._id, {
                totalPoints: board.totalPoints,
                current_pos: i + 1,
                predsThreePoints: board.predsThreePoints,
                predsOnePoints: board.predsOnePoints,
                previous_pos: board.current_pos,
              });
              resolve();
            });
          })
        );
        resolve(boards);
      });
    })
  );

  return { groups };
};
