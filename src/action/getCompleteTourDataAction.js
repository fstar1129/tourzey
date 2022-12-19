import firebase from 'react-native-firebase';
import _ from 'lodash';
import {
    GET_COMPLETE_TOUR_DATA,
    GET_COMPLETE_TOUR_DATA_SUCCESS,
    GET_COMPLETE_TOUR_DATA_FAIL
} from './types';
import { getData } from './checkdataAction';

const db = firebase.firestore();

// export const getCompleteToursData = () => (dispatch) => {
//     dispatch({ type: GET_COMPLETE_TOUR_DATA });
//     const currentUser = firebase.auth().currentUser;
//     if (currentUser !== null) {
//         console.log('getCompleteToursData');
//         db.collection('tours')
//             .where('tourComplete', '==', true)
//             .where('contract', '==', true)
//             .get()
//             .then((data) => {
//                 const completeTourData = [];
//                 if (data.size > 0) {
//                     let obj = {};
//                     data.forEach((doc) => {
//                         db.collection('requestTour')
//                             .where('tourId', '==', tourId)
//                             .where('tourRequestedById', '==', currentUser.uid)
//                             .get()
//                             .then((data) => {
//                                 console.log(data, 'DocData');
//                                 data.forEach((val, key) => {
//                                     const {
//                                         tourDate,
//                                         tourTime,
//                                     } = val.data();
//                                     const {
//                                         contractDetails,
//                                         createdAt,
//                                         hiredClient,
//                                         postedBy,
//                                         tourDesc,
//                                         tourLocation,
//                                         tourName,
//                                         tourPrice,
//                                         tourService,
//                                         tourImageUrl,
//                                         userId,
//                                         uniqueId
//                                     } = doc.data();
//                                     getData.allContracts()
//                                         .then((contracts) => {
//                                             obj = {
//                                                 contractDetails: contracts ? contracts : [],
//                                                 createdAt,
//                                                 hiredClient,
//                                                 postedBy,
//                                                 tourDesc,
//                                                 tourLocation,
//                                                 tourName,
//                                                 tourPrice,
//                                                 tourService,
//                                                 tourImageUrl,
//                                                 userId,
//                                                 tourDate,
//                                                 tourTime,
//                                                 uniqueId,
//                                                 tourId: doc.id
//                                             };
//                                             console.log('obj', obj);
//                                             if (_.includes(contractDetails, currentUser.uid)) {
//                                                 completeTourData.push(obj);
//                                             } else {
//                                                 completeTourData.push({});
//                                             }
//                                         })
//                                         .catch((error) => {
//                                             dispatch({
//                                                 type: FETCH_TOUR_DETAILS_FAIL,
//                                                 payload: error,
//                                             });
//                                         });
//                                     console.log('completeTourData', completeTourData);
//                                     if (data.size === completeTourData.length) {
//                                         const completeData = completeTourData.filter(val => Object.keys(val).length !== 0);
//                                         const temp = _.orderBy(completeData, ['createdAt'], ['desc']);
//                                         dispatch({
//                                             type: GET_COMPLETE_TOUR_DATA_SUCCESS,
//                                             payload: temp,
//                                         });
//                                     }
//                                 });
//                             });
//                     })
//                         .catch((error) => {
//                             dispatch({
//                                 type: FETCH_TOUR_DETAILS_FAIL,
//                                 payload: error,
//                             });
//                         });
//                 } else {
//                     dispatch({
//                         type: GET_COMPLETE_TOUR_DATA_FAIL,
//                         payload: completeTourData,
//                     });
//                 }
//             })
//             .catch((err) => {
//                 console.log('error', err);
//                 dispatch({
//                     type: GET_COMPLETE_TOUR_DATA_FAIL,
//                     payload: err,
//                 });
//             });
//     }
// };

