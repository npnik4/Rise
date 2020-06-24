import { PURGE } from 'redux-persist';

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  newUser: false
}


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    case 'LOADING':
      console.log('loading', action.value);
      return {
        ...state,
        isLoading: action.value
      }
    case 'NEW_USER':
      return {
        ...state,
        newUser: action.value
      }
    // case PURGE:
    //   console.log('Purge login');
    //   return {
    //     ...initialState
    //   };
    default:
      return state
  }
}

export default loginReducer