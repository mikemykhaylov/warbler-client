import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import useAuth from '../hooks/useAuth';
import { postMessage } from '../store/actions/messages.actions';

const MessageForm = () => {
  // State
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Auth Hook
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useAuth(history, user.isAuthenticated);
  // Handling DB errors
  const dbErrors = useSelector((state) => state.dbErrors);
  let errorMessage;
  if (dbErrors.message) {
    errorMessage = (
      <Message error>
        <Message.Header>Failed to post a message</Message.Header>
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

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const successfulPost = await dispatch(postMessage(messageText, user.user.id, user.user.token));
    setIsLoading(false);
    if (successfulPost) {
      history.push('/');
    }
  }

  return (
    <Form onSubmit={handleSubmit} error={!!dbErrors.message} loading={isLoading}>
      <Form.TextArea
        label="Message Text"
        placeholder="What are you writing today?"
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
      />
      {errorMessage}
      <Form.Button primary>Submit</Form.Button>
    </Form>
  );
};

export default MessageForm;
