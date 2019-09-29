import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import LightBrightnessSlider from "../LightBrigtnessSlider";
import Slider from "@material-ui/core/Slider";

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
  it("renders correctly", () => {
    component = renderer.create(<LightBrightnessSlider />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("when light is enabled", () => {
    beforeEach(() => {
      wrapper = mount(
        <LightBrightnessSlider {...propsEnabled} handleChange={handleChange} />
      );
    });
    it("is enabled", () => {
      expect(wrapper.find(Slider).prop("disabled")).toBe(false);
    });
  });
  describe("when light is disabled", () => {
    beforeEach(() => {
      wrapper = mount(
        <LightBrightnessSlider {...propsDisabled} handleChange={handleChange} />
      );
    });
    it("is disabled", () => {
      expect(wrapper.find(Slider).prop("disabled")).toBe(true);
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
      expect(wrapper.find(Slider).prop("disabled")).toBe(true);
    });
  });
});
