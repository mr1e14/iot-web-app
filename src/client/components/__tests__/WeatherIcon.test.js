import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("../mediaQuery");

import matches from "../mediaQuery";
import WeatherIcon from "../WeatherIcon";

const exampleWeatherData = {
  weatherData: {
    icon: "partly-cloudy",
    temperature: "15",
    humidity: "0.75"
  }
};

describe("WeatherIcon", () => {
  let tree;
  let component;
  describe("on xs devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(false);
      component = renderer.create(
        <WeatherIcon weatherData={exampleWeatherData} />
      );
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("on larger devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(true);
      component = renderer.create(
        <WeatherIcon weatherData={exampleWeatherData} />
      );
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("when weatherData is not available", () => {
    beforeEach(() => {
      component = renderer.create(<WeatherIcon weatherData={null} />);
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("size changes based on screen size", () => {
    describe("On xs devices", () => {
      beforeEach(() => {
        matches.mockReturnValue(false);
      });
      it("has has a height of 48px", () => {
        const wrapper = mount(<WeatherIcon weatherData={exampleWeatherData} />);
        expect(wrapper.find("img").prop("height")).toEqual("48px");
      });
    });
    describe("On larger devices", () => {
      beforeEach(() => {
        matches.mockReturnValue(true);
      });
      it("has has a height of 64px", () => {
        const wrapper = mount(<WeatherIcon weatherData={exampleWeatherData} />);
        expect(wrapper.find("img").prop("height")).toEqual("64px");
      });
    });
  });
});
