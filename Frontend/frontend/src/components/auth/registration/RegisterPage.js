import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { register } from "../../../actions/authActions";
import { addFlashMessage } from "../../../actions/flashActions";

class RegisterPage extends Component {
    state = {}
    render() {
        const { register, addFlashMessage } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-offset-4">
                    <RegisterForm register={register} addFlashMessage={addFlashMessage} />
                </div>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    register: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}
export default connect(null, { register, addFlashMessage })(RegisterPage);