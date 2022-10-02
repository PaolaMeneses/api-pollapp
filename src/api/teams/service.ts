import { getAllTeams, addTeam, teamSeeder } from "./store";

export const getTeamList = async () => {
  return await getAllTeams();
};

export const createTeam = async () => {
  const match = await addTeam();
  return { match };
};

export const createTeamMaster = async () => {
  await teamSeeder();
  return { messge: "Se creó el maestro de equipos con exito" };
};
