import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

const breakpoints = {
  xs: "(max-width: 599px)",
  sm: "(min-width: 600px) and (max-width: 959px)",
  md: "(min-width: 960px) and (max-width: 1287px)",
  lg: "(min-width: 1280px) and (max-width: 1919px)",
  xl: "(min-width: 1920px)"
};

const matches = size => {
  return useMediaQuery(breakpoints[size]);
};

export default matches;
