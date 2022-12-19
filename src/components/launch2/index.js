
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Images from '../../themes/main/Theme.Main.Images';
import Theme from '../../themes/Theme';
import styles from './styles';


class Launch2 extends Component {

    onPressLaunch() {
        this.props.navigation.navigate('Launch3');
    }

    render() {
        return (
            <View style={styles.launchText}>
                <ImageBackground
                    source={Theme.Images.launch_screen.launch2} style={styles.launchScreen}
                >
                    <ImageBackground
                        source={Theme.Images.backgrounds.launchBg} style={styles.launchScreen}
                    >

                        <View style={styles.textStyle}>
                            <Text style={styles.textStyle1}>See the world Differently</Text>
                            <TouchableOpacity onPress={() => this.onPressLaunch()}>
                                <View style={styles.icon}><Image source={Images.icons.rightArrowIcon} style={styles.imageStyle2} /></View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ImageBackground>
            </View>

        );
    }
}

export default Launch2;
