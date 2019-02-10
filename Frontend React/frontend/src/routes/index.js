import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

import Auth from './Auth.js';
import Register from './Register.js';
import Login from './Login.js';

export default () => (
        <Switch>
            <Route exact path="/login" render={props => <Login {...props} />} /> 
            <Route exact path="/register" render={props => <Register {...props} />} />
            <Route exact path="/auth" render={props => <Auth {...props} />} />
            <Route exact path ="/" render = {()=> { return(<h1>Home</h1>)}}/>
        </Switch>
);
// strict