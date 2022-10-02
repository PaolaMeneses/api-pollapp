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
