import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import thunk from 'redux-thunk';

import LoginScreen from './App/Components/Main';
import SignUpScreen from './App/Components/SignUp';
import Todos from './App/Components/Todos';
import reducer from './App/reducers';
import { getUsers, fetchCurrentUser } from './App/actions/auth';

const store = createStore(reducer, applyMiddleware(thunk));

const RNApp = StackNavigator({
  Login: { screen: LoginScreen },
  Todos: { screen: Todos },
  SignUp: { screen: SignUpScreen }
});

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  }
}
class App extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.fetchCurrentUser();
  }
  render() {
    return <RNApp />
  }
}

App = connect(null, mapDispatchToProps)(App);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerComponent('RNApp', () => Root);

