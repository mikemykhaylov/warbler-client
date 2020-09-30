import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { authUser } from '../store/actions/auth.actions';
import { removeError } from '../store/actions/error.actions';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import MessageForm from '../components/MessageForm';
import '../scss/Main.scss';

const Main = ({
  user,
  authUser: authUserMapped,
  removeError: removeErrorMapped,
  dbErrors,
  history,
}) => {
  return (
    <Container className="main__container">
      <Switch>
        <Route path="/" exact>
          <Homepage user={user} />
        </Route>
        <Route path="/signin">
          <AuthForm
            authUser={authUserMapped}
            action="signin"
            dbErrors={dbErrors}
            removeError={removeErrorMapped}
            history={history}
          />
        </Route>
        <Route path="/signup">
          <AuthForm
            authUser={authUserMapped}
            action="signup"
            dbErrors={dbErrors}
            removeError={removeErrorMapped}
            history={history}
          />
        </Route>
        <Route path="/message/new">
          <MessageForm />
        </Route>
      </Switch>
    </Container>
  );
};

Main.propTypes = {
  authUser: PropTypes.func.isRequired,
  dbErrors: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  removeError: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profileImageUrl: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  dbErrors: state.dbErrors,
});

const mapDispatchToProps = {
  authUser,
  removeError,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
