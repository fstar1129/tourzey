import React, { Component } from 'react';
import { Card, CardItem, Body, Right, Switch, Left } from 'native-base';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import CheckBox from 'react-native-check-box';
import { Text, View, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';
import Colors from '../../themes/main/Theme.Main.Colors';
import { updateProfileDetails, fetchData } from '../../action/index';

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
        headerLeft: null,
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
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
    constructor() {
        super();
        this.state = {
            notification: false,
            expandedOffers: false,
            expandedMessages: false,
            offerValue: false,  //offers notification
            soundCheckedInOffers: false, // Offers sound
            messageCheckedInOffers: false,
            messageValue: false, //message notification
            soundCheckedInMessage: false, // Message sound
            messageCheckedInMessage: false,
            setting: {},
            fullName: ' ',
            email: '',
            password: '',
            role: '',
            brokerageName: '',
            address: '',
            phone: '',
            brokerName: '',
            brokerageLicense: '',
            agentLicense: '',
            description: '',
            serviceArea: '',
            languages: '',
            experience: [],
            imageData: '',
            id: '',
            jobId: [],
            // visible: false,
            pushToken: ''
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerRight:
                <View>
                    <Text style={AppStyles.nextBtn} onPress={() => { this.saveSettings(); }}>SAVE</Text>
                </View>
        });
        if (this.props.userData !== null) {
            const {
                setting,
                fullName,
                email,
                password,
                role,
                brokerageName,
                address,
                phone,
                brokerName,
                brokerageLicense,
                agentLicense,
                description,
                serviceArea,
                languages,
                experience,
                imageData,
                id,
                jobId,
                pushToken
            } = this.props.userData;
            this.setState({
                notification: setting && setting.notification,
                offerValue: setting && setting.offerValue,
                soundCheckedInOffers: setting && setting.soundCheckedInOffers,
                messageCheckedInOffers: setting && setting.messageCheckedInOffers,
                messageValue: setting && setting.messageValue,
                soundCheckedInMessage: setting && setting.soundCheckedInMessage,
                messageCheckedInMessage: setting && setting.messageCheckedInMessage,
                fullName,
                email,
                password,
                role,
                brokerageName,
                address,
                phone,
                brokerName,
                brokerageLicense,
                agentLicense,
                description,
                serviceArea,
                languages,
                experience,
                imageData,
                id,
                jobId,
                pushToken
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        // todo-cr-si-pavi : @boopathi check empty condition for props and nextProps
        // if (this.props.update !== nextProps.update &&
        //     nextProps.loading === false && nextProps.update === true) {
        //     this.props.fetchData();
        //     // this.setState({
        //     //     visible: false
        //     // });
        //     const resetAction = NavigationActions.reset({
        //         index: 0,
        //         actions: [
        //             NavigationActions.navigate({ routeName: 'Jobs' })
        //         ]
        //     });
        //     this.props.navigation.dispatch(resetAction);
        // }
    }

    // For Offers-Sound 
    onOffersSoundClick() {
        this.setState({ soundCheckedInOffers: !this.state.soundCheckedInOffers });
    }

    // For offers-Messages h
    onOffersMessagesClick() {
        this.setState({
            messageCheckedInOffers: !this.state.messageCheckedInOffers
        });
    }

    //For Messages-Messages 
    onMessagesInMessagesClick() {
        this.setState({
            messageCheckedInMessage: !this.state.messageCheckedInMessage,
        });
    }
    //For common notification switch
    toggleswitch(value) {
        // todo-cr-si-pavi : @boopathi check empty condition for value 
        this.setState({ notification: value });
    }

    //For Messages-sound
    onMesagesSoundClick() {
        this.setState({
            soundCheckedInMessage: !this.state.soundCheckedInMessage,
        });
    }

    //For Offer notification
    offerSwitch(value) {
         // todo-cr-si-pavi : @boopathi check empty condition for value 
        this.setState({
            offerValue: value
        });
    }

    //For message notification
    messageSwitch(value) {
         // todo-cr-si-pavi : @boopathi check empty condition for value 
        this.setState({
            messageValue: value
        });
    }

    // To save settings
    saveSettings() {
        const {
            fullName,
            email,
            password,
            role,
            brokerageName,
            address,
            phone,
            brokerName,
            brokerageLicense,
            agentLicense,
            description,
            serviceArea,
            languages,
            experience,
            imageData,
            id,
            jobId,
            pushToken
         } = this.state;
        const setting = {
            notification: this.state.notification,
            offerValue: this.state.offerValue,
            soundCheckedInOffers: this.state.soundCheckedInOffers,
            messageCheckedInOffers: this.state.messageCheckedInOffers,
            messageValue: this.state.messageValue,
            soundCheckedInMessage: this.state.soundCheckedInMessage,
            messageCheckedInMessage: this.state.messageCheckedInMessage
        }
        const data = {
            setting,
            fullName,
            email,
            password,
            role,
            brokerageName,
            address,
            phone,
            brokerName,
            brokerageLicense,
            agentLicense,
            description,
            serviceArea,
            languages,
            experience,
            imageData,
            id,
            jobId,
            pushToken
        }
        this.props.updateProfileDetails(data);
    }

    //Loader..
    renderLoading() {
        // if (this.props.loading) {
        //     this.state.visible = true;  //TODO: need to setState 

            return (
                <View style={{ flex: 1 }}>
                    <Spinner
                        visible={this.props.loading}
                        textContent={'Loading...'}
                        textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }}
                    />

                </View>
            );
        // }
    }

    render() {
        return (
            <View style={styles.notification}>
                {this.renderLoading()}
                <View style={styles.notificationView}>
                    <Card style={styles.cardViewStyle}>
                        <CardItem>
                            <Left>
                                <View style={styles.questionViewMain}>
                                    <Text style={AppStyles.textPrimary}>Notifications</Text>
                                </View>
                            </Left>
                            <Right>
                                <Switch
                                    onValueChange={(value) => this.toggleswitch(value)}
                                    value={this.state.notification}
                                    onTintColor={Theme.Colors.primary}
                                    thumbColor={Platform.OS === 'ios' ? null : Theme.Colors.white}
                                    tintColor={Platform.OS === 'ios' ? null : Theme.Colors.grey}
                                />
                            </Right>
                        </CardItem>
                    </Card>
                </View>
                <Card style={styles.cardViewStyle}>
                    <TouchableOpacity onPress={() => this.setState({ expandedOffers: !this.state.expandedOffers })} >
                        <CardItem>
                            <Body>
                                <View style={styles.questionViewMain}>
                                    <Text style={AppStyles.textPrimary}>Offers</Text>
                                </View>
                            </Body>
                            <Right>
                                <Icon style={AppStyles.textPrimary} name={this.state.expandedOffers === false ? 'chevron-down' : 'chevron-up'} />
                            </Right>
                        </CardItem>
                        {this.state.expandedOffers === true &&
                            <CardItem style={styles.settingsContent}>
                                <Body>
                                    <View style={styles.questionView}>
                                        <Text style={styles.textDefault}>Notifications</Text>
                                        <Switch
                                            onValueChange={(value) => this.offerSwitch(value)}
                                            value={this.state.offerValue}
                                            onTintColor={Theme.Colors.primary}
                                            thumbColor={Platform.OS === 'ios' ? null : Theme.Colors.white}
                                            tintColor={Platform.OS === 'ios' ? null : Theme.Colors.grey}
                                        />
                                    </View>
                                    {this.state.offerValue === true &&
                                        <View>
                                            <View style={styles.questionView}>
                                                <Text style={styles.textDefault}>
                                                    Sound
                                                    </Text>
                                                <CheckBox
                                                    style={styles.checkboxCheck}
                                                    onClick={(val) => { this.onOffersSoundClick(val); }}
                                                    isChecked={this.state.soundCheckedInOffers}
                                                    checkBoxColor={Theme.Colors.primary}
                                                />
                                            </View>
                                            <View style={styles.questionView}>
                                                <Text style={styles.textDefault}>
                                                    Messages
                                                </Text>
                                                <CheckBox
                                                    style={styles.checkboxCheck}
                                                    onClick={() => { this.onOffersMessagesClick(); }}
                                                    isChecked={this.state.messageCheckedInOffers}
                                                    checkBoxColor={Theme.Colors.primary}
                                                />
                                            </View>
                                        </View>
                                    }
                                </Body>
                            </CardItem>
                        }
                    </TouchableOpacity>
                </Card>
                <Card style={styles.cardViewStyle}>
                    <TouchableOpacity onPress={() => this.setState({ expandedMessages: !this.state.expandedMessages })} >
                        <CardItem>
                            <Body>
                                <View style={styles.questionViewMain}>
                                    <Text style={AppStyles.textPrimary}>Messages</Text>
                                </View>
                            </Body>
                            <Right>
                                <Icon style={AppStyles.textPrimary} name={this.state.expandedMessages === false ? 'chevron-down' : 'chevron-up'} />
                            </Right>
                        </CardItem>
                        {this.state.expandedMessages &&
                            <CardItem style={styles.settingsContent}>
                                <Body>
                                    <View style={styles.questionView}>
                                        <Text style={styles.textDefault}>Notifications</Text>
                                        <Switch
                                            onValueChange={(value) => this.messageSwitch(value)}
                                            value={this.state.messageValue}
                                            onTintColor={Theme.Colors.primary}
                                            thumbColor={Platform.OS === 'ios' ? null : Theme.Colors.white}
                                            tintColor={Platform.OS === 'ios' ? null : Theme.Colors.grey}
                                        />
                                    </View>
                                    {this.state.messageValue === true &&
                                        <View>
                                            <View style={styles.questionView}>
                                                <Text style={styles.textDefault}>
                                                    Sound
                                              </Text>
                                                <CheckBox
                                                    style={styles.checkboxCheck}
                                                    onClick={() => { this.onMesagesSoundClick(); }}
                                                    isChecked={this.state.soundCheckedInMessage}
                                                    checkBoxColor={Colors.primary}
                                                />
                                            </View>
                                            <View style={styles.questionView}>
                                                <Text style={styles.textDefault}>
                                                    Messages
                                          </Text>
                                                <CheckBox
                                                    style={styles.checkboxCheck}
                                                    onClick={() => { this.onMessagesInMessagesClick(); }}
                                                    isChecked={this.state.messageCheckedInMessage}
                                                    checkBoxColor={Colors.primary}
                                                />
                                            </View>
                                        </View>
                                    }
                                </Body>
                            </CardItem>
                        }
                    </TouchableOpacity>
                </Card>
                <Card style={styles.cardViewStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('ProfileEdit');
                            // Alert.alert(
                            //     'Confirm',
                            //     'Are you sure you want to logout?',
                            //     [
                            //         { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            //         { text: 'OK', onPress: () => this.props.navigation.navigate('Logout', { loading: true }) },
                            //     ],
                            //     { cancelable: false }
                            // );
                        }}
                        style={styles.logoutView}
                    >
                        <Image
                            source={Theme.Images.icons.logoutIcon}
                            style={styles.logoutImg}
                        />
                        <Text style={styles.logoutText}>Logout </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }
}


export const mapStateToProps = ({ getuserData, updateDetail }) => {
    const { updateDetails, error, loading, update } = updateDetail;
    const { userData } = getuserData;
    return { loading, userData, updateDetails, error, update };
};


export default connect(mapStateToProps, { fetchData, updateProfileDetails })(SettingsScreen);

