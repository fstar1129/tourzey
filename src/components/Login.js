
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button } from 'native-base';


 class Login extends Component {
  render() {
    return (
        <View>
            <Button onPress={() => this.props.navigation.navigate('Joblist')}>
            <Text>heiii</Text>
            </Button>   
        </View>
    );
  }
}

export default Login;
