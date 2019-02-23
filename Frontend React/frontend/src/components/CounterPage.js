import React, { Component } from 'react';
import { Link } from "react-router-dom";

class CounterPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Link to='/counter'>Лічильник ++</Link>
                <br />
                <Link to='/counterdec'>Лічильник --</Link>
            </div>
         );
    }
}
 
export default CounterPage;