import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import LightBrightnessSlider from "../LightBrigtnessSlider";

const propsEnabled = {
  on: true,
  connected: true,
  brightness: 25
};

const propsDisabled = {
  on: false,
  connected: true,
  brightness: 25
};

const propsDisconnected = {
  on: undefined,
  connected: false,
  brightness: undefined
};

const handleChange = jest.fn();

describe("LightBrightnessSlider", () => {
  let tree;
  let component;
  let wrapper;
  describe("when light is enabled", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightBrightnessSlider {...propsEnabled} handleChange={handleChange} />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightBrightnessSlider {...propsEnabled} handleChange={handleChange} />
      );
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("is enabled", () => {
      expect(wrapper.find("Slider").prop("disabled")).toBe(false);
    });
  });
  describe("when light is disabled", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightBrightnessSlider {...propsDisabled} handleChange={handleChange} />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightBrightnessSlider {...propsDisabled} handleChange={handleChange} />
      );
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("is disabled", () => {
      expect(wrapper.find("Slider").prop("disabled")).toBe(true);
    });
  });
  describe("when light is disconnected", () => {
    beforeEach(() => {
      component = renderer.create(
        <LightBrightnessSlider
          {...propsDisconnected}
          handleChange={handleChange}
        />
      );
      tree = component.toJSON();
      wrapper = mount(
        <LightBrightnessSlider
          {...propsDisconnected}
          handleChange={handleChange}
        />
      );
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("is disabled", () => {
      expect(wrapper.find("Slider").prop("disabled")).toBe(true);
    });
  });
});
