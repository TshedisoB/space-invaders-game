import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import playerReducer from "./PlayerName/reducer";
import statsReducer from "./GameStats/reducer";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  player: playerReducer,
  stats: statsReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
