import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { authUser } from '../store/actions/authActions';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import '../scss/Main.scss';

const Main = ({ user, authUser: authUserMapped, error }) => {
  return (
    <Container className="main__container">
      <Switch>
        <Route path="/" exact>
          <Homepage user={user} />
        </Route>
        <Route path="/signin">
          <AuthForm onAuth={authUserMapped} action="signin" error={error} />
        </Route>
        <Route path="/signup">
          <AuthForm onAuth={authUserMapped} action="signup" error={error} />
        </Route>
      </Switch>
    </Container>
  );
};

Main.propTypes = {
  authUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profileImageUrl: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error
});

const mapDispatchToProps = {
  authUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
