import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ReCaptcha } from 'react-recaptcha-google';
import { Redirect } from 'react-router';

class RegisterForm extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        captcha: '',

        errors: {},

        done: false,
        isLoading: false
    }
    constructor(props, context) {
        super(props, context);

        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
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
        const { email, username, password, captcha } = this.state;

        let errors = {};
        if (this.state.email === '') errors.email = "Cant't be empty!"
        if (this.state.username === '') errors.username = "Cant't be empty!"
        if (this.state.password === '') errors.password = "Cant't be empty!"
        if (this.state.password.length < 6) errors.password = "Minimum length is 7!"
        if (this.state.captcha === '') errors.captcha = "Confirm Captcha!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.props.register(
                {
                    Captcha: captcha,
                    Email: email,
                    UserName: username,
                    Password: password,
                    
                }).then(
                    () => {
                        this.props.addFlashMessage({
                            type: 'success',
                            text: 'Реєстрація пройшла успішно'
                        });
                        this.setState({ done: true })
                    },
                    (err) => this.setState({ errors: err.response.data })
                );
        }
        else {
            this.setState({ errors });
        }

    }
    componentDidMount() {
        if (this.captchaDemo) {
            console.log("captcha started, just a second...")
            this.captchaDemo.reset();
        }
    }
    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }
    verifyCallback  (recaptchaToken) {
        //this.setState({ captcha: recaptchaToken });
        this.state.captcha = recaptchaToken
        console.log(recaptchaToken, "<= your recaptcha token")
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
                    <div className={classnames('form-group', { 'has-error': !!errors.captcha })}>
                        <ReCaptcha
                            id="captcha"
                            name="captcha"
                            ref={(el) => { this.captchaDemo = el; }}
                            size="normal"
                            data-theme="dark"
                            render="explicit"
                            sitekey="6LfXVZQUAAAAAPeiWCpyFh6CmV7hhLN_KYRZIIaD"
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                        />
                        {!!errors.captcha ? <span className="help-block">{errors.captcha}</span> : ''}
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
            this.state.done ?
                    <Redirect to="/login" /> :
                    form
        );
    }
}

RegisterForm.propTypes =
    {
        register: PropTypes.func.isRequired
    }

    export default RegisterForm;