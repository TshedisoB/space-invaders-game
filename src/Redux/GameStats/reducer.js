import {
  INCR_ALIENS_SHOT,
  INCR_LASER_SHOT,
  DECR_ALIENS_ALIVE,
  RESTART_GAME,
  PAUSE_GAME,
  SET_GAME_OVER_ASYNC,
} from "./types";

const initialState = {
  aliensShot: 0,
  laserCount: 0,
  width: 15,
  aliensAlive: 60,
  gameOver: false,
  gamePaused: true,
  aliensRemoved: [],
  aliensInvaders: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 75, 76, 77, 78, 79, 80, 81, 82, 83,
    84,
  ],
};

export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case INCR_ALIENS_SHOT:
      return { ...state, aliensShot: state.aliensShot + 1 };
    case DECR_ALIENS_ALIVE:
      return { ...state, aliensAlive: state.aliensAlive - 1 };
    case INCR_LASER_SHOT:
      return { ...state, laserCount: state.laserCount + 1 };
    case PAUSE_GAME:
      return { ...state, gamePaused: !state.gamePaused };
    case RESTART_GAME:
      return {
        ...initialState,
        aliensRemoved: [],
        aliensInvaders: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
          30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 45, 46, 47, 48, 49, 50, 51,
          52, 53, 54, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 75, 76, 77, 78,
          79, 80, 81, 82, 83, 84,
        ],
      };
    case SET_GAME_OVER_ASYNC:
      return { ...state, gameOver: !state.gameOver };
    default:
      return state;
  }
}
