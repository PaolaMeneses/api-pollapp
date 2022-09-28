import { getMatchWithTeams, addMatch } from "./store";

export const getMatchList = async () => {
  return await getMatchWithTeams();
};

export const createMatch = async () => {
  const match = await addMatch();
  return { match };
};
