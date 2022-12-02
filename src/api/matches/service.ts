import { Match } from "./model";
import {
  getMatchWithTeams,
  addMatch,
  matchSeeder,
  // updateMatchById,
  updatePositionByGroup,
  updateMatchById,
  getPredictionsByMatchId,
  findMatchByIdWithTeams,
} from "./store";

export const getMatchList = async () => {
  return await getMatchWithTeams();
};

export const predictionListByMatchId = (matchId: string, groupId: string) => {
  return getPredictionsByMatchId(matchId, groupId);
};

export const matchById = (matchId: string) => {
  return findMatchByIdWithTeams(matchId);
};

export const createMatch = async () => {
  const match = await addMatch();
  return { match };
};

export const createMatchMaster = async () => {
  await matchSeeder();
  return { messge: "Se creó el maestro de partidos con exito" };
};

export const closeMatch = async (matchId: string, newMatch: Match) => {
  await updateMatchById(matchId, newMatch);
  const match = await updatePositionByGroup();
  return match;
};

export const updateMatch = async (matchId: string, newMatch: Match) => {
  await updateMatchById(matchId, newMatch);
  return "actualizado con exito";
};
