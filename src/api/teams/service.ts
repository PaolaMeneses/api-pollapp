import { getAllTeams, addTeam } from "./store";

export const getTeamList = async () => {
  return await getAllTeams();
};

export const createTeam = async () => {
  const match = await addTeam();
  return { match };
};
