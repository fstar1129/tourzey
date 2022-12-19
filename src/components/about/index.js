
import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Theme from '../../themes/Theme';
import styles from './styles';

class About extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'About',
        // headerLeft:  navigation.state.params ? navigation.state.params.title : null,
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
            flex: 0.8,
        }
    });
    render() {
        return (
            <SafeAreaView>
                <View style={styles.CardContainerView}>
                    <View style={styles.nodataView}>
                        <Text style={styles.nodataText}>
                            Build version: 20190406.2104
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default About;
