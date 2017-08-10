import {SET_USERS} from '../actions/types';

export default function(state = [], action){
    switch(action.type){
        case SET_USERS:
            return action.users;
        default:
            return state;
    }
}