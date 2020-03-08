import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Form, Header, Message } from 'semantic-ui-react';
import validateState from '../services/validation';

class AuthForm extends Component {
  initialState = {
    username: '',
    email: '',
    password: '',
    profileImageUrl: '',
    errors: {
      username: {
        error: false,
        message: '',
      },
      email: {
        error: false,
        message: '',
      },
      password: {
        error: false,
        message: '',
      },
    },
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  componentDidMount() {
    const { removeError, history } = this.props;
    this.listener = history.listen(() => {
      this.setState(this.initialState);
      removeError();
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  handleChange = (e) => {
    const property = {
      [e.target.name]: e.target.value,
    };
    this.setState(property);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { action, authUser, history } = this.props;
    const { username, email, password } = this.state;
    let fieldsToValidate = { email, password };
    if (action === 'signup') {
      fieldsToValidate = { ...fieldsToValidate, username };
    }
    const errorsState = validateState(fieldsToValidate);
    if (!errorsState.errorsPresent) {
      const successfulAuth = await authUser(action, this.state);
      this.setState({ errors: this.initialState.errors });
      if (successfulAuth) {
        history.push('/');
      }
    } else {
      this.setState({ errors: errorsState });
    }
  };

  render() {
    const { email, username, password, profileImageUrl, errors } = this.state;
    const { action, error } = this.props;
    let headerText = 'Welcome back!';
    let buttonText = 'Log In';
    let usernameInput = null;
    let profileImageUrlInput = null;
    let errorMessage = null;
    if (action === 'signup') {
      headerText = 'Join Warbler!';
      buttonText = 'Sign Up';
      usernameInput = (
        <Form.Input
          autoComplete="username"
          error={errors.username.error ? errors.username.message : false}
          label="Username"
          name="username"
          onChange={this.handleChange}
          placeholder="Enter your original username"
          type="text"
          value={username}
        />
      );
      profileImageUrlInput = (
        <Form.Input
          label="Profile Image Url"
          name="profileImageUrl"
          onChange={this.handleChange}
          placeholder="Enter the url to your profile image"
          type="url"
          value={profileImageUrl}
        />
      );
    }
    if (error.message) {
      errorMessage = (
        <Message
          error
          header={action === 'signup' ? 'Failed to sign up' : 'Failed to sign in'}
          content={error.message}
        />
      );
    }
    return (
      <Form onSubmit={this.handleSubmit} error={!!error.message}>
        <Header as="h2">{headerText}</Header>
        {usernameInput}
        <Form.Input
          autoComplete="email"
          error={errors.email.error ? errors.email.message : false}
          label="Email"
          name="email"
          onChange={this.handleChange}
          placeholder="Enter your email"
          type="text"
          value={email}
        />
        <Form.Input
          autoComplete="new-password"
          error={errors.password.error ? errors.password.message : false}
          label="Password"
          name="password"
          onChange={this.handleChange}
          placeholder="Enter your super secret password"
          type="password"
          value={password}
        />
        {profileImageUrlInput}
        {errorMessage}
        <Button primary type="submit">
          {buttonText}
        </Button>
      </Form>
    );
  }
}

AuthForm.propTypes = {
  action: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  authUser: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default AuthForm;
