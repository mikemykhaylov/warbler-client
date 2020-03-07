import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header } from 'semantic-ui-react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      profileImageUrl: '',
    };
  }

  handleChange = (e) => {
    const property = {
      [e.target.name]: e.target.value,
    };
    this.setState(property);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { action, onAuth } = this.props;
    await onAuth(action, this.state);
  };

  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const { action } = this.props;
    let headerText;
    let buttonText;
    let usernameInput;
    let profileImageUrlInput;
    if (action === 'signup') {
      headerText = 'Join Warbler!';
      buttonText = 'Sign Up';
      usernameInput = (
        <Form.Input
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your original username"
          value={username}
          autoComplete="username"
          onChange={this.handleChange}
        />
      );
      profileImageUrlInput = (
        <Form.Input
          label="Profile Image Url"
          name="profileImageUrl"
          type="url"
          placeholder="Enter the url to your profile image"
          value={profileImageUrl}
          onChange={this.handleChange}
        />
      );
    } else {
      headerText = 'Welcome back!';
      buttonText = 'Log In';
      usernameInput = null;
      profileImageUrlInput = null;
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Header as="h2">{headerText}</Header>
        {usernameInput}
        <Form.Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="email"
          onChange={this.handleChange}
        />
        <Form.Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your super secret password"
          value={password}
          autoComplete="new-password"
          onChange={this.handleChange}
        />
        {profileImageUrlInput}
        <Button primary type="submit">
          {buttonText}
        </Button>
      </Form>
    );
  }
}

AuthForm.propTypes = {
  action: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
};

export default AuthForm;
