import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import TextField from "@material-ui/core/TextField";

import LightNameField from "../LightNameField";

const classes = {
  textCenter: {
    textAlign: "center"
  }
};

const handleChange = jest.fn();

describe("LightNameField", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <LightNameField
        handleChange={handleChange}
        classes={classes}
        name="bedroom"
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("flags errors when invalid name is given", () => {
    const wrapper = mount(
      <LightNameField name="" classes={classes} handleChange={handleChange} />
    );
    const textField = wrapper.find(TextField);
    expect(textField.prop("error")).toBe(true);
    expect(textField.prop("helperText").length).toBeGreaterThan(0);
  });
  it("does not flag errors when valid name is given", () => {
    const wrapper = mount(
      <LightNameField
        name="bedroom"
        classes={classes}
        handleChange={handleChange}
      />
    );
    const textField = wrapper.find(TextField);
    expect(textField.prop("error")).toBe(false);
    expect(textField.prop("helperText").length).toBe(0);
  });
  it("changes isValid state based on input", () => {
    const wrapper = mount(
      <LightNameField
        name="bedroom"
        classes={classes}
        handleChange={handleChange}
      />
    );
    const textField = wrapper.find(TextField);
    textField.props().onChange({ target: { value: "" } });
    wrapper.update();
    expect(wrapper.instance().state.isValid).toEqual(false);

    textField.props().onChange({ target: { value: "hallway" } });
    wrapper.update();
    expect(wrapper.instance().state.isValid).toEqual(true);
  });
});
