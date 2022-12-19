import React, { Component } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';

class LinearGradientView extends Component {
    render() {
        return (

            <LinearGradient
                colors={this.props.buttonColor === 'blueToGreen' ? ['#0575E6', '#0494C6', '#03ABAD', '#01D87C'] : ['#01D87C', '#03ABAD', '#0494C6', '#0575E6']}
                start={this.props.buttonColor === 'blueToGreen' ? { x: 0.0, y: 1.4 } : { x: 0.0, y: 0.0 }}
                end={this.props.buttonColor === 'blueToGreen' ? { x: 1.4, y: 1.5 } : { x: 0.4, y: 1.5 }}
                angle={270}
                {...this.props}
            >
                <Text style={this.props.buttonStyle === 'small' ? AppStyles.buttonTextStyle : AppStyles.buttonText}>{this.props.name}</Text>
            </LinearGradient>
        );
    }
}

export default LinearGradientView;

