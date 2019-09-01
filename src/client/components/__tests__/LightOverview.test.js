import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("axios");

import LightOverview from "../LightOverview";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

jest.mock("react-router-dom", () => ({
  Link: "button"
}));

const exampleClasses = {
  lightRow: "lightRow"
};

const dataEnabled = {
  id: "1",
  name: "Bedroom",
  connected: true,
  on: true,
  brightness: 75,
  effect: null,
  color: "#42f48f"
};

const dataDisabled = {
  id: "2",
  name: "Bedroom",
  connected: true,
  on: false,
  brightness: 25,
  effect: null,
  color: "#42f48f"
};

const dataDisconnected = {
  id: "3",
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
  const loadData = wrapper => {
    global.fetch().then(data => data.json()).then(data => wrapper.setState({...data}))
  }
  describe("when light is enabled", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({json: () => Promise.resolve(dataEnabled)}));
      component = renderer.create(
        <LightOverview
          classes={exampleClasses}
          id="1"
        />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightOverview
          classes={exampleClasses}
          id="1"
        />
      );
      loadData(wrapper);
      wrapper.update();
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
    it("has a slider which can adjust brightness", () => {
      wrapper.find("Slider").props().onChange({}, 50);
      expect(wrapper.instance().state.brightness).toBe(50);
    })
  });
  describe("when light is disabled", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({json: () => Promise.resolve(dataDisabled)}));
      component = renderer.create(
        <LightOverview
          classes={exampleClasses}
          id="2"
        />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightOverview
          classes={exampleClasses}
          id="2"
        />
      );
      loadData(wrapper);
      wrapper.update();
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
      global.fetch = jest.fn(() => Promise.resolve({json: () => Promise.resolve(dataDisconnected)}));
      component = renderer.create(
        <LightOverview
          classes={exampleClasses}
          id="3"
        />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightOverview
          classes={exampleClasses}
          id="3"
        />
      );
      loadData(wrapper);
      wrapper.update();
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
        "linear-gradient(45deg, #1a1a1a 35%, rgb(242,242,242) 90%)"
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
