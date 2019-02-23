import React, { Component } from 'react';
import { connect } from "react-redux";
import { DEC_COUNTER } from '../actions';
//imrc
//cc
class CounterDecrement extends Component {
    state = {  }
    onClickDecrement = (e) => {
        e.preventDefault();
        console.log('----increment---');
        this.props.dispatch({type: DEC_COUNTER});
    }
    render() {
        console.log('----props Counter---', this.props);
        const {count} = this.props;
        return ( 
        <div>
            <h1>Page counter decrement {count}</h1>
            <button onClick={this.onClickDecrement}>Зменшити значення на 1</button>
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
 
export default connect(mapStateProps)(CounterDecrement);