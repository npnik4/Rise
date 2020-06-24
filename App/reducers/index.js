import {combineReducers} from 'redux';
import profile from './ProfileReducer';
import Tasks from './TaskScreenReducer';
import loginReducer from './LoginReducer';
import homeReducer from './homeReducer';

export default combineReducers({
  profile,
  Tasks,
  loginReducer,
  homeReducer,
});
