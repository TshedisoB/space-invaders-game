import { put, delay, takeEvery } from "redux-saga/effects";
import { gameOver } from "./GameStats/actions";

export function* gameOverAsync() {
  yield delay(2000);
  yield put(gameOver());
}

export function* watchGameOver() {
  yield takeEvery("GAME_OVER", gameOverAsync);
}

export function* rootSaga() {
  yield watchGameOver();
}
