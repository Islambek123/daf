import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";

import Counter from "./components/Counter";
import CounterDecrement from "./components/CounterDecrement";
import GamesPage from "./components/GamesPage";
import CounterPage from "./components/CounterPage";
import GameFormPage from "./components/GameFormPage";

import NavigationBar from "./NavigationBar";

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/login/LoginPage';
import ProductsPage from './components/product/ProductsPage';
import ProductFormPage from './components/product/ProductFormPage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />

        <Route exact path='/counter' component={Counter} />
        <Route exact path='/counterdec' component={CounterDecrement} />
        <Route exact path='/counterpage' component={CounterPage} />
        
        <Route exact path='/login' component={LoginPage} />

        <Route exact path='/games' component={GamesPage} />
        <Route exact path='/games/new' component={GameFormPage} />
        <Route path='/game/:id'  component={GameFormPage} />

        <Route exact path = '/products' component = {ProductsPage}/>
        <Route exact path = '/products/new' component = {ProductFormPage}/>
        <Route exact path = '/product/:id' component = {ProductFormPage}/>
      </div> 
    );
  }
}

export default App;
