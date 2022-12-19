
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Theme from '../themes/Theme';




 class one extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'About',
    headerLeft: null,
    headerRight: null,
    headerStyle: {
      backgroundColor: Theme.Colors.white,
    },
    headerTitleStyle: {
      color: Theme.Colors.primary,
      fontSize: Theme.Font.sizes.title,
      fontWeight: 'normal',
      textAlign: 'center', 
      flex: 1,
    },
  });
  render() {
    return (
        <View>
            <Text>No data</Text>   
        </View>
    );
  }
}

export default one;
