import statsReducer from "../Redux/GameStats/reducer";
import playerReducer from "../Redux/PlayerName/reducer";
import { SET_PLAYER_NAME } from "../Redux/PlayerName/types";
import {
  INCR_ALIENS_SHOT,
  DECR_ALIENS_ALIVE,
  INCR_LASER_SHOT,
  SET_GAME_OVER_ASYNC,
} from "../Redux/GameStats/types";

describe("statsReducer", () => {
  it("should return initial state", () => {
    const initialState = {
      aliensShot: 0,
      laserCount: 0,
      width: 15,
      aliensAlive: 60,
      gameOver: false,
      gamePaused: true,
      aliensRemoved: [],
      aliensInvaders: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 45, 46, 47, 48, 49, 50, 51, 52,
        53, 54, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84,
      ],
    };

    expect(statsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle INCR_ALIENS_SHOT action", () => {
    const state = {
      aliensShot: 5,
    };

    const action = { type: INCR_ALIENS_SHOT };
    const expectedState = {
      aliensShot: 6,
    };
    expect(statsReducer(state, action)).toEqual(expectedState);
  });

  it("should handle DECR_ALIENS_ALIVE action", () => {
    const state = {
      aliensAlive: 10,
    };

    const action = { type: DECR_ALIENS_ALIVE };
    const expectedState = {
      aliensAlive: 9,
    };
    expect(statsReducer(state, action)).toEqual(expectedState);
  });

  it("should handle INCR_LASER_SHOT action", () => {
    const state = {
      laserCount: 3,
    };

    const action = { type: INCR_LASER_SHOT };
    const expectedState = {
      laserCount: 4,
    };
    expect(statsReducer(state, action)).toEqual(expectedState);
  });

  it("should handle SET_GAME_OVER_ASYNC action", () => {
    const state = {
      gameOver: false,
    };

    const action = { type: SET_GAME_OVER_ASYNC };
    const expectedState = {
      gameOver: true,
    };
    expect(statsReducer(state, action)).toEqual(expectedState);
  });

  it("should return current state for unknown action", () => {
    const state = {
      aliensShot: 5,
      laserCount: 2,
    };

    const action = { type: "UNKNOWN_ACTION" };
    expect(statsReducer(state, action)).toEqual(state);
  });
});

describe("playerReducer", () => {
  it("should handle SET_PLAYER_NAME action", () => {
    const state = {
      playerName: "",
    };

    const action = { type: SET_PLAYER_NAME, payload: "AlienSlayer" };
    const expectedState = {
      playerName: "AlienSlayer",
    };
    expect(playerReducer(state, action)).toEqual(expectedState);
  });
});
