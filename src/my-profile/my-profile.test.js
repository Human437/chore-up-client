import React from "react";
import ReactDOM from "react-dom";
import MyProfile from "./my-profile";

describe("MyProfile Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const match = { params: { id: 1 } };
    ReactDOM.render(<MyProfile match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
