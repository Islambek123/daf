import React, { Component } from 'react';
import { connect } from "react-redux";
import { INC_COUNTER } from '../actions';
//imrc
//cc
class Counter extends Component {
    state = {  }
    onClickIncrement = (e) => {
        e.preventDefault();
        console.log('----increment---');
        this.props.dispatch({type: INC_COUNTER});
    }
    render() {
        console.log('----props Counter---', this.props);
        const {count} = this.props;
        return ( 
        <div>
            <h1>Page counter {count}</h1>
            <button onClick={this.onClickIncrement}>Збільшити значення на 1</button>
        </div> 
        );
    }
}

const mapStateProps = (state) => 
{
    console.log('----redux store connect----', state);
    return {
        count: state.counter.counterStore
    };
}
 
export default connect(mapStateProps)(Counter);