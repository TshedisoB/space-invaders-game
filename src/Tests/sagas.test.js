// Import the necessary dependencies and modules for testing
import { put, delay, takeEvery } from "redux-saga/effects";
import { watchGameOver, gameOverAsync, rootSaga } from "../Redux/sagas";
import { gameOver } from "../Redux/GameStats/actions";

describe("Game Sagas", () => {
  describe("watchGameOver", () => {
    it("should take every GAME_OVER action and call gameOverAsync", () => {
      const generator = watchGameOver();
      expect(generator.next().value).toEqual(
        takeEvery("GAME_OVER", gameOverAsync)
      );
    });
  });

  describe("gameOverAsync", () => {
    it("should delay for 2 seconds and dispatch gameOver action", () => {
      const generator = gameOverAsync();
      expect(generator.next().value).toEqual(delay(2000));
      expect(generator.next().value).toEqual(put(gameOver()));
      expect(generator.next().done).toBe(true);
    });
  });

  describe("rootSaga", () => {
    it("should invoke watchGameOver saga", () => {
      const generator = rootSaga();
      expect(generator.next().value).toEqual(watchGameOver());
      expect(generator.next().done).toBe(true);
    });
  });
});
