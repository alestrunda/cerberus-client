import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { act } from "react-dom/test-utils";
import App from "./App";

const client = new ApolloClient({
  cache: new InMemoryCache()
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      div
    );
  });
  ReactDOM.unmountComponentAtNode(div);
});
