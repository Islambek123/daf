import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/singupActions';
import PropTypes from 'prop-types';

class SignupPage extends React.Component {


    render() {
        const { _userSignupRequest } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm userSignupRequest={_userSignupRequest} />
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}
export default connect(null, { userSignupRequest })(SignupPage);