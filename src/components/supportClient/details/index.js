import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Text, Image, Dimensions } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { SafeAreaView } from 'react-navigation';
import { View } from 'native-base';
import styles from './styles';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';
import Theme from '../../../themes/Theme';


export default class Details extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params && navigation.state.params.data.question,
        headerLeft:
            navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            //  color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
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

    onQuestionPress() {
        this.props.navigation.navigate('Questions', { pageName: this.props.navigation.state.params.pageName });
    }
    onContactUs() {
        this.props.navigation.navigate('ContactUs');
    }
    onDisputePress() {

    }
    render() {
        const value = this.props.navigation.state.params.data;
        console.log('value', value);
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.nodataView}>
                    <View style={styles.cardItemStyle} >
                        <Text style={styles.textStyle}>{value.question ? value.question : 'No Question Description Available'}</Text>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image
                                    source={Theme.Images.icons.dropup}
                                    style={styles.logoutImg}
                                />
                            </TouchableOpacity> */}
                    </View>
                    <View style={styles.answerStyle} >
                        {/* <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onContactUs.bind(this)}> */}
                        <HTMLView
                            value={value.answer ? value.answer : 'No answer available for this question'}
                            style={{ marginLeft: 30 }}
                            imagesMaxWidth={Dimensions.get('window').width}
                        />
                        {/* <HTML style={{ marginLeft: 30 }} html={value.answer ? value.answer : 'No answer available for this question'} imagesMaxWidth={Dimensions.get('window').width} /> */}
                        {/* <Text style={styles.textStyle1}>{value.answer ? value.answer : 'No answer available for this question'}</Text> */}
                        {/* </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

