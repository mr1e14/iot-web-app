import React from "react";
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

export default LightEffectsSettingsOptions;
