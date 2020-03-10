import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Feed, Button } from 'semantic-ui-react';
import { fetchMessages, deleteMessage } from '../store/actions/messages.actions';
import defaultProfileImage from '../images/defaultProfileImage.png';

const MessageList = () => {
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user.user);
  const { token, id: userId } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(token));
  }, [token]);
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
        <Feed.Meta>
          {message.author.authorId === userId ? (
            <Button
              color="red"
              size="tiny"
              onClick={() => dispatch(deleteMessage(userId, message.messageId, token))}
            >
              Delete
            </Button>
          ) : null}
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  ));
  return <Feed>{messageList}</Feed>;
};

export default MessageList;
