import React from "react";
import ReactDOM from "react-dom";
import CreateFamily from "./create-family";

describe("Create Family Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreateFamily />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
