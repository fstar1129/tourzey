import React, { Component } from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AppReducer from './src/reducers';
import App from './src/navigator/appNavigator';

export default class Tourzey extends Component {
  store = createStore(AppReducer, {}, applyMiddleware(ReduxThunk));

  render() {
    return (
              <Provider store={this.store} >
                    <Root>
                      <App />
                    </Root>
                 </Provider>
    );
  }
}

