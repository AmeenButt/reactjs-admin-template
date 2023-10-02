import basePath from "basePath";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log('in Componenet did catch')
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to={`${basePath}/auth/error`} replace />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
