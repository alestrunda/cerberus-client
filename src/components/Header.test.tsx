import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Header from "./Header";

const history = createMemoryHistory();

it("renders title with link to the homepage", () => {
  const { container } = render(
    <Router history={history}>
      <Header />
    </Router>
  );
  expect(container.querySelector("a.page-head__title")).toHaveAttribute("href", "/");
  expect(container.querySelector("h1")).toHaveTextContent("Cerberus");
});

it("renders a link in navigation", () => {
  const { container } = render(
    <Router history={history}>
      <Header />
    </Router>
  );
  expect(container.querySelectorAll(".nav-main a").length).toBeGreaterThan(0);
});
