import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { Game } from "../Components/Game";

const mockStore = configureStore([]);

describe("Game component", () => {
  const initialState = {
    stats: {
      laserCount: 0,
      gamePaused: false,
      gameOver: false,
      aliensRemoved: [],
      aliensInvaders: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 45, 46, 47, 48, 49, 50, 51, 52,
        53, 54, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84,
      ],
    },
    player: {
      playerName: "alienDestroyer",
    },
  };

  test("should render 'Game' component without crashing", () => {
    const store = mockStore(initialState);
    const { container } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    expect(container).toBeTruthy();
    expect(screen.getByTestId("game-container")).toBeInTheDocument();
  });

  test("should dispatch 'INCR_LASER_SHOT' action when 'ArrowUp' key is pressed", () => {
    const store = mockStore(initialState);
    const { container } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    fireEvent.keyDown(container, { key: "ArrowUp" });

    const actions = store.getActions();
    const expectedAction = { type: "INCR_LASER_SHOT" };
    expect(actions).toEqual([expectedAction]);
  });
});
