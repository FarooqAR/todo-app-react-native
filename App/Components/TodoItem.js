import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Modal, TouchableHighlight } from 'react-native';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.swipeable = null;
    }
    deleteTodo = (index) => {
        this.swipeable.recenter();
        this.props.onDelete(index);
    }
    editTodo = (item, index) => {
        this.swipeable.recenter();
        this.props.onEdit(item, index);
    }
    changeStatus = (item, index) => {
        this.swipeable.recenter();
        this.props.onChangeStatus(item, index);
    }
    render() {
        const { item, index } = this.props;
        const rightButtons = [
            <TouchableHighlight underlayColor="#00000000" onPress={() => this.editTodo(item, index)}><Icon name="mode-edit" size={20} /></TouchableHighlight>,
            <TouchableHighlight underlayColor="#00000000" onPress={() => this.deleteTodo(index)}><Icon name="delete" size={20} /></TouchableHighlight>
        ];
        return (
            <Swipeable onRef={ref => this.swipeable = ref} rightButtonWidth={30} rightButtons={rightButtons} style={styles.swipeable}>
                <TouchableHighlight underlayColor="#00000000" onPress={() => this.changeStatus(item, index)}>
                    <View >
                        <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.text}</Text>
                    </View>
                </TouchableHighlight>
            </Swipeable>
        );
    }
}
TodoItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired
};
const styles = StyleSheet.create({
    swipeable: {
        flex: 1,
        marginTop: 5,
        padding: 10,
        paddingRight: 0,
        alignContent: 'flex-start',
        backgroundColor: '#fff',
        elevation: 0.3,
        borderColor: 'lightgrey',
        borderWidth: 0.4
    }
});
export default TodoItem;