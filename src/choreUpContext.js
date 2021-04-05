import React from 'react';

const ChoreUpContext = React.createContext({
  isSignedIn: false,
  isAdmin: false,
  userId:null,
})

export default ChoreUpContext