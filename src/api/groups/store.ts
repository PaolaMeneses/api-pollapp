import mongoose from "mongoose";
import BoardModel from "../boards/model";
import { User } from "../users/model";
import GroupModel, { Group } from "./model";

export const getAllGroups = async () => {
  const groups = await GroupModel.aggregate([
    {
      $lookup: {
        from: "boards",
        localField: "_id",
        foreignField: "group_id",
        as: "boards",
      },
    },
    {
      $unwind: {
        path: "$boards",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "boards.user_id",
        foreignField: "_id",
        as: "boards.user",
      },
    },
    {
      $unwind: {
        path: "$boards.user",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $unset: "boards.user.password" },
    {
      $group: {
        _id: "$_id",
        code: { $first: "$code" },
        name: { $first: "$name" },
        boards: { $push: "$boards" },
      },
    },
    {
      $project: {
        name: 1,
        code: 1,
        pending: {
          $filter: {
            input: "$boards",
            as: "boards",
            cond: { $eq: ["$$boards.isActive", false] },
          },
        },
      },
    },
  ]);
  return groups;
};

export const getBoardPositionsByGroupId = async (boardId: string) => {
  const boards = await BoardModel.aggregate([
    {
      $match: {
        $and: [
          { group_id: new mongoose.Types.ObjectId(boardId) },
          { isActive: true },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    { $unset: "user.password" },
    { $sort: { current_pos: 1 } },
  ]);

  return boards;
};

export const createGroup = async (newGroup: Group) => {
  const group = new GroupModel(newGroup);
  await group.save();
  return group;
};

export const findGroupListById = async (groupId: string, user: User) => {
  const groups: Group[] = await GroupModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(groupId) },
    },
    {
      $lookup: {
        from: "boards",
        localField: "_id",
        foreignField: "group_id",
        as: "boards",
      },
    },
    {
      $project: {
        name: 1,
        code: 1,
        owner: {
          _id: 1,
          firstname: 1,
          lastname: 1,
        },
        active: {
          $filter: {
            input: "$boards",
            as: "boards",
            cond: {
              $and: [
                { $eq: ["$$boards.isActive", true] },
                {
                  $eq: [
                    "$$boards.user_id",
                    new mongoose.Types.ObjectId(user._id),
                  ],
                },
              ],
            },
          },
        },
        pending: {
          $size: {
            $filter: {
              input: "$boards",
              as: "boards",
              cond: {
                $and: [
                  { $eq: ["$$boards.isActive", false] },
                  {
                    $eq: [
                      "$$boards.user_id",
                      new mongoose.Types.ObjectId(user._id),
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ]);

  const [group] = groups;
  return group;
};

export const findGroupListByCode = async (code: string, user: User) => {
  const groups: Group[] = await GroupModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: {
        path: "$owner",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "boards",
        localField: "_id",
        foreignField: "group_id",
        as: "boards",
      },
    },
    {
      $match: { code },
    },
    {
      $project: {
        name: 1,
        code: 1,
        owner: {
          _id: 1,
          firstname: 1,
          lastname: 1,
        },
        active: {
          $filter: {
            input: "$boards",
            as: "boards",
            cond: {
              $and: [
                { $eq: ["$$boards.isActive", true] },
                {
                  $eq: [
                    "$$boards.user_id",
                    new mongoose.Types.ObjectId(user._id),
                  ],
                },
              ],
            },
          },
        },
        pending: {
          $size: {
            $filter: {
              input: "$boards",
              as: "boards",
              cond: {
                $and: [
                  { $eq: ["$$boards.isActive", false] },
                  {
                    $eq: [
                      "$$boards.user_id",
                      new mongoose.Types.ObjectId(user._id),
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ]);

  return groups;
};

export const findGroupListByUser = async (user: User) => {
  const groups = await GroupModel.aggregate([
    {
      $lookup: {
        from: "boards",
        localField: "_id",
        foreignField: "group_id",
        as: "boards",
      },
    },
    {
      $match: {
        $or: [
          { owner: new mongoose.Types.ObjectId(user._id) },
          { "boards.user_id": new mongoose.Types.ObjectId(user._id) },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: {
        path: "$owner",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        name: 1,
        code: 1,
        owner: {
          _id: 1,
          firstname: 1,
          lastname: 1,
        },
        active: {
          $filter: {
            input: "$boards",
            as: "boards",
            cond: {
              $and: [
                { $eq: ["$$boards.isActive", true] },
                {
                  $eq: [
                    "$$boards.user_id",
                    new mongoose.Types.ObjectId(user._id),
                  ],
                },
              ],
            },
          },
        },
        pending: {
          $size: {
            $filter: {
              input: "$boards",
              as: "boards",
              cond: {
                $and: [
                  { $eq: ["$$boards.isActive", false] },
                  {
                    $eq: [
                      "$$boards.user_id",
                      new mongoose.Types.ObjectId(user._id),
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ]);

  return groups;
};
