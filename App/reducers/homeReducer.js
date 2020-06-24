import {PURGE} from 'redux-persist';

const initialState = {
  darkMode: false,
  messages: [],
};

const homeReducer = (state = initialState, action) => {
  let messages;
  switch (action.type) {
    case 'SET_DARK_MODE':
      return {
        ...state,
        darkMode: action.value,
      };
    case 'ADD_MESSAGE':
      messages = Object.assign([], state.messages);
      const newMessage = action.value;
      messages.push(newMessage);
      return Object.assign({}, state, {
        messages: messages,
      });
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: [],
      };
    case 'REMOVE_TASK_MESSAGES':
      return {
        ...state,
        messages: action.value,
      };
    case PURGE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default homeReducer;
