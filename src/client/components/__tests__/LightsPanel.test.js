import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("../mediaQuery");
jest.mock("react-router-dom", () => ({
  Link: "button"
}));

import LightPanel from "../LightsPanel";
import matches from "../mediaQuery";

const exampleClasses = {
  lightsPanel: "lightsPanel",
  child: "child"
};

const oneLight = [
  {
    name: "Bedroom",
    connected: true,
    on: true,
    brightness: 100,
    effect: null,
    color: "#42f48f"
  }
];

const twoLights = [
  {
    name: "Bedroom",
    connected: true,
    on: true,
    brightness: 100,
    effect: null,
    color: "#42f48f"
  },
  {
    name: "Hall",
    connected: true,
    on: false,
    brightness: 14,
    effect: null,
    color: "#ff8026"
  }
];

describe("LightsPanel", () => {
  let tree;
  let component;
  let wrapper;
  describe("when one light is provided", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightPanel classes={exampleClasses} lightsData={oneLight} />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightPanel classes={exampleClasses} lightsData={oneLight} />
      );
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a Grid container with a custom class", () => {
      expect(
        wrapper
          .find("Grid")
          .at(0)
          .hasClass("lightsPanel")
      ).toBe(true);
    });
    it("has a header with text in the centre", () => {
      expect(
        wrapper
          .find("Typography")
          .at(0)
          .text()
      ).toEqual("Manage lights");
    });
    it("has an iconButton for navigating to homepage", () => {
      expect(
        wrapper
          .find("MaterialIcon")
          .at(0)
          .prop("iconName")
      ).toEqual("arrow_back");
    });
    it("has an iconButton for adding lights", () => {
      expect(
        wrapper
          .find("MaterialIcon")
          .at(1)
          .prop("iconName")
      ).toEqual("add_circle");
    });
    it("positions the LightOverview component in the centre", () => {
      expect(
        wrapper
          .find("Grid")
          .at(5)
          .prop("justify")
      ).toEqual("center");
    });
    it("has one LightOverview component", () => {
      expect(wrapper.find("LightOverview").length).toBe(1);
    });
  });
  describe("when two lights are provided", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightPanel classes={exampleClasses} lightsData={twoLights} />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightPanel classes={exampleClasses} lightsData={twoLights} />
      );
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a Grid container with a custom class", () => {
      expect(
        wrapper
          .find("Grid")
          .at(0)
          .hasClass("lightsPanel")
      ).toBe(true);
    });
    it("has a header with text in the centre", () => {
      expect(
        wrapper
          .find("Typography")
          .at(0)
          .text()
      ).toEqual("Manage lights");
    });
    it("has an iconButton for navigating to homepage", () => {
      expect(
        wrapper
          .find("MaterialIcon")
          .at(0)
          .prop("iconName")
      ).toEqual("arrow_back");
    });
    it("has an iconButton for adding lights", () => {
      expect(
        wrapper
          .find("MaterialIcon")
          .at(1)
          .prop("iconName")
      ).toEqual("add_circle");
    });
    it("positions the LightOverview components side-by-side", () => {
      expect(
        wrapper
          .find("Grid")
          .at(5)
          .prop("justify")
      ).toEqual("flex-start");
    });
    it("has two LightOverview components", () => {
      expect(wrapper.find("LightOverview").length).toBe(2);
    });
  });
  describe("when no lights are provided", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightPanel classes={exampleClasses} lightsData={[]} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightPanel classes={exampleClasses} lightsData={[]} />);
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a Grid container with a custom class", () => {
      expect(
        wrapper
          .find("Grid")
          .at(0)
          .hasClass("lightsPanel")
      ).toBe(true);
    });
    it("has a header with text in the centre", () => {
      expect(
        wrapper
          .find("Typography")
          .at(0)
          .text()
      ).toEqual("Manage lights");
    });
    it("has an iconButton for navigating to homepage", () => {
      expect(
        wrapper
          .find("MaterialIcon")
          .at(0)
          .prop("iconName")
      ).toEqual("arrow_back");
    });
    it("has an iconButton for adding lights", () => {
      expect(
        wrapper
          .find("MaterialIcon")
          .at(1)
          .prop("iconName")
      ).toEqual("add_circle");
    });
    it("has no LightOverview components", () => {
      expect(wrapper.find("LightOverview").length).toBe(0);
    });
  });
  describe("on md and smaller devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(false);
      component = renderer.create(
        <LightPanel classes={exampleClasses} lightsData={[]} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightPanel classes={exampleClasses} lightsData={[]} />);
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a spacing value of 16", () => {
      expect(
        wrapper
          .find("Grid")
          .last()
          .prop("spacing")
      ).toEqual(16);
    });
  });
  describe("on larger devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(true);
      component = renderer.create(
        <LightPanel classes={exampleClasses} lightsData={[]} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightPanel classes={exampleClasses} lightsData={[]} />);
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a spacing value of 24", () => {
      expect(
        wrapper
          .find("Grid")
          .last()
          .prop("spacing")
      ).toEqual(24);
    });
  });
});
