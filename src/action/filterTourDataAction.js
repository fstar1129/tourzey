import firebase from 'react-native-firebase';
import _ from 'lodash';
import {
    CERTIFIED_TOUR_DATA,
    CERTIFIED_TOUR_DATA_SUCCESS,
    CERTIFIED_TOUR_DATA_FAIL,
    GET_RATED_TOUR_DATA,
    GET_RATED_TOUR_DATA_SUCCESS,
    GET_RATED_TOUR_DATA_FAIL,
} from './types';
import { getData } from './checkdataAction';

const db = firebase.firestore();

export const getCertifiedGuideDetails = () => (dispatch) => {
    dispatch({ type: CERTIFIED_TOUR_DATA });
    db.collection('users')
        .where('role', '==', 'Guide')
        .where('certified', '==', true)
        .get()
        .then((doc) => {
            if (doc.size > 0) {
                console.log('Check Docs', doc.size);
                const tourDetails = [];
                doc.forEach((eachItems) => {
                    console.log(eachItems.data().uid, 'userId');
                    db.collection('tours')
                        .where('userId', '==', eachItems.data().uid)
                        // .limit(3)
                        .get()
                        .then((tourData) => {
                            console.log(tourData, tourData.size, 'tourData');
                            if (tourData.size > 0) {
                                tourData.forEach((val, key) => {
                                    console.log(val.id, 'checking tour data');
                                    getData.allContracts(val.id)
                                        .then((contracts) => {
                                            console.log(contracts, 'Certified Contracts');
                                            let obj = {};
                                            const {
                                                // contract,
                                                // contractDetails,
                                                createdAt,
                                                hiredClient,
                                                postedBy,
                                                tourDesc,
                                                rateAgent,
                                                rateClient,
                                                starCountagent,
                                                starCountclient,
                                                tourComplete,
                                                tourImageUrl,
                                                tourLocation,
                                                tourName,
                                                tourPrice,
                                                tourService,
                                                userId,
                                                averageRatingCount,
                                                adminApproval,
                                                transportFacility,
                                                lodgeFacility
                                            } = val.data();

                                            obj = {
                                                // contract,
                                                contractDetails: contracts || [],
                                                createdAt,
                                                hiredClient,
                                                postedBy,
                                                tourDesc,
                                                rateAgent,
                                                rateClient,
                                                starCountagent,
                                                starCountclient,
                                                tourComplete,
                                                tourImageUrl,
                                                tourLocation,
                                                tourName,
                                                tourPrice: tourPrice || 0,
                                                tourService,
                                                userId,
                                                averageRatingCount,
                                                adminApproval,
                                                transportFacility,
                                                lodgeFacility
                                            };
                                            tourDetails.push(obj);
                                            dispatch({ type: CERTIFIED_TOUR_DATA });
                                            const temp = _.orderBy(tourDetails, ['createdAt'], ['asc']);
                                            console.log(tourDetails, 'certified tourData');
                                            dispatch({
                                                type: CERTIFIED_TOUR_DATA_SUCCESS,
                                                payload: tourDetails
                                            });
                                        });
                                });
                            } else {
                                dispatch({
                                    type: CERTIFIED_TOUR_DATA_FAIL,
                                    payload: []
                                });
                            }
                        })
                        .catch((error) => {
                            dispatch({
                                type: CERTIFIED_TOUR_DATA_FAIL,
                                payload: error
                            });
                        });
                });
            } else {
                dispatch({
                    type: CERTIFIED_TOUR_DATA_FAIL,
                    payload: []
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: CERTIFIED_TOUR_DATA_FAIL,
                payload: error
            });
        });
};

export const getRatedGuideDetails = () => (dispatch) => {
    dispatch({ type: GET_RATED_TOUR_DATA });
    const tourDetails = [];
    // db.collection('users')
    //     .where('role', '==', 'Guide')
    //     .get()
    //     .then((doc) => {
    //         if (doc.size > 0) {
    // console.log('Check Docs', doc.size);
    // const tourDetails = [];
    // doc.forEach((eachItems) => {
    // console.log(eachItems.data().uid, 'userId');
    db.collection('tours')
        // .where('userId', '==', eachItems.data().uid)
        // .limit(3)
        .get()
        .then((tourData) => {
            console.log('tourDataSize', tourData.size);
            if (tourData.size > 0) {
                tourData.forEach((val, key) => {
                    console.log(val, 'checking tourId');
                    getData.allContracts(val.id)
                        .then((contracts) => {
                            let obj = {};
                            const {
                                // contract,
                                // contractDetails,
                                createdAt,
                                hiredClient,
                                postedBy,
                                tourDesc,
                                rateAgent,
                                rateClient,
                                starCountagent,
                                starCountclient,
                                tourComplete,
                                tourImageUrl,
                                tourLocation,
                                tourName,
                                tourPrice,
                                tourService,
                                userId,
                                averageRatingCount,
                                adminApproval,
                                deleteTourStatus
                            } = val.data();
                            if ((adminApproval === 'approved' && (deleteTourStatus === undefined)) || (adminApproval === 'rejected' && (deleteTourStatus === undefined)) || (deleteTourStatus === undefined)) {
                                console.log('if adminApproval');
                                if (averageRatingCount !== undefined) {
                                    console.log('if  averageRatingCount');
                                    obj = {
                                        // contract,
                                        contractDetails: contracts || [],
                                        createdAt,
                                        hiredClient,
                                        postedBy,
                                        tourDesc,
                                        rateAgent,
                                        rateClient,
                                        starCountagent,
                                        starCountclient,
                                        tourComplete,
                                        tourImageUrl,
                                        tourLocation,
                                        tourName,
                                        tourPrice,
                                        tourService,
                                        userId,
                                        averageRatingCount,
                                        adminApproval,
                                        deleteTourStatus
                                    };
                                    tourDetails.push(obj);
                                } else {
                                    tourDetails.push({});
                                    console.log('else  averageRatingCount');
                                }
                            } else {
                                console.log('else adminApproval');
                                tourDetails.push({});
                            }

                            console.log('rated tourData', tourData.size, tourDetails, tourDetails.length, averageRatingCount);

                            if (tourData.size === tourDetails.length) {
                                const tour = tourDetails.filter(value => Object.keys(value).length !== 0);
                                const temp = _.orderBy(tour, ['averageRatingCount'], ['desc']);
                                dispatch({
                                    type: GET_RATED_TOUR_DATA_SUCCESS,
                                    payload: temp
                                });
                            }
                        });
                });
            } else {
                dispatch({
                    type: GET_RATED_TOUR_DATA_FAIL,
                    payload: []
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: GET_RATED_TOUR_DATA_FAIL,
                payload: error
            });
        });
    // });
    //     } else {
    //         dispatch({
    //             type: GET_RATED_TOUR_DATA_FAIL,
    //             payload: []
    //         });
    //     }
    // })
    // .catch((error) => {
    //     dispatch({
    //         type: GET_RATED_TOUR_DATA_FAIL,
    //         payload: error
    //     });
    // });
};

