import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavigationBar extends Component {
    state = {  }
    render() { 
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
                        <Link className="navbar-brand" to="/games">Project crocodile</Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/counterpage">Counter</Link></li>
                            <li><Link to="/games">Games</Link></li>
                            <li><Link to ="/products">Products</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="../navbar-static-top/">Sign up</a></li>
                            <li><Link to="/login">Sign in</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
         );
    }
}
 
export default NavigationBar;