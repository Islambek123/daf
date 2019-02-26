import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { login } from "../../actions/login";

class LoginForm extends Component {
    state = {
        identifier: '',
        password: '',
        errors: {
            //password: "Вкажи пароль"
        },
        done: false,
        isLoading: false
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

    onSubmitForm = (e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.identifier === '') errors.identifier = "Cant't be empty!"
        if (this.state.password === '') errors.password = "Cant't be empty!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { identifier, password } = this.state;
            this.setState({ isLoading: true });
            this.props.login({ identifier, password }).then(
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

    render() {
        const { errors, isLoading } = this.state;
        console.log('---FormLogin state----', this.state);
        const form = (
            <form onSubmit={this.onSubmitForm}>
                <h1>Login</h1>
                {
                    !!errors.invalid ?

                        <div className="alert alert-danger">
                            <strong>Danger!</strong> {errors.invalid}.
                    </div> : ''}
                <div className={classnames('form-group', { 'has-error': !!errors.identifier })}>
                    <label htmlFor="identifier">Email / Username</label>
                    <input type="text"
                        className="form-control"
                        id="identifier"
                        name="identifier"
                        value={this.state.identifier}
                        onChange={this.handleChange} />
                    {!!errors.identifier ? <span className="help-block">{errors.identifier}</span> : ''}
                </div>

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
LoginForm.propTypes =
    {
        login: PropTypes.func.isRequired
    }

export default connect(null, { login })(LoginForm);