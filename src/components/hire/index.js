import React, { Component } from 'react';
import {
    View, Card, CardItem, Text,
    Body, Item, Label, Textarea, Input, Button
} from 'native-base';
import { ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import styles from './styles';
import {
    updateJobDetails, paypalPayment
} from '../../action/index';

class Hire extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Hire',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
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
            message: '',
            price: '',
            agentId: '',
            jobId: '',
            visible: false
        };
    }

    componentWillMount() {
        this.setState({
            agentId: this.props.navigation.state.params.agentId,
            jobId: this.props.navigation.state.params.jobId
        });
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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'np');
        //todo-cr-si: pavi @ jana - use nextProps is present or not - completed
        if (nextProps) {
        if (nextProps.updateDetails !== this.props.updateDetails) {
            this.props.navigation.navigate('PaymentFunded', { jobId: this.state.jobId, screen: 'jobs' });
            // todo-cr-mi: pavi @jana - remove unused code
        }
        if (nextProps.paypalPaymentData) {
            this.setState({ visible: nextProps.paymentLoader });
            if (nextProps.paypalPaymentData !== this.props.paypalPaymentData) {
            console.log(nextProps.paypalPayment, 'pp');
            this.props.navigation.navigate('Billing', { accessToken: nextProps.paypalPaymentData.accessToken,
                approvalUrl: nextProps.paypalPaymentData.approvalUrl,
                paymentId: nextProps.paypalPaymentData.paymentId });
        }
      }
     }
    }

    onCancelPress() {
        this.props.navigation.goBack();
    }

    onFundPress() {
        Alert.alert(
            'Confirm',
            'Are you sure you want to fund this agent?',
            [
                {
                    text: 'Ok', onPress: () => { this.onConfirmPress(); }
                },
                { text: 'Cancel', style: 'cancel' }
            ],
            { cancelable: false }
        );
    }

    onConfirmPress() {
        const { message, price, agentId, jobId } = this.state;
        console.log('onConfirmPress', message, price, agentId, jobId);
        const obj = {
            agentId,
            message,
            fund: price
        };
        this.props.paypalPayment(price);
        //  this.props.updateJobDetails(agentId, jobId, obj);
    }

    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView>
             <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.profileContainer}>                    
                    <Label style={AppStyles.labelStyle}>By funding this tour and hiring the guide you are ready to begin. Funds are held securely in escrow until your tour is completed and approved</Label>
                    <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>            
                                <Body>
                                    <Label style={styles.labelStyle}>Price</Label>
                                    <Item style={styles.itemStyle}>
                                        <Text style={styles.symbol}>$</Text>
                                        <Input
                                            placeholderTextColor="#dcdcdc"
                                            placeholder="400"
                                            style={styles.priceStyle}
                                            value={this.state.price}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.setState({ price: text })}
                                        />
                                    </Item>
                                </Body>
                            </CardItem>
                    </Card>
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                            <Label style={styles.labelStyle}>Message</Label>
                                <Item style={styles.itemStyle}>
                                    <Textarea
                                        placeholderTextColor="#dcdcdc" 
                                        placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                                        totam rem aperiam, eaque ipsa quea ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                                        style={styles.textareaStyle}
                                        value={this.state.message}
                                        onChangeText={(text) => this.setState({ message: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <View style={styles.buttonView}>
                                <TouchableOpacity style={AppStyles.tochableButton}>
                                    <Button style={AppStyles.secondaryButtonWhite} onPress={this.onCancelPress.bind(this)}>
                                        <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Cancel</Text>
                                    </Button>
                                </TouchableOpacity>
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onFundPress.bind(this)} >
                                    <LinearGradientView style={AppStyles.primaryButton} name={'Fund'} />
                                </TouchableOpacity>
                            </View>
                </View>
            </ScrollView> 
            {this.renderLoader()}
            </SafeAreaView> 
        );
    }

}

export const mapStateToProps = (status) => {
    console.log(status);
    const { update, updateDetails, loading } = status.getJobDetails;
    const { userData } = status.getuserData;
    const { paymentLoader, paypalPaymentData } = status.payments;
    return {
        update,
        updateDetails,
        loading,
        userData,
        paymentLoader,
        paypalPaymentData
    };
};

export default connect(mapStateToProps,
    {
        updateJobDetails, paypalPayment
    })(Hire);
