import mongoose from "mongoose";
import { User } from "../users/model";
import GroupModel, { Group } from "./model";

export const getGroups = async () => {
  const group = await GroupModel.aggregate([
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
  console.log({ group });
  return group;
};

export const createGroup = async (newGroup: Group) => {
  const group = new GroupModel(newGroup);
  await group.save();
  console.log({ group });
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
      $unwind: "$owner",
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
      $unwind: "$owner",
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
            cond: { $eq: ["$$boards.isActive", true] },
          },
        },
        pending: {
          $size: {
            $filter: {
              input: "$boards",
              as: "boards",
              cond: { $eq: ["$$boards.isActive", false] },
            },
          },
        },
      },
    },
  ]);

  return groups;
};
