import React, { Component } from 'react';
import { FlatList, TextInput, View, Text, Button, StyleSheet, AsyncStorage, Modal, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { getTodos, addTodo, editTodo, deleteTodo } from '../actions/todos';
import TodoItem from './TodoItem';

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        getTodos: (user) => dispatch(getTodos(user)),
        addTodo: (todo, user) => dispatch(addTodo(todo, user)),
        deleteTodo: (index, user) => dispatch(deleteTodo(index, user)),
        editTodo: (todo, i, user) => dispatch(editTodo(todo, i, user))
    }
}
function mapStateToProps({ currentUser, todos }) {
    return { currentUser, todos }
}
class Todos extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Welcome ${navigation.state.params.user ? navigation.state.params.user.username : ''}!`,
        headerRight: <Button title="Logout" onPress={() => Todos.logout(navigation)} />
    });

    static logout = async (navigation) => {
        try {
            await AsyncStorage.removeItem('currentUser');
            const { dispatch } = navigation;
            const navigate = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ]
            });

            dispatch(navigate);
        }
        catch (error) {
            console.error(error);
        }
    };
    state = {
        modalVisible: false,
        todoToEdit: null,
        todoToEditIndex: null
    }
    showEditModal = (item, index) => {
        this.setState({ todoToEditIndex: index, todoToEdit: item });
        this.setModalVisible(true);
    }
    deleteTodo = (index) => {
        this.props.deleteTodo(index, this.props.currentUser.username);
    }
    changeStatus = (item, index) => {
        item.completed = !item.completed;
        this.props.editTodo(item, index, this.props.currentUser.username);
    }
    componentDidMount() {
        this.props.getTodos(this.props.currentUser.username)
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    addTodo = () => {
        const todo = this.refs.todoTextInput._lastNativeText;
        const { todoToEditIndex, todoToEdit } = this.state;
        if (todo) {
            if (todoToEditIndex !== null && todoToEdit !== null) {
                this.props.editTodo({ ...todoToEdit, text: todo }, todoToEditIndex, this.props.currentUser.username);
            }
            else {
                this.props.addTodo({ text: todo, completed: false }, this.props.currentUser.username);
            }
        }
        this.setState({ todoToEdit: null, todoToEditIndex: null })
        this.setModalVisible(false);
    }
    renderTodo = ({ item, index }) => {
        return (
            <TodoItem
                item={item}
                index={index}
                onDelete={this.deleteTodo}
                onChangeStatus={this.changeStatus}
                onEdit={this.showEditModal} />
        );
    }
    render() {
        const { todoToEdit } = this.state;
        return (
            <View style={styles.container}>
                <Modal
                    animationType={todoToEdit ? 'fade' : 'slide'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View elevation={5} style={styles.modal}>
                            <TextInput onBlur={this.addTodo} ref="todoTextInput" placeholder="Todo Text" style={{ width: '100%' }} defaultValue={todoToEdit ? todoToEdit.text : ''} />
                            <Button title={todoToEdit ? 'Save' : 'Add'} onPress={() => this.addTodo()} />
                        </View>
                    </View>
                </Modal>
                <FlatList data={this.props.todos} keyExtractor={(item, i) => i} renderItem={this.renderTodo} />
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => this.setModalVisible(true)}
                />
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    modalContainer: {
        backgroundColor: '#00000080',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20
    }
});