import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";

import Counter from "./components/Counter";
import CounterDecrement from "./components/CounterDecrement";
import CounterPage from "./components/CounterPage";

import NavigationBar from "./NavigationBar";

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/login/LoginPage';
import ProductsPage from './components/product/ProductsPage';
import ProductFormPage from './components/product/ProductFormPage';
import RegisterPage from './components/registration/RegisterPage';

import { loadReCaptcha } from 'react-recaptcha-google'

import requireAuth from './utils/requireAuth';

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />

        <Route exact path='/counter' component={Counter} />
        <Route exact path='/counterdec' component={CounterDecrement} />
        <Route exact path='/counterpage' component={CounterPage} />
        
        <Route exact path='/login' component={LoginPage} />

        <Route exact path = '/products' component = {requireAuth(ProductsPage)}/>
        <Route exact path = '/products/new' component = {ProductFormPage}/>
        <Route exact path = '/product/:id' component = {ProductFormPage}/>

        <Route exact path = '/register' component = {RegisterPage} />
        
      </div> 
    );
  }
  componentDidMount(){
    loadReCaptcha();
  }
}

export default App;
