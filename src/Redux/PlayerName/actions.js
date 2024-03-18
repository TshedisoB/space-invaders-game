import { SET_PLAYER_NAME } from "./types";

export const playerName = (name) => {
  return {
    type: SET_PLAYER_NAME,
    payload: name,
  };
};
