import Group from "./model";

export const getGroups = async () => {
  const group = await Group.aggregate([
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

export const createGroup = async () => {
  const group = new Group({
    name: "Grupo Familia",
    owner: "6333644586437f2045d9aee4",
    isActive: false,
    code: "AXc12112",
  });
  await group.save();
  console.log({ group });
  return group;
};
