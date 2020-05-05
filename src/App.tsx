import React from 'react';
import HooksApp from './examples/Hooks'
import HooksContext from './examples/HooksContext'
import PortalsApp from './examples/Portals'
import TodoApp from './components/todos/Search'
import './App.css';

function App() {
  return (
    <div className="App">
      <HooksApp message="Test"/>
      <HooksContext />
      <PortalsApp />
      <div id="modal-root">protal</div>
      <TodoApp />
    </div>
  );
}

export default App;
