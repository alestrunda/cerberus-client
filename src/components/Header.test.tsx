import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

it("renders title with link to the homepage", () => {
  const { container } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(container.querySelector("a.page-head__title")).toHaveAttribute("href", "/");
  expect(container.querySelector("h1")).toHaveTextContent("Cerberus");
});

it("renders a link in navigation", () => {
  const { container } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(container.querySelectorAll(".nav-main a").length).toBeGreaterThan(0);
});
