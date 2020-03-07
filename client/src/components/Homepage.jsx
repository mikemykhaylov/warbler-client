import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import '../scss/Homepage.scss';

const Homepage = () => {
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
};

export default Homepage;
