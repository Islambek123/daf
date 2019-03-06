import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashActions';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {

    state = {
      redirect: false
    };
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });
        this.setState({ redirect: true })
        //this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.setState({ redirect: true });
        //this.context.router.push('/');
      }
    }

    render() {
      return (
        this.state.redirect ?
          <Redirect to="/login" /> :
          <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }


  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}