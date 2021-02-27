import React from "react";
import { fireEvent, render } from "@testing-library/react";
import InputNumberAdd from "./InputNumberAdd";

it("renders correctly", () => {
  const { container } = render(<InputNumberAdd onChange={() => {}} label="My input" value={0} />);
  expect(container.querySelector(".input-add__val input[type=text]")).toHaveValue("0");
  expect(container.querySelector(".input-add__inner input[type=text]")).toBeInTheDocument();
});

it("renders number input", () => {
  const { container } = render(
    <InputNumberAdd onChange={() => {}} type="number" label="My number input" value={120} />
  );
  expect(container.querySelector(".input-add__val input[type=number]")).toHaveValue(120);
});

it("when changed then onChange is triggered", () => {
  const handler = jest.fn();
  const { getByPlaceholderText } = render(
    <InputNumberAdd onChange={handler} label="Input" placeholder="Type value here" value={25} />
  );
  const input = getByPlaceholderText("Type value here");
  fireEvent.change(input, { target: { value: "75" } });
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith(75);
});

it("when add value is set and button Add is clicked then onChange is called with the added value", () => {
  const handler = jest.fn();
  const { getByText, getByTestId } = render(
    <InputNumberAdd onChange={handler} label="Input" placeholder="Type value here" value={25} />
  );
  const inputAdd = getByTestId("inputAdd");
  const buttonAdd = getByText("Add");
  fireEvent.change(inputAdd, { target: { value: "75" } });
  fireEvent.click(buttonAdd);
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith(100);
});
