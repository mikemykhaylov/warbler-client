import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Feed, Button, Message } from 'semantic-ui-react';
import { fetchMessages, deleteMessage } from '../store/actions/messages.actions';
import defaultProfileImage from '../images/defaultProfileImage.png';

const MessageList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user.user);
  const dbErrors = useSelector((state) => state.dbErrors);
  const { token, id: userId } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(token));
  }, [token]);

  let errorMessage;
  if (dbErrors.message) {
    errorMessage = (
      <Message error>
        <Message.Header>Failed to get or delete a message</Message.Header>
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

  async function handleDelete(messageId) {
    setIsLoading(true);
    await dispatch(deleteMessage(userId, messageId, token));
    setIsLoading(false);
  }

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
              negative
              size="tiny"
              onClick={() => handleDelete(message.messageId)}
              loading={isLoading}
            >
              Delete
            </Button>
          ) : null}
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  ));
  return (
    <Feed>
      {errorMessage}
      {messageList}
    </Feed>
  );
};

export default MessageList;
