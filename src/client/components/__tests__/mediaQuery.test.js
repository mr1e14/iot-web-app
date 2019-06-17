jest.mock("@material-ui/core/useMediaQuery");

import useMediaQuery from "@material-ui/core/useMediaQuery";
import matches from "../mediaQuery";

describe("mediaQuery", () => {
  it("passes (min-width: 600px) when sm supplied", () => {
    matches("sm");
    expect(useMediaQuery).toHaveBeenCalledWith("(min-width: 600px)");
  });
  it("passes (min-width: 960px) when md supplied", () => {
    matches("md");
    expect(useMediaQuery).toHaveBeenCalledWith("(min-width: 960px)");
  });
  it("passes (min-width: 1280px) when md supplied", () => {
    matches("lg");
    expect(useMediaQuery).toHaveBeenCalledWith("(min-width: 1280px)");
  });
  it("passes (min-width: 1920px) when md supplied", () => {
    matches("xl");
    expect(useMediaQuery).toHaveBeenCalledWith("(min-width: 1920px)");
  });
});
