import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navbar";
import { BrowserRouter } from "react-router-dom";

describe("NavBar Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
