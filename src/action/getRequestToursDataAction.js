import firebase from 'react-native-firebase';
import _ from 'lodash';
import {
    GET_REQUEST_TOUR_DATA,
    GET_REQUEST_TOUR_DATA_SUCCESS,
    GET_REQUEST_TOUR_DATA_FAIL,
    GET_REQUEST_TOUR_DETAIL,
    GET_REQUEST_TOUR_DETAIL_SUCCESS,
    GET_REQUEST_TOUR_DETAIL_FAIL,

} from './types';

const db = firebase.firestore();

export const getRequestToursData = () => (dispatch) => {
    dispatch({ type: GET_REQUEST_TOUR_DATA });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        console.log('getRequestToursData');
        db.collection('requestTour')
            .where('tourRequestedById', '==', currentUser.uid)
            .where('tourComplete', '==', false)
            .get()
            .then((data) => {
                const requestTourData = [];
                console.log('getToursData', data);
                if (data.size > 0) {
                    data.forEach((doc) => {
                        db.collection('tours').doc(doc.data().tourId)
                            .get()
                            .then((value) => {
                                console.log('tours', value, value.data());
                                db.collection('users')
                                    .where('uid', '==', value.data().userId)
                                    .get()
                                    .then((userDetail) => {
                                        console.log('userDetail', userDetail, userDetail._docs[0]._data, userDetail._docs[0].data());
                                        const {
                                            address,
                                            agentLicense,
                                            blockedByClient,
                                            brokerName,
                                            brokerageLicense,
                                            brokerageName,
                                            certificationStatus,
                                            certified,
                                            description,
                                            documents,
                                            documentsSubmitted,
                                            deleteStatus,
                                            email,
                                            experience,
                                            fbData,
                                            fullName,
                                            gallery,
                                            id,
                                            imageData,
                                            isfacebooklogin,
                                            jobId,
                                            languages,
                                            phone,
                                            pushToken,
                                            ratingCount,
                                            reason,
                                            role,
                                            serviceArea,
                                            setting,
                                            uid,
                                        } = userDetail._docs[0].data();
                                        const {
                                            approvedClients,
                                            averageRatingCount,
                                            postedBy,
                                            requestedClients,
                                            tourDesc,
                                            tourLocation,
                                            tourService,
                                            uniqueId,
                                            userId,
                                            deleteTourStatus,
                                            adminApproval,
                                            transportFacility,
                                            lodgeFacility
                                        } = value.data();
                                        const {
                                            count,
                                            createdAt,
                                            tourId,
                                            tourImageUrl,
                                            tourName,
                                            tourPostedById,
                                            tourPrice,
                                            tourRequestedById,
                                            tourRequestedName,
                                            tourApprovalStatus,
                                            tourDate,
                                            tourTime,
                                            tourComplete,
                                            paymentId,
                                            paymentStatus
                                        } = doc.data();
                                        const obj = {
                                            count,
                                            createdAt,
                                            tourId,
                                            tourImageUrl,
                                            tourName,
                                            tourPostedById,
                                            tourPrice,
                                            tourRequestedById,
                                            tourRequestedName,
                                            tourApprovalStatus,
                                            tourDate,
                                            tourTime,
                                            tourComplete,
                                            paymentId,
                                            paymentStatus,
                                            requestTourId: doc.id,
                                            approvedClients,
                                            averageRatingCount,
                                            tourCreatedAt: value.data().createdAt,
                                            postedBy,
                                            requestedClients,
                                            tourDesc,
                                            tourLocation,
                                            tourService,
                                            uniqueId,
                                            userId,
                                            adminApproval,
                                            deleteTourStatus,
                                            address,
                                            agentLicense,
                                            blockedByClient,
                                            brokerName,
                                            brokerageLicense,
                                            brokerageName,
                                            certificationStatus,
                                            certified,
                                            description,
                                            documents,
                                            documentsSubmitted,
                                            deleteStatus,
                                            email,
                                            experience,
                                            fbData,
                                            fullName,
                                            gallery,
                                            id,
                                            imageData,
                                            isfacebooklogin,
                                            jobId,
                                            languages,
                                            phone,
                                            pushToken,
                                            ratingCount,
                                            reason,
                                            role,
                                            serviceArea,
                                            setting,
                                            uid,
                                            transportFacility,
                                            lodgeFacility
                                        };
                                        if (deleteStatus === undefined) {
                                            if (deleteTourStatus === true) {
                                                requestTourData.push({});
                                            } else if (adminApproval === 'approved') {
                                                console.log('approved obj', obj);
                                                requestTourData.push(obj);
                                            } else {
                                                requestTourData.push({});
                                            }
                                        } else {
                                            requestTourData.push({});
                                        }
                                        console.log('requestTourData', requestTourData, requestTourData.length);
                                        if (data.size === requestTourData.length) {
                                            const requestTour = requestTourData.filter(val => Object.keys(val).length !== 0);
                                            const temp = _.orderBy(requestTour, ['createdAt'], ['desc']);
                                            console.log(temp, 'checking Temp data');
                                            dispatch({
                                                type: GET_REQUEST_TOUR_DATA_SUCCESS,
                                                payload: temp,
                                            });
                                        }
                                    })
                                    .catch((err) => {
                                        console.log('error', err);
                                        dispatch({
                                            type: GET_REQUEST_TOUR_DATA_FAIL,
                                            payload: [],
                                        });
                                    });
                            })
                            .catch((err) => {
                                console.log('error', err);
                                dispatch({
                                    type: GET_REQUEST_TOUR_DATA_FAIL,
                                    payload: [],
                                });
                            });
                    });
                } else {
                    dispatch({
                        type: GET_REQUEST_TOUR_DATA_FAIL,
                        payload: requestTourData,
                    });
                }
            })
            .catch((err) => {
                console.log('error', err);
                dispatch({
                    type: GET_REQUEST_TOUR_DATA_FAIL,
                    payload: err,
                });
            });
    }
};


export const getRequestTourDetail = (obj) => (dispatch) => {
    console.log('getRequestTourDetail', obj);
    const { requestedClients, tourId } = obj;
    dispatch({ type: GET_REQUEST_TOUR_DETAIL });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        requestedClients.map((item, key) => {
            console.log('getRequestTourDetail item', item);
            db.collection('requestTour')
                .where('tourRequestedById', '==', currentUser.uid)
                .where('tourId', '==', tourId)
                .where('tourComplete', '==', false)
                // .where('requestDocId', '==', item.requestedDocId)
                .get()
                .then((data) => {
                    console.log('getRequestTourDetail data', data);
                    if (data.size > 0) {
                        data.forEach((doc) => {
                            console.log('getRequestTourDetail doc', doc);
                            if (doc.data().tourApprovalStatus === 'Pending' ||
                                (doc.data().tourApprovalStatus === 'Approved')) {
                                console.log('if...first', doc.data());
                                dispatch({
                                    type: GET_REQUEST_TOUR_DETAIL_SUCCESS,
                                    status: 'Disabled',
                                    payload: doc.data()
                                });
                            }
                            if (doc.data().tourApprovalStatus === 'Rejected') {
                                console.log('if...second', doc.data());
                                dispatch({
                                    type: GET_REQUEST_TOUR_DETAIL_SUCCESS,
                                    status: 'Enabled',
                                    payload: {}
                                });
                            }
                        });
                    } else {
                        dispatch({
                            type: GET_REQUEST_TOUR_DETAIL_FAIL,
                            status: 'Enabled',
                        });
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: GET_REQUEST_TOUR_DETAIL_FAIL,
                        status: error,
                    });
                });
        });
    }
};

