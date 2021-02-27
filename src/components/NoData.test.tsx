import React from "react";
import { render } from "@testing-library/react";
import NoData from "./NoData";

it("renders correctly", () => {
  const { getByText } = render(<NoData />);
  expect(getByText("No data")).toBeInTheDocument();
});

it("renders correctly with custom text", () => {
  const { getByText } = render(<NoData text="Nothing here" />);
  expect(getByText("Nothing here")).toBeInTheDocument();
});
