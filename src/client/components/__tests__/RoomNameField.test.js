import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import TextField from "@material-ui/core/TextField";

import RoomNameField from "../RoomNameField";

const classes = {
  textCenter: {
    textAlign: "center"
  }
};

describe("RoomNameField", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <RoomNameField classes={classes} name="bedroom" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("flags errors when invalid name is given", () => {
    const wrapper = mount(<RoomNameField name="" classes={classes} />);
    const textField = wrapper.find(TextField);
    expect(textField.prop("error")).toBe(true);
    expect(textField.prop("helperText").length).toBeGreaterThan(0);
  });
  it("does not flag errors when valid name is given", () => {
    const wrapper = mount(<RoomNameField name="bedroom" classes={classes} />);
    const textField = wrapper.find(TextField);
    expect(textField.prop("error")).toBe(false);
    expect(textField.prop("helperText").length).toBe(0);
  });
  it("may be used to change name", () => {
    const wrapper = mount(<RoomNameField name="bedroom" classes={classes} />);
    const textField = wrapper.find(TextField);
    textField.props().onChange({ target: { value: "new name" } });
    wrapper.update();
    expect(wrapper.instance().state.name).toEqual("new name");
  });
});
