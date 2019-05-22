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

describe("LightBrightnessSlider", () => {
  let tree;
  let component;
  let wrapper;
  describe("when light is enabled", () => {
    beforeEach(() => {
      component = renderer.create(<LightBrightnessSlider {...propsEnabled} />);
      tree = component.toJSON();
      wrapper = mount(<LightBrightnessSlider {...propsEnabled} />);
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("is enabled", () => {
      expect(wrapper.find("Slider").prop("disabled")).toBe(false);
    });
    it("may be used to adjust brightness", () => {
      const newBrightness = 75;
      wrapper
        .find("Slider")
        .props()
        .onChange({}, newBrightness);
      expect(wrapper.find("LightBrightnessSlider").state()).toEqual({
        value: newBrightness
      });
    });
  });
  describe("when light is disabled", () => {
    beforeEach(() => {
      component = renderer.create(<LightBrightnessSlider {...propsDisabled} />);
      tree = component.toJSON();
      wrapper = mount(<LightBrightnessSlider {...propsDisabled} />);
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
        <LightBrightnessSlider {...propsDisconnected} />
      );
      tree = component.toJSON();
      wrapper = mount(<LightBrightnessSlider {...propsDisconnected} />);
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
    it("is disabled", () => {
      expect(wrapper.find("Slider").prop("disabled")).toBe(true);
    });
  });
});
