import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { addFlashMessage } from "../../../actions/flashActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { login } from "../../../actions/authActions";

class LoginPage extends Component {
    state = {  }
    render() {
        const { login, addFlashMessage } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-offset-4">
                    <LoginForm login = {login} addFlashMessage={addFlashMessage} />
                </div>
            </div>
        );
    }
}
 
LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}
export default connect(null, { login, addFlashMessage })(LoginPage);