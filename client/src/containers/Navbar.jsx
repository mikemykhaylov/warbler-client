import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Container, Header } from 'semantic-ui-react';
import { logoutUser } from '../store/actions/auth.actions';

const Navbar = ({ user, logoutUserMapped }) => {
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item>
          <Header>
            <span role="img" aria-label="logo">
              🦉
            </span>
          </Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          <Header>Warbler</Header>
        </Menu.Item>
        {!user.isAuthenticated ? (
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/signin" content="Login" key="login"></Menu.Item>
            <Menu.Item as={Link} to="/signup" content="Register" key="register"></Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/message/new" content="New Post" key="newPost"></Menu.Item>
            <Menu.Item content="Log Out" key="logout" onClick={logoutUserMapped}></Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profileImageUrl: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  logoutUserMapped: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutUserMapped: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
