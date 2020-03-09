import callApi from '../../services/api';
import { addError } from './error.actions';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

export function loadMessages(messages) {
  return {
    type: LOAD_MESSAGES,
    messages,
  };
}

export function fetchMessages(token) {
  return async (dispatch) => {
    const response = await callApi('get', 'api/messages', {}, token);
    if (response.error) {
      await dispatch(addError(response.error.message));
    } else {
      const parsedResponse = response.map((message) => {
        const {_id: messageId, text, author, createdAt} = message;
        const {_id: authorId, username, profileImageUrl} = author;
        return {
          messageId,
          text,
          createdAt,
          author: {
            authorId,
            username,
            profileImageUrl
          }
        }
      })
      await dispatch(loadMessages(parsedResponse));
    }
  };
}
