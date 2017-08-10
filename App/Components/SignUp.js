import React, { Component } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { setCurrentUser, setUsers, signup } from '../actions/auth';

function mapDispatchToProps(dispatch) {
    return {
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
        setUsers: (users) => dispatch(setUsers(users)),
        signup: (user) => dispatch(signup(user))
    }
}
function mapStateToProps(state) {
    return {
        users: state.users
    }
}
class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', error: null };
    }
    static navigationOptions = {
        title: 'Sign Up'
    }
    signup = async () => {
        const { username, password } = this.state;
        const { dispatch } = this.props.navigation;
        let error = null;
        if (username && username.length < 4) {
            error = 'Username must be atleast 4 letters';
        }
        else if (password && password.length < 4) {
            error = 'Password must be atleast 4 letters';
        }
        else if (username && password && username.length >= 4 && password.length >= 4) {
            const user = { username, password };
            if (this.userExists(user)) {
                error = "User with the given username already exists!"
            }
            else {
                this.props.signup(user);
                const resetNav = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Todos', params: { user } })
                    ]
                });
                dispatch(resetNav)
            }
        }
        this.setState({ error });
    };
    userExists = user => {
        const { users } = this.props;
        for (let i = 0; i < users.length; i++) {
            if (user.username === users[i].username) {
                return true;
            }
        }
        return false;
    }
    gotoLogin = () => {
        const { dispatch } = this.props.navigation;
        const resetNav = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        });
        dispatch(resetNav)
    }
    render() {
        const { username, password, error } = this.state;
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>Todo List</Text>
                <Text style={{ fontSize: 20, marginTop: 40 }}>Sign Up</Text>
                <TextInput placeholder="Username" style={{ width: '100%' }} value={username} onChangeText={(username) => this.setState({ username })} />
                <TextInput placeholder="Password" style={{ width: '100%' }} value={password} onChangeText={(password) => this.setState({ password })} />
                <Button title="Sign Up" onPress={this.signup} />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Text style={{ marginTop: 20 }}>Already have an account? <Text style={{ color: 'blue' }} onPress={this.gotoLogin}>Login</Text></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    error: {
        color: 'red'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);