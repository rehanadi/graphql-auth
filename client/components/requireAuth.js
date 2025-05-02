import React, { Component } from 'react';
import currentUserQuery from "../queries/CurrentUser";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

// Higher Order Component to require authentication
export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      const { data: { loading, user } } = nextProps;

      if (!loading && !user) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};