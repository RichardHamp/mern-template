//requirements
import React from 'react';
  //bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
  //react router
import { BrowserRouter as Router, Route } from 'react-router-dom';
  //import components
import Navbar from './components/navbar.component';
import ExercisesList from './components/exercises-list.component';
import EditExercise from './components/edit-exercises.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';
// import './App.css';

//renders components in index.html
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br />
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;