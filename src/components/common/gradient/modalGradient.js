import React, { Component } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';

class LinearGradientViewModel extends Component {
    render() {
        return (
            <LinearGradient colors={['#0575E6', '#0494C6', '#03ABAD', '#01D87C']} start={{ x: 0.0, y: 1.4 }} end={{ x: 1.4, y: 1.5 }} {...this.props}>
                <Text style={AppStyles.modalButtonText}>{this.props.name}</Text>                           
            </LinearGradient>           
        );
    }
}

export default LinearGradientViewModel;