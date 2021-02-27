import React from "react";
import { fireEvent, render } from "@testing-library/react";
import InputField from "./InputField";

it("renders correctly", () => {
  const { container } = render(
    <InputField onChange={() => {}} label="My input" value="Hello World" />
  );
  expect(container.querySelector("input[type=text]")).toHaveValue("Hello World");
});

it("renders number input", () => {
  const { container } = render(
    <InputField onChange={() => {}} type="number" label="My number input" value={120} />
  );
  expect(container.querySelector("input[type=number]")).toHaveValue(120);
});

it("when changed then onChange is triggered", () => {
  const handler = jest.fn();
  const { getByPlaceholderText } = render(
    <InputField onChange={handler} label="Input" placeholder="Type value here" value="" />
  );
  const input = getByPlaceholderText("Type value here");
  fireEvent.change(input, { target: { value: "school" } });
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith("school");
});
