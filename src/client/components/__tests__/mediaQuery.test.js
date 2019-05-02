jest.mock("@material-ui/core/useMediaQuery");

import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import matches from "../mediaQuery";

describe("mediaQuery", () => {
  it("passes (max-width: 599px) when xs supplied", () => {
    matches("xs");
    expect(useMediaQuery).toHaveBeenCalledWith("(max-width: 599px)");
  });
  it("passes (min-width: 600px) and (max-width: 959px) when sm supplied", () => {
    matches("sm");
    expect(useMediaQuery).toHaveBeenCalledWith(
      "(min-width: 600px) and (max-width: 959px)"
    );
  });
  it("passes (min-width: 960px) and (max-width: 1287px) when md supplied", () => {
    matches("md");
    expect(useMediaQuery).toHaveBeenCalledWith(
      "(min-width: 960px) and (max-width: 1287px)"
    );
  });
  it("passes (min-width: 1280px) and (max-width: 1919px) when md supplied", () => {
    matches("lg");
    expect(useMediaQuery).toHaveBeenCalledWith(
      "(min-width: 1280px) and (max-width: 1919px)"
    );
  });
  it("passes (min-width: 1920px) when md supplied", () => {
    matches("xl");
    expect(useMediaQuery).toHaveBeenCalledWith("(min-width: 1920px)");
  });
});
