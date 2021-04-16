import React from "react";
import ReactDOM from "react-dom";
import MyChores from "./my-chores";

describe("MyChores Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const match = { params: { id: 1 } };
    ReactDOM.render(<MyChores match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
