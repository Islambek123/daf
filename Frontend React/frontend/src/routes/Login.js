import React from 'react';

export default class Login extends React.Component {
    render() {
        return (
            <button onClick={this.btnClick.bind(this)}>Log in</button>
        )
    }
    btnClick =()=>{
        console.log("log in");
        
    }
}