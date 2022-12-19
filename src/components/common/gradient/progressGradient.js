import React, { Component } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';

class ProgressGradientView extends Component {

    render() {
        console.log('ProgressGradientView', this.props.width);
        return (

            <LinearGradient colors={['#0575E6', '#0494C6', '#03ABAD', '#01D87C']} start={{ x: 0.0, y: 1.4 }} end={{ x: 1.4, y: 1.5 }} {...this.props}>
                 <View style={[AppStyles.progress, { width: `${this.props.width}%` }]} />                       
            </LinearGradient>
        );
    }
}

export default ProgressGradientView;

