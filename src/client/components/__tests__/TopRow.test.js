import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("../mediaQuery");

import TopRow from "../TopRow";

const classes = {
  child: "child",
  childGridCenter: "childGridCenter",
  childGridLeft: "childGridLeft",
  childGridRight: "childGridRight",
  buttonLabel: "buttonLabel"
};

const weatherData = {
  icon: "partly-cloudy",
  temperature: "15",
  humidity: "0.75"
};

const exampleProps = {
  classes,
  weatherData
};

describe("TopRow", () => {
  let tree;
  let component;
  beforeEach(() => {
    component = renderer.create(<TopRow {...exampleProps} />);
    tree = component.toJSON();
  });
  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });
  describe("when renders", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<TopRow {...exampleProps} />);
    });
    it("has three Grid components", () => {
      expect(wrapper.find("Grid").length).toBe(3);
    });
    it("has a container Grid", () => {
      const { direction, alignItems, justify } = wrapper
        .find("Grid")
        .at(0)
        .props();
      expect(direction).toEqual("row");
      expect(alignItems).toEqual("flex-start");
      expect(justify).toEqual("space-between");
    });
    it("has Grid with WeatherWidget", () => {
      expect(
        wrapper
          .find("Grid")
          .at(1)
          .find("WeatherWidget").length
      ).toBe(1);
    });
    it("has Grid with 'sign in' Button", () => {
      expect(
        wrapper
          .find("Grid")
          .at(2)
          .find("Button")
          .find("Typography")
          .text()
      ).toBe("Sign in");
    });
  });
});
