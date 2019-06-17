import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("../mediaQuery");

import LightOverview from "../LightOverview";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const exampleClasses = {
  lightRow: "lightRow"
};

const exampleTheme = {
  palette: {
    primary: {
      main: "#fff"
    }
  }
};

const propsEnabled = {
  name: "Bedroom",
  connected: true,
  on: true,
  brightness: 75,
  effect: null,
  color: "#42f48f"
};

const propsDisabled = {
  name: "Bedroom",
  connected: true,
  on: false,
  brightness: 25,
  effect: null,
  color: "#42f48f"
};

const propsDisconnected = {
  name: "Bedroom",
  connected: false,
  on: undefined,
  brightness: undefined,
  effect: undefined,
  color: undefined
};

describe("LightOverview", () => {
  let tree;
  let component;
  let wrapper;
  describe("when light is enabled", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightOverview
          classes={exampleClasses}
          theme={exampleTheme}
          data={propsEnabled}
        />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightOverview
          classes={exampleClasses}
          theme={exampleTheme}
          data={propsEnabled}
        />
      );
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has all elements enabled", () => {
      expect(wrapper.find(IconButton).prop("disabled")).toBe(false);
      expect(wrapper.find(Button).prop("disabled")).toBe(false);
      expect(wrapper.find("Slider").prop("disabled")).toBe(false);
    });
    it("has a Grid container with correct attributes", () => {
      const gridStyle = wrapper
        .find(Grid)
        .at(0)
        .prop("style");
      expect(gridStyle).toHaveProperty(
        "background",
        "linear-gradient(45deg, #42f48f 35%, rgb(242,242,242) 90%)"
      );
      expect(gridStyle).toHaveProperty("opacity", 1);
      expect(gridStyle).toHaveProperty("cursor", "pointer");
    });
    it("has a main button with correct text", () => {
      expect(wrapper.find(Button).text()).toEqual("Bedroom");
    });
    it("has a working toggle button", () => {
      wrapper.find(IconButton).simulate("click");
      expect(wrapper.find("LightOverview").instance().state.on).toBe(false);
    });
    it("has an iconButton with correct icon", () => {
      expect(wrapper.find("MaterialIcon").prop("iconName")).toEqual(
        "power_settings_new"
      );
    });
  });
  describe("when light is disabled", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightOverview
          classes={exampleClasses}
          theme={exampleTheme}
          data={propsDisabled}
        />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightOverview
          classes={exampleClasses}
          theme={exampleTheme}
          data={propsDisabled}
        />
      );
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has both buttons enabled", () => {
      expect(wrapper.find(IconButton).prop("disabled")).toBe(false);
      expect(wrapper.find(Button).prop("disabled")).toBe(false);
    });
    it("has a disabled Slider", () => {
      expect(wrapper.find("Slider").prop("disabled")).toBe(true);
    });
    it("has a Grid container with correct attributes", () => {
      const gridStyle = wrapper
        .find(Grid)
        .at(0)
        .prop("style");
      expect(gridStyle).toHaveProperty(
        "background",
        "linear-gradient(45deg, #42f48f 35%, rgb(242,242,242) 90%)"
      );
      expect(gridStyle).toHaveProperty("opacity", 0.2);
      expect(gridStyle).toHaveProperty("cursor", "pointer");
    });
    it("has a main button with correct text", () => {
      expect(wrapper.find(Button).text()).toEqual("Bedroom");
    });
    it("has an iconButton with correct icon", () => {
      expect(wrapper.find("MaterialIcon").prop("iconName")).toEqual(
        "power_settings_new"
      );
    });
  });
  describe("when light is disconnected", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightOverview
          classes={exampleClasses}
          theme={exampleTheme}
          data={propsDisconnected}
        />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightOverview
          classes={exampleClasses}
          theme={exampleTheme}
          data={propsDisconnected}
        />
      );
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("has all elements disabled", () => {
      expect(wrapper.find(IconButton).prop("disabled")).toBe(true);
      expect(wrapper.find(Button).prop("disabled")).toBe(true);
      expect(wrapper.find("Slider").prop("disabled")).toBe(true);
    });
    it("has a Grid container with correct attributes", () => {
      const gridStyle = wrapper
        .find(Grid)
        .at(0)
        .prop("style");
      expect(gridStyle).toHaveProperty(
        "background",
        "linear-gradient(45deg, #fff 35%, rgb(242,242,242) 90%)"
      );
      expect(gridStyle).toHaveProperty("opacity", 0.2);
      expect(gridStyle).toHaveProperty("cursor", "no-drop");
    });
    it("has a main button with correct text", () => {
      expect(wrapper.find(Button).text()).toEqual("Bedroom");
    });
    it("has an iconButton with correct icon", () => {
      expect(wrapper.find("MaterialIcon").prop("iconName")).toEqual(
        "power_off"
      );
    });
  });
});
