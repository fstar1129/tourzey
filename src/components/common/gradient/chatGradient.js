import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';

class LinearGradientViewMessage extends Component {
    
    render() {
        console.log('name', this.props.name.text);
        return (
            <LinearGradient colors={this.props.name.role !== 'agent' ? ['#0575E6', '#0494C6', '#03ABAD', '#01D87C'] : ['#C0C0C0', '#C0C0C0']} start={this.props.name.role !== 'agent' ? { x: 0.0, y: 1.4 } : { x: 0.0, y: 0.0 }} end={this.props.name.role !== 'agent' ? { x: 1.4, y: 1.5 } : { x: 0.0, y: 0.0 }} {...this.props}>
                {_.startsWith(this.props.name.text, 'https://image') || _.startsWith(this.props.name.text, 'https://firebasestorage.') ?
                    <View style={{ background: 'transparent' }}>
                        {!_.startsWith(this.props.name.text, 'https://firebasestorage.') &&
                            <Icon name="play-circle" style={{ position: 'absolute', zIndex: 999, top: '40%', left: '40%' }} color='white' size={40} />
                        }
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: this.props.name.text }}
                        />
                    </View>
                    :
                    <Text style={this.props.name.role !== 'agent' ? AppStyles.chatText : AppStyles.chatText1}>{this.props.name.text}</Text>
                }
            </LinearGradient>
        );
    }
}

export default LinearGradientViewMessage;
