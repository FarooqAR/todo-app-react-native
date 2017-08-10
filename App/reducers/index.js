import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import usersReducer from './usersReducer';
import todosReducer from './todoReducer';

const reducer = combineReducers({
    currentUser: loginReducer,
    users: usersReducer,
    todos: todosReducer
});

export default reducer;
