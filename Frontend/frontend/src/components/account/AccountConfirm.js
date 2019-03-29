import React from 'react';
import {validateToken} from '../../actions/accountActions';

class AccountConfirm extends React.Component {
    state = {
        token: '',
        errors: {}
    }
    render() {
        const form = (
            <form>
                <div className="form-group">
                    <label htmlFor="available">Enter Token</label>
                    <input
                        className="form-control"
                        type="text"
                        id="etoken"
                        name="etoken"
                        onChange={this.handleChange}
                        placeholder="Enter text from email letter" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-warning">Submit<span className="glyphicon glyphicon-send"></span></button>
                </div>
            </form>);
        return (
            form
        );
    }
    handleChange(e) {
        this.setState({
            token: e.value
        });
    }
    onSubmitForm = (e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.token === '') errors.name = "Cant't be empty!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { token } = this.state;
            this.props.validateToken({ token })
                .catch((err) => {
                    this.setState({ errors: err.response.data });
                });
        }
        else {
            this.setState({ errors });
        }
    }

}
export default AccountConfirm;