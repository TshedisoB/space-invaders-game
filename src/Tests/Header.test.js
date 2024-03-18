import React from "react";
import { configure, shallow } from "enzyme";
import Header from "../Components/Header";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Header", function () {
  it("should check if header is 'Space Invaders Game'", function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("h1").text()).toEqual("Space Invaders Game");
  });
});
