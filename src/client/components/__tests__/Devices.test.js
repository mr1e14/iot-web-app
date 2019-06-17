import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("react-router-dom", () => ({
  Link: "div"
}));

jest.mock("../mediaQuery");

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeviceButton from "../DeviceButton";
import Devices from "../Devices";
import matches from "../mediaQuery";

const exampleClasses = {
  child: "child",
  deviceButton1: "deviceButton1",
  deviceButton2: "deviceButton2",
  deviceButton3: "deviceButton3",
  deviceButton4: "deviceButton4"
};

describe("Devices", () => {
  let tree;
  let component;
  describe("on xs devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(false);
      component = renderer.create(<Devices classes={exampleClasses} />);
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("on larger devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(true);
      component = renderer.create(<Devices classes={exampleClasses} />);
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("when renders", () => {
    let wrapper;
    describe("on xs and sm devices", () => {
      beforeEach(() => {
        matches.mockReturnValue(false);
        wrapper = mount(<Devices classes={exampleClasses} />);
      });
      it("has a root container spacing of 2", () => {
        expect(
          wrapper
            .find(Grid)
            .at(0)
            .prop("spacing")
        ).toEqual(2);
      });
      it("has a header with text in the centre", () => {
        expect(
          wrapper
            .find(Typography)
            .first()
            .text()
        ).toEqual("Smart devices");
        expect(
          wrapper
            .find(Grid)
            .at(1)
            .hasClass("child")
        ).toBe(true);
      });
      it("has four DeviceButtons", () => {
        expect(wrapper.find(DeviceButton).length).toEqual(4);
      });
      it("has six Grids", () => {
        expect(wrapper.find(Grid).length).toEqual(6);
      });
    });
    describe("on larger devices", () => {
      beforeEach(() => {
        matches.mockReturnValue(true);
        wrapper = mount(<Devices classes={exampleClasses} />);
      });
      it("has a root container spacing of 3", () => {
        expect(
          wrapper
            .find(Grid)
            .at(0)
            .prop("spacing")
        ).toEqual(3);
      });
      it("has a header with text in the centre", () => {
        expect(
          wrapper
            .find(Typography)
            .first()
            .text()
        ).toEqual("Smart devices");
        expect(
          wrapper
            .find(Grid)
            .at(1)
            .hasClass("child")
        ).toBe(true);
      });
      it("has four DeviceButtons", () => {
        expect(wrapper.find(DeviceButton).length).toEqual(4);
      });
      it("has six Grids", () => {
        expect(wrapper.find(Grid).length).toEqual(6);
      });
    });
  });
});
