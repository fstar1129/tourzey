import firebase from 'react-native-firebase';
import axios from 'axios';
import { Toast } from 'native-base';
import { AccessTokenUrl, clientId, secretId, paymentIdUrl, clientidProd, secretidProd, AccessTokenUrlProd, paymentIdUrlProd } from '../utils/constants';
import {
    PAYPAL_PAYMENT_SUCCESS,
    PAYPAL_PAYMENT_FAIL,
    PAYPAL_PAYMENT,
    MILESTONE_UPDATE,
    MILESTONE_UPDATE_FAIL,
    MILESTONE_UPDATE_SUCCESS,
    PAYMENT_UPDATE,
    PAYMENT_UPDATE_FAIL,
    PAYMENT_UPDATE_SUCCESS
} from './types';
import { authService } from './services/authServices';

const db = firebase.firestore();

export const paypalPayment = (amount, tourData) => (dispatch) => {
    dispatch({ type: PAYPAL_PAYMENT });
    const dataDetail = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": amount,
                "currency": "USD",
                "details": {
                    "subtotal": amount,
                    "tax": "0",
                    "shipping": "0",
                    "handling_fee": "0",
                    "shipping_discount": "0",
                    "insurance": "0"
                }
            }

        }],
        "redirect_urls": {
            "return_url": "https://returnandcancel.com",
            "cancel_url": "https://returnandcancel.com"
        }
    };

    //todo-cr-si: naaziya : import URL from config file
    axios({
        method: 'post',
        url: AccessTokenUrl,
        auth: {
            // username: clientId,
            // password: secretId
            username: clientId,
            password: secretId
        }
    })
        .then((response) => {
            console.log('resp', response);
            const accessToken = response.data.access_token;
            axios.post(paymentIdUrl, dataDetail,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                .then(resp => {
                    const { id, links } = resp.data;
                    const approvalUri = links.find(data => data.rel === 'approval_url');

                    const paymentId = id;
                    const approvalUrl = approvalUri.href;
                    dispatch({ type: PAYPAL_PAYMENT_SUCCESS, payload: { success: true, approvalUrl, accessToken, paymentId } });
                })
                .catch(err => {
                    console.log({ ...err });
                    Toast.show({
                        text: 'Cannot complete payment at this moment!',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000,
                        type: 'danger'
                    });
                    dispatch({ type: PAYPAL_PAYMENT_FAIL, payload: { success: false } });
                });
        }).catch(err => {
            console.log({ ...err });
            Toast.show({
                text: 'Cannot complete payment at this moment!',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000,
                type: 'danger'
            });
            dispatch({ type: PAYPAL_PAYMENT_FAIL, payload: { success: false } });
        });
};

//Todo-cr-mi by Punitha @Jaga: variable name should be unique (data-> which data)
export const milestone = (jobdata, data) => (dispatch) => {
    dispatch({ type: MILESTONE_UPDATE });
    let name = '';
    db.collection('jobs')
        .doc(jobdata.jobIdValue)
        .get()
        .then((doc) => {
            let milestones = [];
            console.log(doc, doc.data(), 'milestone');
            if (doc.data().milestone && doc.data().milestone.length > 0) {
                milestones = doc.data().milestone;
            }
            milestones.push(data);
            db.collection('jobs')
                .doc(jobdata.jobIdValue)
                .update({ milestone: milestones })
                .then(() => {
                    if (jobdata.offerId) {
                        name = 'offer';
                        db.collection('offers')
                            .doc(jobdata.offerId)
                            .update({ milestone: milestones })
                            .then(() => {
                                dispatch({ type: MILESTONE_UPDATE_SUCCESS, payload: true, name });
                                Toast.show({
                                    text: 'Payment added successfully',
                                    position: 'bottom',
                                    buttonText: 'Okay',
                                    duration: 5000,
                                    type: 'success',
                                });
                            })
                            .catch((err) => {
                                console.log(err, 'err1');
                                dispatch({ type: MILESTONE_UPDATE_FAIL, payload: false, name });
                                Toast.show({
                                    text: 'Payment adding failed',
                                    position: 'bottom',
                                    buttonText: 'Okay',
                                    duration: 5000,
                                    type: 'danger',
                                });
                            });
                    } else {
                        name = 'contract';
                        dispatch({ type: MILESTONE_UPDATE_SUCCESS, payload: true, name });
                        Toast.show({
                            text: 'Payment added successfully',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            type: 'success',
                        });
                    }
                })
                .catch((err) => {
                    console.log(err, 'err2');
                    dispatch({ type: MILESTONE_UPDATE_FAIL, payload: false, name });
                    Toast.show({
                        text: 'Payment adding failed',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000,
                        type: 'danger',
                    });
                });
        })
        .catch((err) => {
            console.log(err, 'err3');
            dispatch({ type: MILESTONE_UPDATE_FAIL, payload: false, name });
            Toast.show({
                text: 'Payment adding failed',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000,
                type: 'danger',
            });
        });
};

export const paymentDetailsUpdation = (details, reqData) => (dispatch) => {
    console.log('paymentDetailsUpdation reqData', reqData);
    dispatch({ type: PAYMENT_UPDATE });
    authService.getCurrentuserToken(reqData.userId)
        .then((guideDetails) => {
            console.log('paymentDetailsUpdation guide', guideDetails);
            db.collection('payments')
                .add({
                    details
                })
                .then((data) => {
                    db.collection('requestTour')
                        .doc(reqData.requestTourId)
                        .update({
                            paymentId: data.id,
                            paymentStatus: true
                        })
                        .then((updated) => {
                            console.log('paymentDetailsUpdation notification', reqData, guideDetails.setting, guideDetails.setting.notification, guideDetails.userId);
                            if (guideDetails.pushToken && guideDetails.setting.notification === true) {
                                authService.paymentNotify(reqData.tourId,
                                    guideDetails.pushToken, guideDetails.email, guideDetails.userId);
                            }
                            dispatch({ type: PAYMENT_UPDATE_SUCCESS });
                            console.log('updated', updated);
                            Toast.show({
                                text: 'Payment success!',
                                position: 'bottom',
                                buttonText: 'Okay',
                                type: 'success',
                                duration: 5000
                            });
                        })
                        .catch((err) => {
                            console.log('err', err);
                            dispatch({ type: PAYMENT_UPDATE_FAIL });
                        });
                })
                .catch((err) => {
                    console.log('err', err);
                    dispatch({ type: PAYMENT_UPDATE_FAIL });
                });
        });
};

