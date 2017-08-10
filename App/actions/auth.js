import { SET_CURRENT_USER, SET_USERS, GET_CURRENT_USER } from './types';
import { AsyncStorage } from 'react-native';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
};
export function login(user) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            let { users } = getState();
            let userExists = false;
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === user.username) {
                    userExists = true;
                    if (users[i].password === user.password) {
                        try {
                            await AsyncStorage.setItem('currentUser', JSON.stringify(user));
                            dispatch(setCurrentUser(user))
                            return resolve({ success: true });
                        } catch (error) {
                            return reject(error)
                        }
                        break;
                    }
                }
            }
            reject({ message: userExists ? 'Invalid username or password' : 'User not found, please sign up' })
        })

    }
}
export function signup(user) {
    return async dispatch => {
        try {
            let users = await AsyncStorage.getItem('users');
            users = users ? JSON.parse(users) : [];
            users.push(user);

            await AsyncStorage.setItem('currentUser', JSON.stringify(user));

            dispatch(setUsers(users));
            dispatch(setCurrentUser(user))
            AsyncStorage.setItem('users', JSON.stringify(users));

        } catch (error) {
            console.error(error);
        }
    }
}
export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    }
}

export function fetchCurrentUser() {
    return async dispatch => {
        let currentUser = null;
        try {
            currentUser = await AsyncStorage.getItem('currentUser');
        } catch (error) {
            console.error(error);
        }
        if (currentUser) {
            currentUser = JSON.parse(currentUser);
            dispatch(setCurrentUser(currentUser));
        }
    }

}
export function getUsers() {
    return async dispatch => {
        let users = null;
        try {
            users = await AsyncStorage.getItem('users');
        } catch (error) {
            console.error(error);
        }
        if (users) {
            users = JSON.parse(users);
            dispatch(setUsers(users));
        }
    }
}