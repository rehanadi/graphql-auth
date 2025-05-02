import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  submitHandler(event) {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.onSubmit({ email, password });

    this.setState({ email: '', password: '' });
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.submitHandler.bind(this)} className="col s6">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={event => this.setState({ password: event.target.value })}
            />
          </div>
          {this.props.errors.length > 0 && (
            <div className="errors">
              {this.props.errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          <button className="btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AuthForm;