import React from "react";
import ReactDOM from "react-dom";
import CreateAChore from "./create-a-chore";

describe("Create A Chore Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreateAChore />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
