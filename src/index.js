import React from "react";
import ReactDom from "react-dom/client";

import store from "./store/store";
import { Provider } from "react-redux";
import App from "./App";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
