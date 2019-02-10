import React from "react";
import ReactDOM from "react-dom";
import Routes from './routes';
import { BrowserRouter, NavLink } from 'react-router-dom';

const App = () => (
        <div>
                <h1>NavBar elo</h1>
                <ul>
                        <li><NavLink to="/register" exact>Register</NavLink></li>
                        <li><NavLink to="/login" exact>Login</NavLink></li>
                        <li><NavLink to="/" exact>Home</NavLink></li>
                </ul>
                <Routes />
        </div>
);
ReactDOM.render(
        <BrowserRouter>
                <App />
        </BrowserRouter>,
        document.getElementById('root'));

