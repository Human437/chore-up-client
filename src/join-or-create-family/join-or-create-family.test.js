import React from "react";
import ReactDOM from "react-dom";
import JoinOrCreateFamily from "./join-or-create-family";

describe("JoinOrCreateFamily Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<JoinOrCreateFamily />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
