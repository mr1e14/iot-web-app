import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

jest.mock("react-router-dom", () => ({
  Link: "button"
}));

import LightPanel from "../LightsPanel";

const exampleClasses = {
  lightsPanel: "lightsPanel",
  child: "child"
};

describe("LightsPanel", () => {
  let tree;
  let component;
  let wrapper;
  const loadData = wrapper => {
    global
      .fetch()
      .then(data => data.json())
      .then(data => wrapper.setState({ ...data }));
  };
  describe("when one light is provided", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve({lightIds: ["1"]}) })
      );
      component = renderer.create(
        <LightPanel classes={exampleClasses} isMd={true} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightPanel classes={exampleClasses} isMd={true} />);
      loadData(wrapper);
      wrapper.update();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a Grid container with a custom class", () => {
      expect(
        wrapper
          .find(Grid)
          .first()
          .hasClass("lightsPanel")
      ).toBe(true);
    });
    it("has a header with text in the centre", () => {
      expect(
        wrapper
          .find(Typography)
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
          .find(Grid)
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
      global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve({lightIds: ["1", "2"]}) })
      );
      component = renderer.create(
        <LightPanel classes={exampleClasses} isMd={true} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightPanel classes={exampleClasses} isMd={true} />);
      loadData(wrapper);
      wrapper.update();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a Grid container with a custom class", () => {
      expect(
        wrapper
          .find(Grid)
          .at(0)
          .hasClass("lightsPanel")
      ).toBe(true);
    });
    it("has a header with text in the centre", () => {
      expect(
        wrapper
          .find(Typography)
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
          .find(Grid)
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
      global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve({lightIds: []}) })
      );
      component = renderer.create(
        <LightPanel classes={exampleClasses} isMd={true} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightPanel classes={exampleClasses} isMd={true} />);
      loadData(wrapper);
      wrapper.update();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a Grid container with a custom class", () => {
      expect(
        wrapper
          .find(Grid)
          .at(0)
          .hasClass("lightsPanel")
      ).toBe(true);
    });
    it("has a header with text in the centre", () => {
      expect(
        wrapper
          .find(Typography)
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
  describe("on sm and smaller devices", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve({lightIds: []}) })
      );
      component = renderer.create(
        <LightPanel classes={exampleClasses} isMd={false} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightPanel classes={exampleClasses} isMd={false} />);
      loadData(wrapper);
      wrapper.update();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a spacing value of 1", () => {
      expect(
        wrapper
          .find(Grid)
          .last()
          .prop("spacing")
      ).toEqual(1);
    });
  });
  describe("on larger devices", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
         Promise.resolve({ json: () => Promise.resolve({lightIds: []}) })
      );
      component = renderer.create(
        <LightPanel classes={exampleClasses} isMd={true} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightPanel classes={exampleClasses} isMd={true} />);
      loadData(wrapper);
      wrapper.update();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has a spacing value of 2", () => {
      expect(
        wrapper
          .find(Grid)
          .last()
          .prop("spacing")
      ).toEqual(2);
    });
  });
});
