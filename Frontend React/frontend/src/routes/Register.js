import React from 'react';
import { Input, Button, Form } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
}

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    registerDidMount() {
        axios.post(`http://localhost:64239/api/Account/Register`, {
            Email: this.state.email,
            Password: this.state.password
        })
            .then(res => {
                console.log(res);
            })
            .catch(res => {
                console.log(res);
            });
        this.setState(initialState);
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.value);
    }
    validate = () => {
        let emailError = "";
        let passwordError = "";

        if (!this.state.password) {
            passwordError = "Empty password field";
        }
        if (this.state.password.length < 7) {
            passwordError = "Password must be at least 7 symbols";
        }
        if (!this.state.email) {
            passwordError = "Empty email field";
        }
        if (!this.state.email.includes('@') || !this.state.email.includes('.')) {
            emailError = "Invalid field";
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }
        return true;
    }
    handleSubmit = event => {
        event.preventDefault();
        const valid = this.validate();

        if (valid) {
            console.log("valid");
            this.registerDidMount();

        }
        else
            console.log("invalid");
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <FormItem>
                <Input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
            </FormItem>
            <FormItem>
                <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
            </FormItem>
            <FormItem>
                <Button htmlType="submit">Submit</Button>
            </FormItem>
        </Form>;
    }
}