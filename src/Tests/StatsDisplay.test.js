import React from "react";
import { configure, shallow } from "enzyme";
import { useSelector } from "react-redux";
import StatsDisplay from "../Components/StatsDisplay";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("StatsDisplay Component", () => {
  let wrapper;
  const mockedState = {
    stats: {
      aliensShot: 10,
      aliensAlive: 5,
      laserCount: 20,
      gameOver: false,
    },
    player: {
      playerName: "AlienDestroyer",
    },
  };

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector(mockedState));
    wrapper = shallow(<StatsDisplay />);
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  test("should render without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("should display player name", () => {
    const nameCell = wrapper.find("#name-cell");
    expect(nameCell.text()).toBe("AlienDestroyer");
  });

  test("should display aliens shot count", () => {
    const shotCell = wrapper.find("#shot-cell");
    expect(shotCell.text()).toBe("10");
  });

  test("should display aliens alive count", () => {
    const aliveCell = wrapper.find("#alive-cell");
    expect(aliveCell.text()).toBe("5");
  });

  test("should display laser count", () => {
    const laserCell = wrapper.find("#laser-cell");
    expect(laserCell.text()).toBe("20");
  });

  test("should display game over status", () => {
    const gameOverCell = wrapper.find("#game-over-cell");
    expect(gameOverCell.text()).toBe("No");
  });
});
