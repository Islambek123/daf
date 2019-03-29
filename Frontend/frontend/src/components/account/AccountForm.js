import React from 'react';

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
                <input type="text"
                            className="form-control"
                            id="text"
                            name="text"
                            value={user.userName}/>
            </form>
        )

    }


}
export default AccountForm