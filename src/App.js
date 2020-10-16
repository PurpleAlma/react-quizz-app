import React from 'react';
import {BrowserRouter as Router,Route}from 'react-router-dom'
import Home from './components/Home'
import QuizInstructions from './components/QuizInstructions'
import Quiz from './components/Quiz'
import QuizzSummary from './components/QuizSummary';



function App() {

  return (
    <Router>
      <Route path='/' exact component={Home}/>
      <Route path='/play/instructions' exact component={QuizInstructions}/>
      <Route path='/play/quiz' exact component={Quiz}/>
      <Route path='/play/quizsummary' exact component={QuizzSummary}/>
    </Router>
  );
}

export default App;
