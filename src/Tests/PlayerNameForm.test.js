import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TextField, Button } from "@material-ui/core";
import { PlayerNameForm } from "../Components/PlayerNameForm";

configure({ adapter: new Adapter() });

describe("PlayerNameForm Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PlayerNameForm />);
  });

  test("should render without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("should have a title of 'Enter Player Name...'", () => {
    expect(wrapper.find("#player-title").text()).toEqual(
      "Enter Player Name..."
    );
  });

  test("should update name state when input value changes", () => {
    const input = wrapper.find(TextField);
    input.simulate("change", { target: { value: "AlienSlayer" } });
    expect(wrapper.find(TextField).prop("value")).toEqual("AlienSlayer");
  });

  test("should disable submit button when name is empty", () => {
    const submitButton = wrapper.find(Button);
    expect(submitButton.prop("disabled")).toBe(true);
  });

  test("should enable submit button when name is not empty", () => {
    const input = wrapper.find(TextField);
    input.simulate("change", { target: { value: "AlienSlayer" } });
    const submitButton = wrapper.find(Button);
    expect(submitButton.prop("disabled")).toBe(false);
  });
});
