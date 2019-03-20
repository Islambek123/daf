import React, { Component } from 'react';
import AccountForm from './AccountForm';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from 'axios';
import { getUser } from '../../actions/accountActions';

class AccountPage extends Component {
    state = {
        redirect: false,
        loading: true
    }
    componentDidMount() {
        //axios.get(`https://localhost:44318/api/account/getUser`);
        //if (this.props.match.params.id) {
            //this.props.getCurrentUser("xd@gmail.com");
        //}
    }

    render() {
        const { loading, getUser } = this.state;
        const page = (
            loading ? <span>Loading ...</span> :
                <div>
                    <h1>Edit Profile</h1>
                    <Link to="/email/confirm" className="btn btn-success">Confirm Email</Link>

                    <AccountForm getUser={getUser} />
                </div>
        );
        return (
            this.state.redirect ?
                <Redirect to="/login" /> :
                page
        );
    }
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        const { id } = props.match.params;
        const { user } = state;
        console.log(id);
        console.log(user);
        return {
            user: user.find(item => (item.id == id))
        }
    }
    return { user: null };
}
export default connect(mapStateToProps, { /*fetchUser*/ })(AccountPage);

