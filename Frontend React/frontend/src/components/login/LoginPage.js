import React, { Component } from 'react';
import LoginForm from './LoginForm';

class LoginPage extends Component {
    state = {  }
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-offset-4">
                    <LoginForm />
                </div>
            </div>
        );
    }
}
 
export default LoginPage;