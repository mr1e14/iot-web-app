import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import SettingComponent from "./SettingComponent";

const LightEffectsSettingsOptions = props => {
  const { configOptions, classes, handleChange, effectName, state } = props;
  return (
    <div>
      {configOptions.map(option => (
        <div key={option.name} className={classes.settingContainer}>
          <Typography variant="subtitle1" color="textSecondary">
            {option.description}
          </Typography>
          <SettingComponent
            component={option.component}
            componentProps={option.props}
            stateKey={option.stateKey}
            effectName={effectName}
            optionName={option.name}
            handleChange={handleChange}
            value={state[option.stateKey]}
          />
        </div>
      ))}
    </div>
  );
};

LightEffectsSettingsOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  configOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  effectName: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
};

export default LightEffectsSettingsOptions;
