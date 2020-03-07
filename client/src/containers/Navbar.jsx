import React from 'react';
import { Menu, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Navbar({ user }) {
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
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/signin" content="Login" key="login"></Menu.Item>
          <Menu.Item as={Link} to="/signup" content="Register" key="register"></Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Navbar);
