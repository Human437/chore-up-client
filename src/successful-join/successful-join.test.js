import React from "react";
import ReactDOM from "react-dom";
import SuccessfulJoin from "./successful-join";

describe("SuccessfulJoin Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SuccessfulJoin />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
