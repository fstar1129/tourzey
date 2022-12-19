import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Alert, Modal, Image, WebView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SafeAreaView, NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View, Card, CardItem, Thumbnail, Text,
    Body, Item, Input, Button, Label, Picker,
    Toast
} from 'native-base';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import { paymentDetailsUpdation } from '../../action/paymentsAction';
import { paymentIdUrl, paymentIdUrlProd } from '../../utils/constants';


class Billing extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.title : 'Video',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
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
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
            cardHolderName: '',
            month: '',
            year: '',
            cvv: '',
            shows_btn: false,
            visible: true
        };
    }


    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.backIcon}
                        style={AppStyles.backIcon}
                    />
                </TouchableOpacity>,
        });
    }
    componentWillMount() {
        console.log(this.props.navigation.state.params, 'params');
        this.setState({
            accessToken: this.props.navigation.state.params.accessToken,
            approvalUrl: this.props.navigation.state.params.approvalUrl,
            paymentId: this.props.navigation.state.params.paymentId,
            videoUrl: this.props.navigation.state.params.videoUrl,
            tourData: this.props.navigation.state.params.tourDetails
        }, () => {
            console.log(this.state.videoUrl, 'vurl');
            this.props.navigation.setParams({
                title: this.state.videoUrl ? 'Video' : 'Payment',
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'nextprops');
        this.setState({ visible: false });
        if (nextProps.paymentDone !== this.props.paymentDone) {
            if (nextProps.paymentDone === true) {
                this.props.navigation.navigate('Home');
            }
        }
    }

    onCardPress() {
        this.setState({ shows_btn: !this.state.shows_btn });
    }

    onPaypalPress() {
        this.setState({ shows_btn: !this.state.shows_btn });
    }
    onMonthChange(value) {
        this.setState({
            month: value
        });
    }
    onYearChange(value) {
        this.setState({
            year: value
        });
    }

    renderLoader() {
        console.log('loader', this.state.visible);
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    onNavigationStateChange = (webViewState) => {
        console.log('webViewState', webViewState, webViewState.loading);
        this.setState({ visible: webViewState.loading });
        const accessToken = this.state.accessToken;
        //todo-cr-si: naaziya: change redirect url
        if (webViewState.url.includes('https://returnandcancel.com/')) {
            this.setState({
                approvalUrl: null,
                visible: false
            });

            const paymentId = webViewState.url.split('=');
            const PayerID = webViewState.url.split('&PayerID=');
            console.log(PayerID, paymentId);
            //todo-cr-si: naaziya : import URL from config file
            axios.post(paymentIdUrl + '/' + paymentId[1].substr(0, paymentId[1].indexOf('&')) + '/execute', { payer_id: paymentId[3] },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                }
            )
                .then(response => {
                    console.log(response);
                    if (response.data.state === 'approved') {
                        console.log('tourdet', this.props.navigation.state.params.tourDetails);
                        // this.props.navigation.navigate('PaymentFunded');
                        this.setState({ visible: true });
                        this.props.paymentDetailsUpdation(response.data, this.props.navigation.state.params.tourDetails);
                    }
                }).catch(err => {
                    console.log({ ...err });
                    this.props.navigation.goBack();
                    Toast.show({
                        text: err.response.data.name,
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: 'danger',
                        duration: 5000
                    });
                });
        }
    }

    render() {
        const approvalUrl = this.state.approvalUrl ? this.state.approvalUrl : this.state.videoUrl;
        return (
            //  <SafeAreaView>
            //     <ScrollView style={styles.scrollContainer}>
            // <View>
            <View style={{ flex: 1 }}>
                {
                    approvalUrl ?
                        <WebView
                            style={{ height: 400, width: 300 }}
                            source={{ uri: approvalUrl }}
                            onNavigationStateChange={this.onNavigationStateChange}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            style={{ marginTop: 20 }}
                            onLoadStart={() => <ActivityIndicator />}
                        />
                        :
                        <ActivityIndicator />
                }
                <View>
                    {this.renderLoader()}
                </View>
            </View>

            /**
             *   <View style={styles.contractContainer}>
                        <View>
                            <Text style={styles.heading}>With Allarest,you only pay for work delivered</Text>
                        </View>
                        <View style={styles.selectButtonView}>
                            <TouchableOpacity style={styles.tochableButton}>
                                <Button style={!this.state.shows_btn ? styles.secondaryButton : styles.secondaryButtonWhite} onPress={this.onCardPress.bind(this)}>
                                    <Image
                                        source={Theme.Images.icons.billingIcon}
                                        style={styles.billingIcon}
                                    />
                                    <Text uppercase={false} style={styles.buttonTextSecondary}>Credit/Debit</Text>
                                </Button>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tochableButton}>
                                <Button style={this.state.shows_btn ? styles.secondaryButton : styles.secondaryButtonWhite} onPress={this.onPaypalPress.bind(this)}>
                                    <Image
                                        source={Theme.Images.icons.billingPaypal}
                                        style={styles.billingPaypal}
                                    />
                                    <Text uppercase={false} style={styles.buttonTextSecondary}>PayPal</Text>
                                </Button>
                            </TouchableOpacity>
                        </View>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <View style={styles.cardnumView}>
                                        <View style={styles.cardinfo}>
                                            <Label style={styles.labelStyle}>Card Number</Label>
                                            <Item style={styles.itemStyle}>
                                                <Input
                                                    keyboardType={'numeric'}
                                                    style={styles.inputHeight}
                                                    value={this.state.cardNumber}
                                                    onChangeText={(text) => this.setState({ cardNumber: text })}
                                                />
                                            </Item>
                                        </View>
                                        <Image
                                            source={Theme.Images.icons.cardnumIcon}
                                        />
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Label style={styles.labelStyle}>Cardholder Name</Label>
                                    <Item style={styles.itemStyle}>
                                        <Input
                                            style={styles.inputHeight}
                                            value={this.state.cardHolderName}
                                            onChangeText={(text) => this.setState({ cardHolderName: text })}
                                        />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                        <View style={styles.titleView}>
                            <Card style={styles.datecardView}>
                                <CardItem style={styles.cardStyle}>
                                    <Body>
                                        <Label style={styles.labelStyle}>Month</Label>
                                        <Item picker style={styles.pickerItem}>
                                            <Picker
                                                style={styles.pickerStyle}
                                                ref="month"
                                                mode="dropdown"
                                                placeholder="Select your SIM"
                                                placeholderStyle={{ color: '#bfc6ea' }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={this.state.month}
                                                onValueChange={this.onMonthChange.bind(this)}
                                            >
                                                {month.map((key) => (<Picker.Item label={key} key={key} value={key} />))}
                                            </Picker>
                                            <Icon style={styles.pickerIcon} name="chevron-down" />
                                        </Item>
                                        <View style={styles.pickerView}>
                                            <Text>May</Text>
                                            <Icon style={styles.pickerIcon} name="chevron-down" />
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={styles.datecardView}>
                                <CardItem style={styles.cardStyle}>
                                    <Body>
                                        <Label style={styles.labelStyle}>Year</Label>
                                        <Item picker style={styles.pickerItem}>
                                            <Picker
                                                style={styles.pickerStyle}
                                                ref="year"
                                                mode="dropdown"
                                                placeholder="Select Year"
                                                placeholderStyle={{ color: '#bfc6ea' }}
                                                placeholderIconColor="blue"
                                                selectedValue={this.state.year}
                                                onValueChange={this.onYearChange.bind(this)}
                                            >
                                                {year.map((keyValue) => (<Picker.Item label={keyValue} key={keyValue} value={keyValue} />))}
                                            </Picker>
                                            <Icon style={styles.pickerIcon} name="chevron-down" />
                                        </Item>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={styles.cardViewbudget}>
                                <CardItem style={styles.cardStyle}>
                                    <Body>
                                        <Label style={styles.labelStyle}>CVV</Label>
                                        <Item style={styles.itemStyle}>
                                            <Input
                                                keyboardType={'numeric'}
                                                style={styles.inputHeight}
                                                value={this.state.cvv}
                                                onChangeText={(text) => this.setState({ cvv: text })}
                                            />
                                        </Item>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={styles.continueBtn}>
                            <TouchableOpacity style={styles.tochableButton}>
                                <LinearGradientView style={AppStyles.primaryButton} name={'Continue'.toUpperCase()} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.plusIconView}>
                        <TouchableOpacity>
                            <Thumbnail style={styles.addIcon} source={Theme.Images.icons.addjobIocn} />
                        </TouchableOpacity>
                    </View> */
            //     </ScrollView>

            // </SafeAreaView >
        );
    }
}


export const mapStateToProps = (state) => {
    console.log(state, 'checkstateinDetailScreen');
    const { paymentUpdateLoader, paymentDone } = state.payments;
    return { paymentUpdateLoader, paymentDone };
};
export default connect(mapStateToProps, { paymentDetailsUpdation })(Billing);
