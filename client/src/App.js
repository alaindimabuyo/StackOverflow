import React from 'react';

import './App.css';

import StackOverflowState from "./context/StackOverflowState"
import StackOverflowQuestions from "./components/questions"
function App() {
  return (
    <StackOverflowState>
      <div className="App">

       
        <StackOverflowQuestions />
      </div>
    </StackOverflowState>
  );
}

export default App;
