import TeamModel from "./model";

export const getAllTeams = async () => {
  const team = await TeamModel.aggregate();
  console.log({ team });
  return team;
};

export const addTeam = async () => {
  const team = new TeamModel({
    name: "Grupo Familia",
    owner: "6333644586437f2045d9aee4",
    isActive: false,
    code: "AXc12112",
  });
  await team.save();
  console.log({ team });
  return team;
};
