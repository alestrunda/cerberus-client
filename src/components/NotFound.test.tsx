import { render } from "@testing-library/react";
import NotFound from "./NotFound";

it("renders correctly", () => {
  const { getByText } = render(<NotFound />);
  expect(getByText("Not found")).toBeInTheDocument();
});

it("renders correctly with custom text", () => {
  const { getByText } = render(<NotFound text="Nothing here" />);
  expect(getByText("Nothing here")).toBeInTheDocument();
});
