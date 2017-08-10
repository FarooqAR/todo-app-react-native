import { AsyncStorage } from 'react-native';
import { SET_TODOS } from './types';

export function addTodo(todo, user) {
    return async dispatch => {
        try {
            let allTodos = await AsyncStorage.getItem('todos');
            allTodos = JSON.parse(allTodos) || {};
            let todos = allTodos && allTodos[user] ? allTodos[user] : [];
            todos.push(todo);
            allTodos[user] = todos;
            await AsyncStorage.setItem('todos', JSON.stringify(allTodos));
            dispatch(getTodos(user))
        } catch (error) {
            console.error(error);
        }
    }
}
export function deleteTodo(index, user) {
    return async dispatch => {
        try {
            let allTodos = await AsyncStorage.getItem('todos');
            allTodos = JSON.parse(allTodos);
            let todos = allTodos[user];
            todos.splice(index, 1);
            allTodos[user] = todos;
            await AsyncStorage.setItem('todos', JSON.stringify(allTodos));
            dispatch(getTodos(user));
        } catch (error) {

        }
    }
}
export function editTodo(todo, i, user) {
    return async dispatch => {
        try {
            let allTodos = await AsyncStorage.getItem('todos');
            allTodos = JSON.parse(allTodos);
            let todos = allTodos[user];
            todos[i] = todo;
            allTodos[user] = todos;
            await AsyncStorage.setItem('todos', JSON.stringify(allTodos));
            dispatch(getTodos(user))
        } catch (error) {
            console.error(error);
        }
    }
}
export function getTodos(user) {
    return async dispatch => {
        try {
            let allTodos = await AsyncStorage.getItem('todos');
            allTodos = JSON.parse(allTodos) || {};
            console.log(allTodos);
            dispatch(setTodos(allTodos[user] || []))
        } catch (error) {
            console.log(error);
        }

    }
}
function setTodos(todos) {
    return {
        type: SET_TODOS,
        todos
    }
}