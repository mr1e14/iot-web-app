import React from "react";
import SettingsSlider from "./SettingsSlider";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

const variantComponent = {
  slider: SettingsSlider,
  input: TextField,
  checkbox: Checkbox
};

const variantProps = {
  slider: {},
  input: {
    margin: "normal",
    variant: "outlined"
  },
  checkbox: {}
};

const getValue = (component, value) => {
  switch (component) {
    case "checkbox":
      return { checked: value };
    case "slider":
      return { value: value };
    case "input":
      return { defaultValue: `${value}` };
  }
};

const SettingComponent = props => {
  const { component, componentProps, handleChange, stateKey, value } = props;
  const Component = variantComponent[component];
  const variantOnChange = {
    slider: {
      onChange: (event, value) => {
        handleChange(stateKey, value);
      }
    },
    input: {
      onChange: event => {
        handleChange(stateKey, event.target.value);
      }
    },
    checkbox: {
      onChange: event => {
        handleChange(stateKey, event.target.checked);
      }
    }
  };
  return (
    <Component
      {...getValue(component, value)}
      onChange={variantOnChange[component].onChange}
      {...variantProps[component]}
      {...componentProps}
    />
  );
};

export default SettingComponent;
