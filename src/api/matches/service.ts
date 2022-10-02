import { getMatchWithTeams, addMatch, matchSeeder } from "./store";

export const getMatchList = async () => {
  return await getMatchWithTeams();
};

export const createMatch = async () => {
  const match = await addMatch();
  return { match };
};

export const createMatchMaster = async () => {
  await matchSeeder();
  return { messge: "Se creó el maestro de partidos con exito" };
};
