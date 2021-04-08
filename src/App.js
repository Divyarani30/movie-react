import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies';
import Customer from './components/customers';
import Rentals from './components/rental';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForms';
import LoginForm from './components/loginForm';
import './App.css';
import RegisterForm from './components/registerForm';


function App() {
  return (
   <React.Fragment>
    <NavBar />
    <main className="container">
      <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/movies/:id" component={MovieForm}/>
          <Route path="/login" component={LoginForm}/>
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customer} />
          <Route path="/rental" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
      </Switch>    
    </main>
  </React.Fragment>
     
  );
}

export default App;
