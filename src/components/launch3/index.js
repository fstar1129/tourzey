
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Images from '../../themes/main/Theme.Main.Images';
import Theme from '../../themes/Theme';
import styles from './styles';


class Launch3 extends Component {

    onPressLaunch() {
        this.props.navigation.navigate('LaunchScreen');
    }
    

    render() {
        return (
            <View style={styles.launchText}>
                <ImageBackground
                    source={Theme.Images.launch_screen.launch3} style={styles.launchScreen}
                >
                    <ImageBackground
                        source={Theme.Images.backgrounds.launchBg} style={styles.launchScreen}
                    >

                        <View style={styles.textStyle}>
                            <Text style={styles.textStyle1}>Make friends along the way</Text>
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

export default Launch3;
