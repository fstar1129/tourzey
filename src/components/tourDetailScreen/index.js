import React, { Component } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Button, Text, Label, Toast }
    from 'native-base';
    import stripe from 'tipsi-stripe';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import StarRating from 'react-native-star-rating';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import { getTourDetail, getGuideDetail, completeTour, paypalPayment } from '../../action/index.js';
import { isObjectEmpty, isStringEmpty } from '../../utils/checkEmptycondition';
import Theme from '../../themes/Theme';

let totalAmount = 0;
class TourDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Tour Details',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.default,
            fontSize: Theme.Font.sizes.medium,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
    });
    constructor(props) {
        super(props);
        this.state = {
            tourInfo: {},
            instructions: '',
            allTourDetails: {},
            tourCategory: '',
            profileStatus: false,
            loader: false
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
        // Todocr si @srini punitha - check also tourInfo is empty or not -> completed
        if (isObjectEmpty(this.props.navigation.state.params) &&
            isObjectEmpty(this.props.navigation.state.params.tourInfo)) {
            this.setState({
                tourInfo: this.props.navigation.state.params.tourInfo,
                tourCategory: this.props.navigation.state.params.tourCategory,
            }, () => {
                console.log(this.state.tourInfo, 'tourInfo');
                this.props.getTourDetail(this.state.tourInfo.tourId);
            });
        } else {
            console.log('Data unavialble');
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log('NextProps in Details screen', nextProps);
        if (nextProps && nextProps.paypalPayment) {
            this.setState({ visible: nextProps.paymentLoader });
        }

        if (nextProps && nextProps.tourData) {
            this.setState({
                allTourDetails: nextProps.tourData
            }, () => {
                console.log(this.state.allTourDetails, 'all data');
            });
            this.setState({ visible: nextProps.tourLoader });
        }

        if (this.props.guideDetail !== nextProps.guideDetail) {
            if (nextProps && nextProps.guideDetail) {
                this.setState({
                    guideDetail: nextProps.guideDetail
                },
                    () => {
                        if (isObjectEmpty(this.state.guideDetail) && this.state.profileStatus === true) {
                            this.props.navigation.navigate('GuideProfile', { data: this.state.guideDetail });
                        }
                    });
            }
        }
        
        if (nextProps.paypalPaymentData !== this.props.paypalPaymentData) {
            if (nextProps && nextProps.paypalPaymentData) {
                this.setState({ visible: nextProps.paymentLoader });
                console.log('getttttt', this.state.allTourDetails, this.state.tourInfo, this.state.allTourDetails === {} ? 'yes' : 'no');
                if (nextProps.paypalPaymentData.success) {
                    this.props.navigation.navigate('Billing', {
                        accessToken: nextProps.paypalPaymentData.accessToken,
                        approvalUrl: nextProps.paypalPaymentData.approvalUrl,
                        paymentId: nextProps.paypalPaymentData.paymentId,
                        tourDetails: this.state.allTourDetails.requestTourId ? this.state.allTourDetails : this.state.tourInfo
                    }
                    );
                }
            }
        }
        if (nextProps.complete !== this.props.complete) {
            console.log('NextProps in completeStatus', nextProps.complete);
            if (nextProps.completeStatus === 'Completed') {
                this.props.navigation.navigate('Tours');
            }
        }

    }

    onTourComplete(type) {
        if (type === 'Complete') {
            // Todocr si @srini punitha - Use common seperate from util for alert
            Alert.alert(
                'Confirmation',
                'Are you sure you want to complete this tour ?',
                [
                    {
                        text: 'ok', onPress: () => { this.onCompletePress(); }
                    },
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: false }
            );
        } else if (type === 'Payment') {
            Alert.alert(
                'Confirmation',
                'Are you sure you want to complete payment for this tour ?',
                [
                    {
                        text: 'ok', onPress: () => { this.onPayPress(); }
                    },
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: false }
            );
        }
    }
    onCompletePress() {
        console.log('onCompletePress', this.state.allTourDetails, this.state.tourInfo);
        const { allTourDetails, tourInfo } = this.state;
        if (isObjectEmpty(allTourDetails) && isObjectEmpty(tourInfo) && isStringEmpty(this.props.userData.uid)) {
            const obj = {
                requestTourId: tourInfo.requestTourId,
                approvedClients: allTourDetails.approvedClients,
                uid: this.props.userData.uid,
                tourId: tourInfo.tourId,
                tourName: allTourDetails.tourName,
                guideId: tourInfo.userId
            };
            this.props.completeTour(obj);
        }
    }

    handleCardPayPress = async () => {
        console.log('nrewwwww');
        try {
            this.setState({ loading: true, token: null });
            const token = await stripe.paymentRequestWithCardForm({
              // Only iOS support this options
              smsAutofillDisabled: true,
              requiredBillingAddressFields: 'full',
              prefilledInformation: {
                billingAddress: {
                  name: this.props.userData.fullName,
                  line1: this.props.userData.location,
                  line2: this.props.userData.location,
                  city: this.props.userData.location,
                  state: this.props.userData.location,
                  country: this.props.userData.location,
                  postalCode: this.props.userData.location,
                  email: this.props.userData.email,
                },
              },
            });
            console.log('fadf', token);
             this.setState({ loader: true });
        //       axios({
        //       method: 'post',
        //       url: 'https://us-central1-tourzey-dev.cloudfunctions.net/charge',
        //       data: {
        //           token: token.tokenId,
        //           charge: {
        //               amount: parseInt(this.state.tourInfo.tourPrice),
        //               currency: 'usd'
        //           },
        //           message: this.state.tourInfo.tourName
        //       },
        //       headers: {}
        //   }).then((res) => {
        //       console.log(res, JSON.parse(res.data.body), 'responseee');
        //       const response = JSON.parse(res.data.body);
        //       this.setState({ loader: false });
        //       if (response.message === 'Success') {
        //       this.props.navigation.navigate('Billing', { paymentData: response, tourDetails: this.state.tourInfo, approvalUrl: response.charge.receipt_url });
        //       }
        //   }).catch((err) => {
        //       console.log(err, 'errrr');
        //       this.setState({ loader: false });
        //       Toast.show({
        //           text: 'Cannot complete payment at this moment!',
        //           position: 'bottom',
        //           buttonText: 'Okay',
        //           duration: 5000,
        //           type: 'danger'
        //       });
        //   });
          } catch (error) {
              console.log('err', error);
            this.setState({ loader: false });
             Toast.show({
              text: 'Cannot complete payment at this moment!',
              position: 'bottom',
              buttonText: 'Okay',
              duration: 5000,
              type: 'danger'
          });
          }
        }

    onPayPress() {
        // Todocr si by srini @punitha - check tourId -> completed
        // if (tourId) {
        // this.props.completeTour(tourId);
        this.props.paypalPayment(totalAmount, this.state.tourInfo);
        // }
        // const {
        //     nonce,
        //     payerId,
        //     email,
        //     firstName,
        //     lastName,
        //     phone
        // } = requestOneTimePayment(
        //   'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSjkuZXlKbGVIQWlPakUxTmpFMU5qUXdOak1zSW1wMGFTSTZJakl5WW1KaE1qaG1MVFJsWXpRdE5ETXhaUzA1T0dRekxUZzNaR0ZqT1dNNE1Ea3lNQ0lzSW5OMVlpSTZJak0wT0hCck9XTm5aak5pWjNsM01tSWlMQ0pwYzNNaU9pSkJkWFJvZVNJc0ltMWxjbU5vWVc1MElqcDdJbkIxWW14cFkxOXBaQ0k2SWpNME9IQnJPV05uWmpOaVozbDNNbUlpTENKMlpYSnBabmxmWTJGeVpGOWllVjlrWldaaGRXeDBJanBtWVd4elpYMHNJbkpwWjJoMGN5STZXeUp0WVc1aFoyVmZkbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LlcycUFmbmlkYUxtWE5JVFktaDJkbC1GdnNSNVBNY3BpM2xCUWxVeXVIelA5dXN3NlowTXpZMkxFMkh1VWQtWVA2RGU5d09VaGx2V2t3dVFkZFgzcE9nIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4In0sImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS8zNDhwazljZ2YzYmd5dzJiIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInBheXBhbEVuYWJsZWQiOnRydWUsInBheXBhbCI6eyJkaXNwbGF5TmFtZSI6IkFjbWUgV2lkZ2V0cywgTHRkLiAoU2FuZGJveCkiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJhY21ld2lkZ2V0c2x0ZHNhbmRib3giLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwibWVyY2hhbnRJZCI6IjM0OHBrOWNnZjNiZ3l3MmIiLCJ2ZW5tbyI6Im9mZiJ9',
        //   {
        //     amount: '5', // required
        //     // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
        //     currency: 'GBP',
        //     // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
        //     localeCode: 'en_GB', 
        //     shippingAddressRequired: false,
        //     userAction: 'commit', // display 'Pay Now' on the PayPal review page
        //     // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
        //     intent: 'authorize', 
        //   }
        // );
        // );
    }

    ratingScreen() {
        if (this.state.allTourDetails.tourId) {
            this.props.navigation.navigate('RateAndReview', { tourId: this.state.allTourDetails.tourId,
                 approveDocId: this.state.tourInfo.approveDocId, 
                 tourApprovedById: this.state.tourInfo.tourApprovedById });
        }
    }
    guideProfile() {
        if (isObjectEmpty(this.state.allTourDetails)) {
            this.props.getGuideDetail(this.state.allTourDetails.userId);
            this.setState({
                profileStatus: true
            });
        }
    }

    renderLoader() {
        if (this.props.tourLoader || this.props.completeLoader || this.props.paymentLoader || this.props.guideLoader || this.state.loader) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
        this.state.visible = false;
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
            </View>
        );
    }
    render() {
        const tourInfo = this.state.tourInfo;
        const { allTourDetails } = this.state;
        totalAmount = (tourInfo.tourPrice && tourInfo.count) ? parseInt(tourInfo.tourPrice) * parseInt(tourInfo.count) : parseInt(tourInfo.tourPrice);

        console.log(tourInfo, allTourDetails, 'checkTourinfo');
        // console.log(parseInt(tourInfo.tourPrice), tourInfo.count ? tourInfo.count : 'l', parseInt(tourInfo.count), 'checkTourinfo2');
        // console.log(allTourDetails.tourApprovalStatus, allTourDetails, 'checkTourinfo');

        return (
            <View style={styles.viewStyle}>
                <ScrollView>
                    <View style={styles.mainConatiner}>
                        {/* <View>
                            <Image
                                source={{ uri: allTourDetails.tourImageUrl }}
                                style={styles.tourImageStyle}
                            />
                        </View> */}
                        <View style={styles.tourDetail}>
                            <Text style={styles.tourName}>{tourInfo.tourName ? tourInfo.tourName : '-'}</Text>
                            <Text style={styles.tourPrice}>${allTourDetails.tourPrice ? parseInt(allTourDetails.tourPrice * parseInt(tourInfo.count)) : parseInt(allTourDetails.tourPrice)}</Text>
                        </View>
                        <View style={styles.container}>
                            <View>
                                <Label style={styles.labelStyle}>Description</Label>
                                <Text style={styles.textStyle}>{allTourDetails.tourDesc ? allTourDetails.tourDesc : ''}</Text>
                            </View>
                            <View style={styles.lineStyle} />
                            <View>
                                <Label style={styles.labelStyle}>Address</Label>
                                <Text style={styles.textStyle}>{allTourDetails.tourLocation ? allTourDetails.tourLocation : '-'}</Text>
                            </View>
                            <View style={styles.lineStyle} />
                            <View>
                                <Label style={styles.labelStyle}>Date and Time</Label>
                                {/* date and time is static */}
                                <Text style={styles.textStyle}>{tourInfo.tourDate ? tourInfo.tourDate : '-'} {'&'} {tourInfo.tourTime ? tourInfo.tourTime : '-'}</Text>
                            </View>
                            <View style={styles.lineStyle} />
                        </View>
                        <View style={styles.nameViewStyle}>
                            <Text>{tourInfo.tourRequestedName ? tourInfo.tourRequestedName : '-'}</Text>
                            <View style={styles.tourPriceView}>
                                <Text style={styles.tourCount}>{tourInfo.count ? tourInfo.count : '-'}<Text>X</Text></Text>
                                <Text style={styles.price}>${allTourDetails.tourPrice ? parseInt(allTourDetails.tourPrice) : '-'}</Text>
                            </View>
                        </View>
                        <View>
                            <Button light onPress={this.guideProfile.bind(this)}>
                                <Text>Guide Profile</Text>
                            </Button>
                        </View>
                        {tourInfo.tourComplete === true ?
                            tourInfo.ratebyClient === true ?
                                <View style={styles.nameView}>
                                    <View style={styles.starCountview}>
                                        <StarRating
                                            halfStarEnabled
                                            disabled
                                            maxStars={5}
                                            rating={tourInfo.tourRating ? tourInfo.tourRating : 0}
                                            starSize={20}
                                            fullStarColor={'#f2b518'}
                                            starStyle={styles.starSpacing}
                                        />
                                    </View>
                                    <Text style={styles.starCounttext}>{tourInfo.tourRating}</Text>
                                </View>
                                :
                                <View style={styles.rateReviewView}>
                                <Button light onPress={this.ratingScreen.bind(this)}>
                                    <Text>Rate and Review</Text>
                                </Button>
                                </View>
                            :
                            null
                        }
                        {tourInfo.tourApprovalStatus === 'Approved' && tourInfo.tourComplete === false && tourInfo.paymentStatus === true ?
                            <View>
                                <View style={styles.buttonView}>
                                    <TouchableOpacity style={AppStyles.tochableButton}>
                                        <Button
                                            style={AppStyles.secondaryButtonWhite}
                                            onPress={() => this.onTourComplete('Complete')}
                                        >
                                            <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Complete</Text>
                                        </Button>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            tourInfo.tourComplete === true &&
                            <View>
                                <Text style={styles.tag}>Tour Completed</Text>
                            </View>
                        }
                         {tourInfo.tourApprovalStatus === 'Approved' && tourInfo.tourComplete === false && !tourInfo.paymentStatus ?
                            <View>
                                <View style={styles.buttonView}>
                                    <TouchableOpacity style={AppStyles.tochableButton}>
                                        <Button
                                            style={AppStyles.secondaryButtonWhite}
                                            onPress={() => this.onTourComplete('Payment')}
                                        >
                                            <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Pay Now</Text>
                                        </Button>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        : null
                        }
                        {this.renderLoader()}
                    </View>
                </ScrollView>
            </View>

        );
    }

}

export const mapStateToProps = (state) => {
    console.log(state, 'checkstateinDetailScreen');
    const { tourData, tourLoader, error } = state.tourDetails;
    const {
        guideDetail,
        guideLoader,

    } = state.guideDetail;
    const { userData } = state.getuserData;
    const { complete, completeLoader, completeStatus } = state.completeTour;
    const { paymentLoader, paypalPaymentData, paymentUpdateLoader } = state.payments;
    return {
        userData,
        tourData,
        tourLoader,
        error,
        complete,
        completeLoader,
        completeStatus,
        paymentLoader,
        paypalPaymentData,
        paymentUpdateLoader,
        guideDetail,
        guideLoader,
    };
};
export default connect(mapStateToProps, { getTourDetail, completeTour, getGuideDetail, paypalPayment })(TourDetailScreen);
