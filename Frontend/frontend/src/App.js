import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";

import NavigationBar from "./NavigationBar";

import ProductsPage from './components/product/ProductsPage';
import ProductFormPage from './components/product/ProductFormPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/auth/login/LoginPage';

import RegisterPage from './components/auth/registration/RegisterPage';

import { loadReCaptcha } from 'react-recaptcha-google'

import requireAuth from './utils/requireAuth';

import FlashMessagesList from './components/flash/FlashMessagesList';
import BasketPage from './components/basket/BasketPage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />

        <FlashMessagesList />

        <Route exact path='/login' component={LoginPage} />
        <Route exact path = '/register' component = {RegisterPage} />

        <Route exact path = '/products' component = {requireAuth(ProductsPage)}/>
        <Route exact path = '/products/new' component = {ProductFormPage}/>
        <Route exact path = '/product/:id' component = {ProductFormPage}/>

        <Route exact path='/basket' component={BasketPage} />

      </div> 
    );
  }
  componentDidMount(){
    loadReCaptcha();
  }
}

export default App;
