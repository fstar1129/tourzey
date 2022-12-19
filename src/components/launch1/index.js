
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Image, AsyncStorage } from 'react-native';
import Images from '../../themes/main/Theme.Main.Images';
import Theme from '../../themes/Theme';
import styles from './styles';


class Launch1 extends Component {

    componentWillMount() {
        AsyncStorage.getItem('launchSeen').then(async res => {
            console.log('laucnhres', res);
            if (res === null) {
                AsyncStorage.setItem('launchSeen', JSON.stringify(true)).then(() => {
                    console.log('done');
                });
            }
        });
    }

    onPressLaunch() {
        console.log('checking')
        this.props.navigation.navigate('Launch2');
    }

    render() {
        return (
            <View style={styles.launchText}>
                <ImageBackground
                    source={Theme.Images.launch_screen.launch1} style={styles.launchScreen}
                >
                    <ImageBackground
                        source={Theme.Images.backgrounds.launchBg} style={styles.launchScreen}
                    >

                        <View style={styles.textStyle}>
                            <Text style={styles.textStyle1}>Take Personal Tours</Text>
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

export default Launch1;
