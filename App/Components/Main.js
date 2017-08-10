import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch(login(user))
    }
}
class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login'
    }
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', error: null };
    }
    componentWillReceiveProps(nextProps) {
        const { currentUser } = nextProps;
        const { dispatch } = this.props.navigation;
        if (currentUser) {
            const reset = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Todos', params: { user: currentUser } })
                ]
            });
            dispatch(reset);
        }
    }
    login = () => {
        const { navigate } = this.props.navigation;
        const { username, password } = this.state;
        if (username && password) {
            this.props.login({ username, password })
                .catch(error => {
                    console.log(error);
                    this.setState({ error: error.message })
                })
        }
    }
    gotoSignUp = () => {
        const { navigate } = this.props.navigation;
        navigate('SignUp');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>Todo List</Text>
                <Text style={{ fontSize: 20, marginTop: 40 }}>Login</Text>
                <TextInput placeholder="Username" style={{ width: '100%' }} value={this.state.username} onChangeText={(username) => this.setState({ username })} />
                <TextInput placeholder="Password" style={{ width: '100%' }} value={this.state.password} onChangeText={(password) => this.setState({ password })} />
                <Button title="Login" onPress={this.login} />
                {this.state.error ? <Text style={{ color: 'red', marginTop: 10 }}>{this.state.error}</Text> : null}
                <Text style={{ marginTop: 20 }}>Don't have an account? <Text style={{ color: 'blue' }} onPress={this.gotoSignUp}>Sign Up!</Text></Text>

            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});