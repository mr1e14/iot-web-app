import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

const breakpoints = {
  sm: "(min-width: 600px)",
  md: "(min-width: 960px)",
  lg: "(min-width: 1280px)",
  xl: "(min-width: 1920px)"
};

const matches = size => {
  return useMediaQuery(breakpoints[size]);
};

export default matches;
