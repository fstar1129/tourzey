import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { View } from 'native-base';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import ToursList from '../toursList/index';

export default class Support extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'How can we assist?',
        headerLeft:
            navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            // color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.regular,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8

        },
    });
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {

        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.leftArrowIcon}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>,
        });
    }

    onToursPress() {
        this.props.navigation.navigate('ToursList', { tourType: 'complete' });
    }
    onGuidance() {
        this.props.navigation.navigate('Guidance');
    }
    render() {
        console.log('plusPressed', this.props.plusPressed);
        return (
            <ScrollView style={styles.scrollStyle}>
                <View style={styles.nodataView}>
                    <View style={styles.postJob} >
                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onToursPress.bind(this)}>
                            <Text style={styles.textStyle}>Tours</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#D1D1D1',
                            borderBottomWidth: 1,
                            marginLeft: 90
                        }}
                    />
                    <View style={styles.postJob} >
                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onGuidance.bind(this)}>
                            <Text style={styles.textStyle}>Guide to using Tourzey</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

