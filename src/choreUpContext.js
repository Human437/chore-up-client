import React from 'react';

const ChoreUpContext = React.createContext({
  isSignedIn: false,
  isAdmin: false,
  userId:null,
  familyId:null,
  isAlreadyAdminOfAFamily:false
})

export default ChoreUpContext