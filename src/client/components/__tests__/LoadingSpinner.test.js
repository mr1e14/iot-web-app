import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import LoadingSpinner from "../LoadingSpinner";
import CircularProgress from "@material-ui/core/CircularProgress";

describe("LoadingSpinner", () => {
  let tree;
  let component;
  beforeEach(() => {
    component = renderer.create(<LoadingSpinner />);
    tree = component.toJSON();
  });
  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });
  describe("when renders", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<LoadingSpinner />);
    });
    it("is inside a container", () => {
      expect(
        wrapper
          .find("div")
          .at(0)
          .prop("className")
      ).toContain("spinnerContainer");
    });
    it("has a CircularProgress component", () => {
      expect(wrapper.find(CircularProgress).exists()).toEqual(true);
    });
  });
});
