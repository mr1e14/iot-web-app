import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

jest.mock("../mediaQuery");

import MaterialIcon from "../MaterialIcon";
import matches from "../mediaQuery";

describe("MaterialIcon", () => {
  let tree;
  let component;
  describe("on xs devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(false);
      component = renderer.create(<MaterialIcon iconName="account_circle" />);
      tree = component.toJSON();
    });
    it("renders correctly", () => {
      expect(tree).toMatchSnapshot();
    });
  });
  describe("on larger devices", () => {
    beforeEach(() => {
      matches.mockReturnValue(true);
      component = renderer.create(<MaterialIcon iconName="account_circle" />);
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
      it("has .md-28 class", () => {
        const wrapper = mount(<MaterialIcon iconName="account_circle" />);
        expect(wrapper.find(".material-icons.md-28").exists()).toEqual(true);
      });
    });
    describe("On larger devices", () => {
      beforeEach(() => {
        matches.mockReturnValue(true);
      });
      it("has .md-40 class", () => {
        const wrapper = mount(<MaterialIcon iconName="account_circle" />);
        expect(wrapper.find(".material-icons.md-40").exists()).toEqual(true);
      });
    });
  });
});
