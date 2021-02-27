import React from "react";
import { render } from "@testing-library/react";
import PageBackground from "./PageBackground";

it("renders correctly", () => {
  const { getByAltText } = render(<PageBackground source="my-picture.jpg" />);
  expect(getByAltText("page-background")).toBeInTheDocument();
  expect(getByAltText("page-background")).toHaveAttribute("src", "my-picture.jpg");
});
