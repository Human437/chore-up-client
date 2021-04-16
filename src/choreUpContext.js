import React from "react";

const ChoreUpContext = React.createContext({
  isSignedIn: false,
  isAdmin: false,
  userId: null,
  familyId: null,
  isAlreadyAdminOfAFamily: false,
  familyCode: "",
  updateIsSignedIn: () => {},
  updateIsAdmin: () => {},
  updateUserId: () => {},
  updateFamilyId: () => {},
  updateIsAlreadyAdminOfAFamily: () => {},
  updateFamilyCode: () => {},
});

export default ChoreUpContext;
