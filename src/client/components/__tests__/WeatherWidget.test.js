import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("../mediaQuery");

import WeatherWidget from "../WeatherWidget";
import WeatherIcon from "../WeatherWidget";
import matches from "../mediaQuery";

const exampleWeatherData = {
  icon: "partly-cloudy",
  temperature: "15",
  humidity: "0.75"
};

describe("WeatherWidget", () => {
  let tree;
  let component;
  describe("when weatherData is supplied", () => {
    beforeEach(() => {
      component = renderer.create(
        <WeatherWidget weatherData={exampleWeatherData} />
      );
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("when weatherData is not available", () => {
    beforeEach(() => {
      component = renderer.create(<WeatherWidget weatherData={null} />);
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("when renders", () => {
    let wrapper;
    describe("on xs devices", () => {
      beforeEach(() => {
        matches.mockReturnValue(false);
        wrapper = mount(<WeatherWidget weatherData={exampleWeatherData} />);
      });
      it("has one WeatherIcon", () => {
        expect(wrapper.find(WeatherIcon).length).toEqual(1);
      });
      it("presents weather data excluding humidity", () => {
        expect(
          wrapper
            .find("span")
            .at(1)
            .text()
        ).toBe("15°C");
      });
    });
    describe("on larger devices", () => {
      beforeEach(() => {
        matches.mockReturnValue(true);
        wrapper = mount(<WeatherWidget weatherData={exampleWeatherData} />);
      });
      it("has one WeatherIcon", () => {
        expect(wrapper.find(WeatherIcon).length).toEqual(1);
      });
      it("presents weather data including humidity", () => {
        expect(
          wrapper
            .find("span")
            .at(1)
            .text()
        ).toBe("15°C / 75%");
      });
    });
  });
});
