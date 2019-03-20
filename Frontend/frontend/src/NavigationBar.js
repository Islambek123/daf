import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from './actions/authActions';

class NavigationBar extends Component {
    state = {}

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        console.log("login user: ", this.props);

        const { isAuthenticated, user } = this.props.auth;

        console.log(isAuthenticated);
        
        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to={"/edit/" +  user.name }>{user.name}</Link></li>
                <li><a onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        );
        //const userLinks = ''; 
        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Project SHAG</Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/products">Products</Link></li>
                        </ul>
                        {isAuthenticated ? userLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(NavigationBar);