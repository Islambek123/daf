import React from 'react';
import { Link } from "react-router-dom";

class AccountForm extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',

        done: false,
        isLoading: false
    }
    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps.user.email);
        this.setState({
            username: nextProps.user.userName,
            email: nextProps.user.email
        });
    }

    render() {
        const { user } = this.props;
        console.log(user.email);
        return (
            <form>
                <label htmlFor="text">User Name</label>
                <input type="text"
                    className="form-control"
                    id="text"
                    name="text"
                    value={user.userName} />
                <div className="form-group">
                    <div>
                        <button type="submit" className="btn btn-danger" >Continue<span className="glyphicon glyphicon-send"></span></button>
                    </div>
                </div>
            </form>


        )

    }


}
export default AccountForm