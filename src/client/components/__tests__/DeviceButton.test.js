import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("../mediaQuery");

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeviceButton from "../DeviceButton";

const exampleDeviceButtonProps = {
  className: "button1",
  text: "Manage lights",
  iconSrc: "../img/some_img.png",
  iconAlt: "lights-button"
};

describe("DeviceButton", () => {
  let tree;
  let component;
  describe("when props are supplied", () => {
    beforeEach(() => {
      component = renderer.create(
        <DeviceButton {...exampleDeviceButtonProps} />
      );
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("when renders", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<DeviceButton {...exampleDeviceButtonProps} />);
    });
    it("has one Button", () => {
      expect(wrapper.find(Button).length).toEqual(1);
    });
    it("has correct Button class", () => {
      expect(wrapper.find(Button).hasClass("button1")).toEqual(true);
    });
    it("displays text related to a device", () => {
      expect(wrapper.find(Typography).text()).toBe("Manage lights");
    });
    it("displays device icon", () => {
      expect(wrapper.find("img").prop("src")).toBe("../img/some_img.png");
      expect(wrapper.find("img").prop("alt")).toBe("lights-button");
    });
  });
});
