import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Feed } from 'semantic-ui-react';
import { fetchMessages } from '../store/actions/messages.actions';
import defaultProfileImage from '../images/defaultProfileImage.png';

class MessageList extends Component {
  componentDidMount() {
    const { fetchMessagesMapped, token } = this.props;
    fetchMessagesMapped(token);
  }

  render() {
    const { messages } = this.props;
    const messageList = messages.map((message) => (
      <Feed.Event key={message.messageId}>
        <Feed.Label image={message.author.profileImageUrl || defaultProfileImage} />
        <Feed.Content>
          <Feed.Summary>
            {`@${message.author.username} posted:`}
            <Feed.Date>
              <Moment fromNow>{message.createdAt}</Moment>
            </Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{message.text}</Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    ));
    return <Feed>{messageList}</Feed>;
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      messageId: PropTypes.string,
      text: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        authorId: PropTypes.string,
        username: PropTypes.string,
        profileImageUrl: PropTypes.string,
      }),
    }),
  ).isRequired,
  token: PropTypes.string.isRequired,
  fetchMessagesMapped: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  messages: state.messages,
  token: state.user.user.token,
});

const mapDispatchToProps = {
  fetchMessagesMapped: fetchMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
