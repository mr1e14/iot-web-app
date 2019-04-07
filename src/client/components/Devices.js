import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import lightIcon from "../img/light.png";
import thermometerIcon from "../img/thermometer.png";
import humidityIcon from "../img/humidity.png";
import matches from "../mediaQuery";

const Devices = props => {
  const { classes } = props;

  const imageMargin = matches("xs") ? "0.25rem" : "1rem";

  return (
    <React.Fragment>
      <Grid className={classes.childGridCenter} item xs={12}>
        <Typography variant="subtitle1">Smart devices</Typography>
      </Grid>
      <Grid className={classes.childGridLeft} item xs={6}>
        <Button fullWidth={true} className={classes.button1} elevation={20}>
          <Typography>Manage lights</Typography>
          <img
            src={lightIcon}
            alt="light-icon"
            style={{ marginLeft: imageMargin }}
          />
        </Button>
      </Grid>
      <Grid className={classes.childGridRight} item xs={6}>
        <Button fullWidth={true} className={classes.button2} elevation={17}>
          <img
            src={thermometerIcon}
            alt="thermometer-icon"
            style={{ marginRight: imageMargin }}
          />
          <Typography>House avg. 21°C</Typography>
        </Button>
      </Grid>
      <Grid className={classes.childGridLeft} item xs={6}>
        <Button fullWidth={true} className={classes.button3} elevation={20}>
          <Typography>Some text here</Typography>
          <img src={lightIcon} style={{ marginLeft: imageMargin }} />
        </Button>
      </Grid>
      <Grid className={classes.childGridRight} item xs={6}>
        <Button fullWidth={true} className={classes.button4} elevation={17}>
          <img
            src={humidityIcon}
            alt="humidity-icon"
            style={{ marginRight: imageMargin }}
          />
          <Typography>House avg. 77%</Typography>
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Devices;
