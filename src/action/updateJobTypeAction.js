import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import axios from 'axios';
import _ from 'lodash';
import {
    UPDATE_JOBTYPE_SUCCESS,
    UPDATE_JOBTYPE_FAIL,
    UPDATE_JOBTYPE,
    UPDATE_RATEANDREVIEW,
    UPDATE_RATEANDREVIEW_SUCCESS,
    UPDATE_RATEANDREVIEW_FAIL
} from './types';
import { completeJobUrl } from '../utils/constants';
import { toastMessagesuccess, toastMessagefailure, toastMessageokey } from '../utils/showMessage';

const db = firebase.firestore();

export const updateJobType = (jobTypeValue, jobData) => (dispatch) => {
    dispatch({ type: UPDATE_JOBTYPE });
    switch (jobTypeValue) {
        case 'archive':
            db.collection('jobs').doc(jobData.id).update({
                type: jobTypeValue
            })
                .then(() => {
                    updateSuccess(dispatch, 'archived');
                    // eslint-disable-next-line eqeqeq
                })
                .catch((error) => {
                    updateFailure(dispatch, error);
                });
            break;
        case 'complete':
            db.collection('contracts')
                .where('jobId', '==', jobData.id)
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        const { completed, createdBy, hiredAgent } = doc.data();
                        if (completed === false) {
                            db.collection('jobs').doc(jobData.id).update({
                                type: jobTypeValue,
                            })
                                .then(() => {
                                    db.collection('users').where('uid', '==', hiredAgent)
                                        .get()
                                        .then((response) => {
                                            response.forEach((data) => {
                                                const { fullName } = data.data();
                                                db.collection('users').where('uid', '==', createdBy)
                                                    .get()
                                                    .then((resp) => {
                                                        resp.forEach((userdata) => {
                                                            const { pushToken, setting } = userdata.data();
                                                            if (setting) {
                                                                if (setting.notification === true) {
                                                                    console.log(jobData, 'jobData');
                                                                    const params = {
                                                                        token: pushToken,
                                                                        name: fullName,
                                                                        tourName: jobData.tourName,
                                                                        user: 'Agent',
                                                                        rate: jobData.rate,
                                                                        jobId: jobData.id
                                                                    };
                                                                    const value = JSON.stringify(params);
                                                                    axios.post(completeJobUrl + value);
                                                                }
                                                            }
                                                            updateSuccess(dispatch, 'completed');
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        updateFailure(dispatch, error);
                                                    });
                                            });
                                        })
                                        .catch((error) => {
                                            updateFailure(dispatch, error);
                                        });
                                })
                                .catch((error) => {
                                    updateFailure(dispatch, error);
                                });
                        } else {
                            Toast.show({
                                text: 'Job is already completed',
                                position: 'bottom',
                                buttonText: 'Okay',
                                duration: 5000
                            });
                        }
                    }).catch((error) => {
                        updateFailure(dispatch, error);
                    });
                })
                .catch((error) => {
                    updateFailure(dispatch, error);
                });
            break;
        default:
            return jobTypeValue;
    }
};

const updateSuccess = (dispatch, type) => {
    dispatch({ type: UPDATE_JOBTYPE_SUCCESS, jobType: type });
    Toast.show({
        text: `Job ${type}`,
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
};

const updateFailure = (dispatch, error) => {
    const errorCode = error.code;
    dispatch({ type: UPDATE_JOBTYPE_FAIL });
    // Toast.show({
    //     text: errorCode,
    //     position: 'bottom',
    //     duration: 5000
    // });
};

export const updateRateandReview = (tourId, approveDocId, tourApprovedById, tourReviewClient, starCount) => (dispatch) => {
    dispatch({ type: UPDATE_RATEANDREVIEW });
    const currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
        db.collection('tours').doc(tourId)
            .get()
            .then((document) => {
                console.log('check', document);
                if (document.id) {
                    const { averageRatingCount } = document.data();
                    let temp = 0;
                    if (averageRatingCount === 0 || averageRatingCount === undefined) {
                        temp = starCount;
                    } else {
                        temp = (averageRatingCount + starCount) / 2;
                    }
                    db.collection('tours').doc(tourId)
                        .update({
                            averageRatingCount: _.round(temp, 1)
                        })
                        .then(() => {
                            // db.collection('contracts')
                            //     .where('tourId', '==', tourId)
                            //     .where('approvedClientId', '==', currentUser.uid)
                            //     .get()
                            //     .then((ref) => {
                            //         if (ref.size > 0) {
                            //             ref.forEach((docs) => {
                            //                 const { tourApprovedById } = docs.data();
                                            db.collection('contracts').doc(approveDocId) //approveDocId 
                                                .update({
                                                    tourReview: tourReviewClient,
                                                    tourRating: starCount,
                                                    ratebyClient: true,
                                                })
                                                .then(() => {
                                                    db.collection('users')
                                                        .where('uid', '==', tourApprovedById) //tourApprovedById from screen
                                                        .get()
                                                        .then((data) => {
                                                            if (data.size > 0) {
                                                                data.forEach((doc) => {
                                                                    const { ratingCount } = doc.data();
                                                                    let temp = 0;
                                                                    if (ratingCount === 0 || ratingCount === undefined) {
                                                                        temp = starCount;
                                                                    } else {
                                                                        temp = (ratingCount + starCount) / 2;
                                                                    }
                                                                    const Ref = db.collection('users').doc(doc.id);
                                                                    Ref.update({
                                                                        ratingCount: _.round(temp, 1)
                                                                    })
                                                                        .then(() => {
                                                                            toastMessagesuccess('Review and Rating update successfully!!!');
                                                                            dispatch({ type: UPDATE_RATEANDREVIEW_SUCCESS });
                                                                        })
                                                                        .catch((err) => {
                                                                            const errorCode = err.code;
                                                                            toastMessageokey(errorCode);
                                                                            dispatch({ type: UPDATE_RATEANDREVIEW_FAIL });
                                                                        });
                                                                });
                                                            } else {
                                                                toastMessageokey('No data available');
                                                                dispatch({ type: UPDATE_RATEANDREVIEW_FAIL });
                                                            }
                                                        })
                                                        .catch((err) => {
                                                            console.log('error1', err);
                                                            const errorCode = err.code;
                                                            toastMessageokey(errorCode);
                                                            dispatch({ type: UPDATE_RATEANDREVIEW_FAIL });
                                                        });
                                                })
                                                .catch((err) => {
                                                    console.log('error2', err);
                                                    const errorCode = err.code;
                                                    toastMessageokey(errorCode);
                                                    dispatch({ type: UPDATE_RATEANDREVIEW_FAIL });
                                                });
                                //         });
                                //     } else {
                                //         toastMessageokey('No data available');
                                //         dispatch({ type: UPDATE_RATEANDREVIEW_FAIL });
                                //     }
                                // })
                                // .catch((err) => {
                                //     console.log('error3', err);
                                //     const errorCode = err.code;
                                //     toastMessageokey(errorCode);
                                //     dispatch({ type: UPDATE_RATEANDREVIEW_FAIL });
                                // });
                        })
                        .catch((err) => {
                            console.log('reviewew', err);
                            const errorCode = err.code;
                            toastMessageokey(errorCode);
                            dispatch({ type: UPDATE_RATEANDREVIEW_FAIL });
                        });
                }
            });
    }
};

