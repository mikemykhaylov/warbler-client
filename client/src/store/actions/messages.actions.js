import callApi from '../../services/api';
import { addError, removeError } from './error.actions';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

export function loadMessages(messages) {
  return {
    type: LOAD_MESSAGES,
    messages,
  };
}

export function removeMessage(messageId) {
  return {
    type: REMOVE_MESSAGE,
    messageId,
  };
}

export function fetchMessages(token) {
  return async (dispatch) => {
    const response = await callApi('get', 'api/messages', {}, token);
    if (response.error) {
      await dispatch(addError(response.error.message));
    } else {
      const parsedResponse = response.map((message) => {
        const { _id: messageId, text, author, createdAt } = message;
        const { _id: authorId, username, profileImageUrl } = author;
        return {
          messageId,
          text,
          createdAt,
          author: {
            authorId,
            username,
            profileImageUrl,
          },
        };
      });
      await dispatch(loadMessages(parsedResponse));
      await dispatch(removeError());
    }
  };
}

export function postMessage(text, authorId, token) {
  return async (dispatch) => {
    const response = await callApi('post', `api/users/${authorId}/messages`, { text }, token);
    if (response.error) {
      await dispatch(addError(response.error.message));
      return false;
    }
    await dispatch(removeError());
    return true;
  };
}

export function deleteMessage(authorId, messageId, token) {
  return async (dispatch) => {
    const response = await callApi(
      'delete',
      `api/users/${authorId}/messages/${messageId}`,
      null,
      token,
    );
    console.log(response)
    if (response.error) {
      await dispatch(addError(response.error.message));
      return false;
    }
    await dispatch(removeMessage(messageId));
    await dispatch(removeError());
    return true;
  };
}
