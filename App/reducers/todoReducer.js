import {SET_TODOS} from '../actions/types';
export default function(state = [], action){
    switch(action.type){
        case SET_TODOS:
            return action.todos;
        default:
            return state;
    }
}