import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Logo from "../Logo";
import Grid from "@material-ui/core/Grid";

const exampleClasses = {
  child: "child"
};

describe("Logo", () => {
  let tree;
  let component;
  beforeEach(() => {
    component = renderer.create(<Logo classes={exampleClasses} />);
    tree = component.toJSON();
  });
  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });
  describe("when renders", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Logo classes={exampleClasses} />);
    });
    it("is inside a Grid element", () => {
      expect(wrapper.find(Grid).length).toBe(1);
    });
    it("has an image", () => {
      expect(wrapper.find("img").exists()).toEqual(true);
    });
  });
});
