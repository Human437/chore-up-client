import React from "react";
import ReactDOM from "react-dom";
import JoinFamily from "./join-family";

describe("JoinFamily Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<JoinFamily />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
