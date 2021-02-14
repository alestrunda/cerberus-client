import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Checkbox from "./Checkbox";

it("renders Checkbox", () => {
  const handler = jest.fn();
  const { getByText } = render(<Checkbox onChange={handler}>Is paid?</Checkbox>);
  expect(getByText("Is paid?")).toBeInTheDocument();
});

it("when Checkbox clicked then onChange is triggered", () => {
  const handler = jest.fn();
  const { getByText } = render(<Checkbox onChange={handler}>Is paid?</Checkbox>);
  fireEvent.click(getByText("Is paid?"));
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith(true);
});
