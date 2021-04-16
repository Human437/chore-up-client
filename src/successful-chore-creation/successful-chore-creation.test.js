import React from "react";
import ReactDOM from "react-dom";
import SuccessfulChoreCreation from "./successful-chore-creation";

describe("SuccessfulChoreCreation Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SuccessfulChoreCreation />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
