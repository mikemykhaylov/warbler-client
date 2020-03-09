import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from 'semantic-ui-react';
import MessageList from '../containers/MessageList';
import defaultProfileImage from '../images/defaultProfileImage.png';

const MessageTimeline = ({ username, profileImageUrl }) => {
  return (
    <Grid>
      <Grid.Column width={5}>
        <Card image={profileImageUrl || defaultProfileImage} header={`@${username}`} />
      </Grid.Column>
      <Grid.Column width={11}>
        <MessageList />
      </Grid.Column>
    </Grid>
  );
};

MessageTimeline.propTypes = {
  username: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
};

export default MessageTimeline;
