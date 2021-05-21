import { fireEvent, render } from "@testing-library/react";
import Checkbox from "./Checkbox";

it("renders correctly", () => {
  const { container, getByText } = render(<Checkbox onChange={() => {}}>Is paid?</Checkbox>);
  expect(container.querySelector("input[type=checkbox]")).toBeInTheDocument();
  expect(container.querySelector("svg")).toBeInTheDocument();
  expect(getByText("Is paid?")).toBeInTheDocument();
});

it("default state is false", () => {
  const { container } = render(<Checkbox onChange={() => {}}>Is paid?</Checkbox>);
  expect(container.querySelector(".input-checkbox__icon.active")).not.toBeInTheDocument();
});

it("when checked then renders 'active' class", () => {
  const { container } = render(
    <Checkbox isChecked onChange={() => {}}>
      Is paid?
    </Checkbox>
  );
  expect(container.querySelector(".input-checkbox__icon.active")).toBeInTheDocument();
});

it("when clicked then onChange is triggered", () => {
  const handler = jest.fn();
  const { getByText } = render(<Checkbox onChange={handler}>Is paid?</Checkbox>);
  fireEvent.click(getByText("Is paid?"));
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith(true);
});
