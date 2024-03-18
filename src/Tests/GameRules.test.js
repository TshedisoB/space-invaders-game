import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GameRules from "../Components/GameRules";

configure({ adapter: new Adapter() });

describe("GameRules Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GameRules />);
  });

  test("should render without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("should have a text 'Instructions'", () => {
    expect(wrapper.find("#instructions").text()).toEqual("Instructions");
  });

  test("should have a list of instructions", () => {
    const instructionList = wrapper.find("#instruction-list");
    expect(instructionList.exists()).toBe(true);
    expect(instructionList.find("li")).toHaveLength(4);
  });

  test("should have a text 'Rules'", () => {
    expect(wrapper.find("#rules").text()).toEqual("Rules");
  });

  test("should have a list of rules", () => {
    const rulesList = wrapper.find("#rules-list");
    expect(rulesList.exists()).toBe(true);
    expect(rulesList.find("li")).toHaveLength(6);
  });
});
