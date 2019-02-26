import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { register } from "../../actions/register";

class RegisterForm extends Component {
    state = {
        email: '',
        username: '',
        password: '',

        errors: {},
        done: false,
        isLoading: false
    }
    onSubmitForm = (e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.email === '') errors.email = "Cant't be empty!"
        if (this.state.username === '') errors.username = "Cant't be empty!"
        if (this.state.password === '') errors.password = "Cant't be empty!"
        if (this.state.password.length < 6) errors.password = "Minimum length is 7"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { email, username, password } = this.state;
            this.setState({ isLoading: true });
            this.props.register({ email, username, password }).then(
                () => this.setState({ done: true }),
                (err) => this.setState({ errors: err.response.data, isLoading: false })
            );
            //this.props.saveGame({id, title, image, description})
            //    .catch((err) => { 
            //        this.setState({ errors: err.response.data });
            //     });
        }
        else {
            this.setState({ errors });
        }
    }
    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    }
    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }
    render() {
        const { errors, isLoading } = this.state;
        
            const form = (
            <form onSubmit={this.onSubmitForm}>
            <h1>Registration</h1>
                <div className="form-group">
                    <div className={classnames('form-group', { 'has-error': !!errors.email })}>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange} />
                        {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                    </div>
                </div>
                <div className="form-group">
                    <div className={classnames('form-group', { 'has-error': !!errors.username })}>
                        <label htmlFor="username">User Name</label>
                        <input type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange} />
                        {!!errors.username ? <span className="help-block">{errors.username}</span> : ''}
                    </div>
                </div>
                <div className="form-group">
                    <div className={classnames('form-group', { 'has-error': !!errors.password })}>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange} />
                        {!!errors.password ? <span className="help-block">{errors.password}</span> : ''}
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-warning" disabled={isLoading}>Вхід<span className="glyphicon glyphicon-send"></span></button>
                    </div>
                </div>
            </form>
            );
            return (
                form
            );
    }
}

RegisterForm.propTypes =
    {
        register: PropTypes.func.isRequired
    }

export default connect(null, { register })(RegisterForm);