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
    validationErrors: {
      errorsPresent: false,
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
      this.setState({ validationErrors: this.initialState.validationErrors });
      if (successfulAuth) {
        history.push('/');
      }
    } else {
      this.setState({ validationErrors: errorsState });
    }
  };

  render() {
    const { email, username, password, profileImageUrl, validationErrors } = this.state;
    const { action, dbErrors } = this.props;
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
          error={validationErrors.username.error ? validationErrors.username.message : false}
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
    if (dbErrors.message) {
      errorMessage = (
        <Message error>
          <Message.Header>
            {action === 'signup' ? 'Failed to sign up' : 'Failed to sign in'}
          </Message.Header>
          {dbErrors.message.split('\n').length > 1 ? (
            <Message.List>
              {dbErrors.message.split('\n').map((error) => (
                <Message.Item key={error}>{error}</Message.Item>
              ))}
            </Message.List>
          ) : (
            <p>{dbErrors.message}</p>
          )}
        </Message>
      );
    }
    return (
      <Form onSubmit={this.handleSubmit} error={!!dbErrors.message}>
        <Header as="h2">{headerText}</Header>
        {usernameInput}
        <Form.Input
          autoComplete="email"
          error={validationErrors.email.error ? validationErrors.email.message : false}
          label="Email"
          name="email"
          onChange={this.handleChange}
          placeholder="Enter your email"
          type="text"
          value={email}
        />
        <Form.Input
          autoComplete="new-password"
          error={validationErrors.password.error ? validationErrors.password.message : false}
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
  dbErrors: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  authUser: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default AuthForm;
