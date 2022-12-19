import firebase from 'react-native-firebase';
import _ from 'lodash';
import { isStringEmpty } from '../utils/checkEmptycondition';
import {
    GET_GUIDE_DETAIL,
    GET_GUIDE_DETAIL_SUCCESS,
    GET_GUIDE_DETAIL_FAIL
} from './types';

const db = firebase.firestore();

export const getGuideDetail = (userId) => (dispatch) => {
    console.log('userId', userId);
    
    if (isStringEmpty(userId)) {
    dispatch({ type: GET_GUIDE_DETAIL });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        db.collection('users')
            .where('uid', '==', userId)
            .get()
            .then((data) => {
                console.log('getGuideDetail', data);
                if (data.size > 0) {
                    data.forEach((doc) => {
                        console.log('doc', doc.data());
                        const {
                            address,
                            agentLicense,
                            brokerName,
                            brokerageLicense,
                            brokerageName,
                            description,
                            email,
                            experience,
                            fullName,
                            gallery,
                            id,
                            imageData,
                            jobId,
                            languages,
                            password,
                            phone,
                            pushToken,
                            ratingCount,
                            certified,
                            role,
                            serviceArea,
                            setting,
                            uid,
                            videoUrl,
                            youtubeLink,
                            instagramLink,
                            facebookLink
                        } = doc.data();
                        const obj = {
                            address,
                            agentLicense,
                            brokerName,
                            brokerageLicense,
                            brokerageName,
                            description,
                            email,
                            experience,
                            fullName,
                            gallery,
                            id,
                            imageData,
                            jobId,
                            languages,
                            password,
                            phone,
                            pushToken,
                            certified,
                            ratingCount,
                            role,
                            serviceArea,
                            setting,
                            uid,
                            videoUrl,
                            youtubeLink,
                            instagramLink,
                            facebookLink
                        };
                        dispatch({
                            type: GET_GUIDE_DETAIL_SUCCESS,
                            payload: obj,
                        });
                    });
                } else {
                    dispatch({
                        type: GET_GUIDE_DETAIL_FAIL,
                        payload: {},
                    });
                }
            })
            .catch((err) => {
                console.log('error', err);
                dispatch({
                    type: GET_GUIDE_DETAIL_FAIL,
                    payload: err,
                });
            });
        }
    } else {
        dispatch({
            type: GET_GUIDE_DETAIL_FAIL,
            payload: {},
        });
    }
};
