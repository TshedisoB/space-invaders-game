import {
  INCR_ALIENS_SHOT,
  DECR_ALIENS_ALIVE,
  INCR_LASER_SHOT,
  RESTART_GAME,
  PAUSE_GAME,
  SET_GAME_OVER_ASYNC,
} from "./types";

export const aliensShot = () => {
  return {
    type: INCR_ALIENS_SHOT,
  };
};

export const aliensAlive = () => {
  return {
    type: DECR_ALIENS_ALIVE,
  };
};

export const shootLaser = () => {
  return {
    type: INCR_LASER_SHOT,
  };
};

export const restartGame = () => {
  return { type: RESTART_GAME };
};

export const gameOver = () => {
  return {
    type: SET_GAME_OVER_ASYNC,
  };
};

export const gamePaused = () => {
  return {
    type: PAUSE_GAME,
  };
};
