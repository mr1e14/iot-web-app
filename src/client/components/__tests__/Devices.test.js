import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("../mediaQuery");

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeviceButton from "../DeviceButton";
import Devices from "../Devices";
import matches from "../mediaQuery";

const exampleClasses = {
  child: "child",
  childGridCenter: "childGridCenter",
  childGridLeft: "childGridLeft",
  childGridRight: "childGridRight",
  button1: "button1",
  button2: "button2",
  button3: "button3",
  button4: "button4"
};

describe("Devices", () => {
  let tree;
  let component;
  describe("on xs devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(true);
      component = renderer.create(<Devices classes={exampleClasses} />);
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("on larger devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(false);
      component = renderer.create(<Devices classes={exampleClasses} />);
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
        matches.mockReturnValue(true);
        wrapper = mount(<Devices classes={exampleClasses} />);
      });
      it("has a header with text in the centre", () => {
        expect(
          wrapper
            .find(Typography)
            .at(0)
            .text()
        ).toEqual("Smart devices");
        expect(
          wrapper
            .find(Grid)
            .at(0)
            .hasClass("childGridCenter")
        ).toBe(true);
      });
      it("has four DeviceButtons", () => {
        expect(wrapper.find(DeviceButton).length).toEqual(4);
      });
      it("has five Grids", () => {
        expect(wrapper.find(Grid).length).toEqual(5);
      });
      it("assigned child class to Grids with DeviceButton so there is one per line", () => {
        expect(
          wrapper
            .find(Grid)
            .at(1)
            .hasClass("child")
        ).toBe(true);
        expect(
          wrapper
            .find(Grid)
            .at(2)
            .hasClass("child")
        ).toBe(true);
        expect(
          wrapper
            .find(Grid)
            .at(3)
            .hasClass("child")
        ).toBe(true);
        expect(
          wrapper
            .find(Grid)
            .at(4)
            .hasClass("child")
        ).toBe(true);
      });
    });
    describe("on larger devices", () => {
      beforeEach(() => {
        matches.mockReturnValue(false);
        wrapper = mount(<Devices classes={exampleClasses} />);
      });
      it("has a header with text in the centre", () => {
        expect(
          wrapper
            .find(Typography)
            .at(0)
            .text()
        ).toEqual("Smart devices");
        expect(
          wrapper
            .find(Grid)
            .at(0)
            .hasClass("childGridCenter")
        ).toBe(true);
      });
      it("has four DeviceButtons", () => {
        expect(wrapper.find(DeviceButton).length).toEqual(4);
      });
      it("has five Grids", () => {
        expect(wrapper.find(Grid).length).toEqual(5);
      });
      it("assigned classes to Grids with DeviceButton such that there are two per line", () => {
        expect(
          wrapper
            .find(Grid)
            .at(1)
            .hasClass("childGridLeft")
        ).toBe(true);
        expect(
          wrapper
            .find(Grid)
            .at(2)
            .hasClass("childGridRight")
        ).toBe(true);
        expect(
          wrapper
            .find(Grid)
            .at(3)
            .hasClass("childGridLeft")
        ).toBe(true);
        expect(
          wrapper
            .find(Grid)
            .at(4)
            .hasClass("childGridRight")
        ).toBe(true);
      });
    });
  });
});
