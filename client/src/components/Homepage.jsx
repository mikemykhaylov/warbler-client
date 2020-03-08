import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import '../scss/Homepage.scss';

const Homepage = ({ user }) => {
  if (!user.isAuthenticated) {
    return (
      <div className="hero">
        <Header as="h1" className="hero__title">
          What is happening?
        </Header>
        <Header as="h3" className="hero__subtitle">
          New to Warbler?
        </Header>
        <Button primary size="huge" className="hero__button" as={Link} to="/signup">
          Sign Up
        </Button>
      </div>
    );
  }
  return (
    <div className="hero">
      <Header as="h1" className="hero__title">
        You made it!
      </Header>
    </div>
  );
};

Homepage.propTypes = {
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

export default Homepage;
