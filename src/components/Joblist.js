
import React, { Component } from 'react';
import { Text, View } from 'react-native';


 class JobList extends Component {
  render() {
    return (
        <View>
            <Text onPress={() => this.props.navigation.navigate('one')}>JObsss</Text>   
        </View>
    );
  }
}

export default JobList;