export const getCompleteToursData = () => (dispatch) => {
    dispatch({ type: GET_COMPLETE_TOUR_DATA });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        console.log('getCompleteToursData');
        db.collection('contracts')
            .where('approvedClientId', '==', currentUser.uid)
            .where('tourComplete', '==', true)
            .get()
            .then((data) => {
                const completeTourData = [];
                console.log('completeTourData', data);
                if (data.size > 0) {
                    data.forEach(async (doc) => {
                        console.log('doc', doc.id, doc.data());
                        const {
                            approveDocId,
                            approvedClientId,
                            ratebyClient,
                            specialInstructions,
                            tourApprovedById,
                            tourComplete,
                            tourId,
                            tourPostedById,
                            tourRating,
                            tourReview,
                            requestDocId,
                            supportTourdesc,
                            completedAt
                        } = doc.data();

                        await fetchRequestTourData(requestDocId, currentUser)
                            .then(async (result) => {
                                console.log('result', result);
                                const {
                                    count,
                                    tourRequestedById,
                                    tourRequestedName,
                                    tourApprovalStatus,
                                    tourDate,
                                    tourTime,
                                    requestTourId,
                                    paymentId,
                                    paymentStatus
                                } = result;
                                await fetchTourData(doc.data().tourId, currentUser)
                                    .then(async (tourDetail) => {
                                        console.log('tourDetail', tourDetail);
                                        const {
                                            tourName,
                                            tourImageUrl,
                                            tourPrice,
                                            tourDesc,
                                            tourService,
                                            uniqueId,
                                            requestedClients,
                                            approvedClients,
                                            createdAt,
                                            userId,
                                            adminApproval,
                                            deleteTourStatus
                                        } = tourDetail;
                                        await db.collection('users')
                                            .where('uid', '==', userId)
                                            .get()
                                            .then((userDetail) => {
                                                console.log('userDetail', userDetail, userDetail._docs[0].data());
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
                                                const obj = {
                                                    count,
                                                    requestCreatedAt: result.createdAt,
                                                    tourRequestedById,
                                                    tourRequestedName,
                                                    tourApprovalStatus,
                                                    tourDate,
                                                    tourTime,
                                                    requestTourId,
                                                    approveDocId,
                                                    approvedClientId,
                                                    ratebyClient,
                                                    specialInstructions,
                                                    tourApprovedById,
                                                    tourComplete,
                                                    tourId,
                                                    tourPostedById,
                                                    tourRating,
                                                    tourReview,
                                                    tourName,
                                                    tourImageUrl,
                                                    tourPrice,
                                                    tourDesc,
                                                    tourService,
                                                    uniqueId,
                                                    requestedClients,
                                                    approvedClients,
                                                    createdAt,
                                                    paymentId,
                                                    paymentStatus,
                                                    supportTourdesc,
                                                    completedAt,
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
                                                };
                                                if (deleteStatus === undefined) {
                                                    if (deleteTourStatus === true) {
                                                        completeTourData.push({});
                                                    } else if (adminApproval === 'approved') {
                                                        console.log('approved obj', obj);
                                                        completeTourData.push(obj);
                                                    } else {
                                                        completeTourData.push({});
                                                    }
                                                } else {
                                                    completeTourData.push({});
                                                }
                                                console.log('equal', completeTourData, data.size === completeTourData.length);
                                                if (data.size === completeTourData.length) {
                                                    const completeRequestTour = completeTourData.filter(val => Object.keys(val).length !== 0);
                                                    const temp = _.orderBy(completeRequestTour, ['completedAt'], ['desc']);
                                                    dispatch({
                                                        type: GET_COMPLETE_TOUR_DATA_SUCCESS,
                                                        payload: temp,
                                                    });
                                                }
                                            })
                                            .catch((error) => {
                                                // todo-cr-mi - use fail condition as common fun
                                                dispatch({
                                                    type: GET_COMPLETE_TOUR_DATA_FAIL,
                                                    payload: error,
                                                });
                                            });
                                    })
                                    .catch((error) => {
                                        dispatch({
                                            type: GET_COMPLETE_TOUR_DATA_FAIL,
                                            payload: error,
                                        });
                                    });
                            })
                            .catch((error) => {
                                dispatch({
                                    type: GET_COMPLETE_TOUR_DATA_FAIL,
                                    payload: error,
                                });
                            });
                    });
                } else {
                    dispatch({
                        type: GET_COMPLETE_TOUR_DATA_FAIL,
                        payload: completeTourData,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_COMPLETE_TOUR_DATA_FAIL,
                    payload: error,
                });
            });
    }
};

const allContracts = (tourId) => new Promise((resolve, reject) => {
    db.collection('contracts')
        .where('tourId', '==', tourId)
        .where('tourComplete', '==', true)
        .get()
        .then((ref) => {
            console.log('ref allContracts', ref);
            const contracts = [];
            if (ref.size > 0) {
                ref.forEach((docs) => {
                    contracts.push(docs.data());
                    if (ref.size === contracts.length) {
                        resolve(contracts);
                    }
                });
            } else {
                resolve([]);
            }
        })
        .catch((error) => {
            reject(error);
        });
});

const fetchRequestTourData = (requestDocId, currentUser) => {
    console.log('fetchRequestTourData', requestDocId);
    return new Promise((resolve, reject) => {
        db.collection('requestTour')
            .doc(requestDocId)
            .get()
            .then(async (requestTourData) => {
                console.log('requestTourData', requestTourData.data());
                let obj = {};
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
                    specialInstructions
                } = requestTourData.data();
                obj = {
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
                    specialInstructions,
                    requestTourId: requestTourData.id
                };
                resolve(obj);
            })
            .catch((err) => {
                reject(err);
            });
    });
};


const fetchTourData = (tourId, currentUser) => {
    console.log('fetchTourData', tourId);
    return new Promise((resolve, reject) => {
        db.collection('tours')
            .doc(tourId)
            .get()
            .then((val) => {
                console.log('fetchTourData val', val);
                const {
                    tourName,
                    tourImageUrl,
                    tourPrice,
                    tourDesc,
                    userId,
                    tourService,
                    uniqueId,
                    requestedClients,
                    approvedClients,
                    createdAt,
                    adminApproval,
                    deleteTourStatus,
                    transportFacility,
                    lodgeFacility
                } = val.data();
                const obj = {
                    tourName,
                    tourImageUrl,
                    tourPrice,
                    tourDesc,
                    userId,
                    tourService,
                    uniqueId,
                    requestedClients,
                    approvedClients,
                    createdAt,
                    adminApproval,
                    deleteTourStatus,
                    transportFacility,
                    lodgeFacility
                };
                resolve(obj);
            })
            .catch((error) => {
                console.log('error', error);
                reject(error);
            });
    });
};



