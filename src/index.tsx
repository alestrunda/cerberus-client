import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";
import { serverUrl } from "./config";
import * as serviceWorker from "./serviceWorker";
import "./scss/main.scss";

// import i18n (needs to be bundled)
import "./i18n/config";

const client = new ApolloClient({
  uri: `${serverUrl}/graphql`,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
