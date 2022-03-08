// App.js
import React, { Component } from 'react';
import NavigationTabs from './Navigation/Navigation';
import { Provider } from 'react-redux';
import Store from './Store/configStore';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigationTabs/>
      </Provider>
    );
  };
}
