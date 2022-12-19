import React, { Component } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';

class TourCategoryGradientModal extends Component {
    render() {
        return (
            <LinearGradient colors={['#01D87C', '#03ABAD', '#0494C6', '#0575E6']} start={{ x: 0.0, y: 0.0 }} end={{ x: 0.4, y: 1.5 }} {...this.props}>
                <Text style={AppStyles.categoryButtonText}>{this.props.name}</Text>                           
            </LinearGradient>           
        );
    }
}

export default TourCategoryGradientModal;
