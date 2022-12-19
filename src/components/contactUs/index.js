import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    View, Card, CardItem, Text,
    Body, Item, Label, Textarea, Button, Toast, Input
} from 'native-base';
import ValidationComponent from 'react-native-form-validator';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import { contactUs } from '../../action/getSupportdetailsAction';
import { isStringEmpty } from '../../utils/checkEmptycondition';
import { toastMessagefailure } from '../../utils/showMessage';
import { TitleCase } from '../../utils/caseFormat';

class ContactUs extends ValidationComponent {
    static navigationOptions = ({ navigation }) => ({
        title: 'Contact Us',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.default,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
    });
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
            visible: false
        };
    }
    componentWillMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.leftArrowIcon}
                        style={styles.backIcon}
                    />

                </TouchableOpacity>,
            headerRight: null
        });
    }
    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.leftArrowIcon}
                        style={AppStyles.backIcon}
                    />
                </TouchableOpacity>,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log('check nextProps', nextProps, nextProps.contactUsStatus);
            if (nextProps.contactUsStatus !== this.props.contactUsStatus) {
                this.setState({
                    visible: false
                });
                console.log('check nextProps if', nextProps.contactUsStatus);
                this.props.navigation.navigate('Home');
            }
        }
    }
    onSendMessage() {
        console.log('check', this.state.name, this.state.email, this.state.message, this.state.phone);
        const { name, email, message, phone } = this.state;
        if (isStringEmpty(this.state.name) && isStringEmpty(this.state.email) && isStringEmpty(this.state.message) && isStringEmpty(this.state.phone)) {
            console.log('check if', this.state.name, this.state.email, this.state.message, this.state.phone);
            this.setState({ visible: true });
            this.validate({
                name: { name: true, required: true },
                email: { email: true, required: true },
                message: { message: true, required: true },
                phone: { minlength: 8, maxlength: 15, phone: true, required: true },
            }, () => {
                this.setState({ visible: false });
            });
            if (this.getErrorMessages() === '') {
                this.props.contactUs(name, email, message, phone);
            } else {
                console.log('errorMessag', this.getErrorMessages());
                this.setState({ visible: false });
            }
        } else {
            toastMessagefailure('Please fill all fields');
        }
    }
    renderLoader() {
        if (this.props.contactUsLoader || this.state.visible) {
            console.log('visible', this.state.visible);
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.props.contactUsLoader || this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
        }
    }
    render() {
        console.log('getErrorMessages', this.getErrorMessages());
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.contractContainer}>
                    <View>
                        <Label style={styles.jobPostLabel}>Need help with Something?</Label>
                        <Label style={styles.labelStyle}>Use the form below to send us a message</Label>
                    </View>
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                                <Item style={styles.itemStyle}>
                                    <Input
                                        placeholderTextColor="#dcdcdc"
                                        placeholder="Name"
                                        ref="name"
                                        style={styles.inputHeight}
                                        value={this.state.name}
                                        onChangeText={(text) => this.setState({ name: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    {this.isFieldInError('name') && this.getErrorsInField('name') &&
                        <Text style={styles.errorMessage}>
                            Name Is Required
                                    </Text>}
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                                <Item style={styles.itemStyle}>
                                    <Input
                                        placeholderTextColor="#dcdcdc"
                                        placeholder="Email address"
                                        ref="email"
                                        style={styles.inputHeight}
                                        value={this.state.email}
                                        onChangeText={(text) => this.setState({ email: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    {this.isFieldInError('email') && this.getErrorsInField('email').map((errorMessage, key) =>
                        <Text key={key} style={styles.errorMessage}>
                            {TitleCase(errorMessage)}
                        </Text>)}
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                                <Item style={styles.itemStyle}>
                                    <Input
                                        placeholderTextColor="#dcdcdc"
                                        placeholder="Phone Number"
                                        ref="phone"
                                        keyboardType={'numeric'}
                                        style={styles.inputHeight}
                                        value={this.state.phone}
                                        onChangeText={(text) => this.setState({ phone: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    {this.isFieldInError('phone') && this.getErrorsInField('phone').map((errorMessage, key) =>
                        <Text key={key} style={styles.errorMessage}>
                            {TitleCase(errorMessage)}
                        </Text>)}
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                                <Item style={styles.itemStyle}>
                                    <Textarea
                                        placeholderTextColor="#dcdcdc"
                                        placeholder="Message"
                                        ref="message"
                                        style={styles.textareaStyle}
                                        maxLength={5000}
                                        value={this.state.message}
                                        onChangeText={(text) => this.setState({ message: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Text style={styles.textcountView}>
                        {this.state.message.length}/5000
                     </Text>
                    {this.isFieldInError('message') && this.getErrorsInField('message').map((errorMessage, key) =>
                        <Text key={key} style={styles.errorMessage}>
                            {TitleCase(errorMessage)}
                        </Text>)}
                    <View style={styles.postJob} >
                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onSendMessage.bind(this)}>
                            <LinearGradientView style={AppStyles.primaryButton} name={'Send Message'} />
                        </TouchableOpacity>
                    </View>
                </View>
                {this.renderLoader()}
            </ScrollView>
        );
    }
}

export const mapStateToProps = (status) => {
    console.log(status, 'npst');
    const { contactUsLoader, contactUsStatus } = status.getSupportdetail;
    return {
        contactUsLoader,
        contactUsStatus
    };
};

export default connect(mapStateToProps, { contactUs })(ContactUs);
