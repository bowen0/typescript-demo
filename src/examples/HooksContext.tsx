import React from 'react';
const currentUserContext = React.createContext<string>(undefined!);

function EnthusasticGreeting() {
  const currentUser = React.useContext(currentUserContext);
  return <div>Hello {currentUser.toUpperCase()}</div>;
}

export default function App() {
  return (
    <currentUserContext.Provider value="Tom">
      <EnthusasticGreeting />
    </currentUserContext.Provider>
  )
}