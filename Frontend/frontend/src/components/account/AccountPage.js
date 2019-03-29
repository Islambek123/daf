import React, { Component } from 'react';
import AccountForm from './AccountForm';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { fetchUser } from '../../actions/accountActions';
import { connect } from 'react-redux';

class AccountPage extends Component {
    state = {
        loading: true,
        redirect: false,
        errors: {}
    }
    componentDidMount() {
        this.props.fetchUser()
            .then(
                () => { this.setState({ loading: false }) },
                (err) => {
                    if (typeof (err.response) == 'undefined')
                        console.log("err.response", err);
                    else if (err.response.status == 401) {
                        this.setState({ redirect: true });
                    }
                }
            );
            console.log("USER", this.props.user);
    }
    render() {
        console.log("User props: ", this.props);
        const { loading, errors} = this.state;
        const page = (
            loading ? <strong>LOADING !!!!</strong> :
                <div>
                    <h1>Edit Profile {this.props.user.userName}</h1>
                    <div className="col-md-6 col-offset-6">
                        <AccountForm user={this.props.user} />
                    </div>
                    <div className="col-md-6 col-offset-6">
                        <Link to="/email/confirm" className="btn btn-success">Confirm Email</Link>
                    </div>
                </div>
        );
        return (
            this.state.redirect ?
                <Redirect to="/login" /> :
                page
        );
    }

}
// AccountForm.propTypes = {
//     user: PropTypes.element.isRequired,
//     fetchUser: PropTypes.func.isRequired
// }
const mapStateToProps = (state) => {

    return {
        user: state.account.user
    };
}
export default connect(mapStateToProps, { fetchUser })(AccountPage);


    // componentDidMount() {
    //     //this.props.getUser().then(console.log("1"));
    //     //axios.get(`https://localhost:44318/api/account/getUser`);
    //     //if (this.props.match.params.id) {
    //     //this.props.getCurrentUser("xd@gmail.com");
    //     //}
    // }

