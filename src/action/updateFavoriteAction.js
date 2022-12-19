import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import {
    UPDATE_FAVORITE_TOUR,
    UPDATE_FAVORITE_TOUR_SUCCESS,
    UPDATE_FAVORITE_TOUR_FAIL
} from './types';
import _ from 'lodash';

const db = firebase.firestore();
export const updateFavoriteTour = (data) => (dispatch) => {
    console.log(data, 'checkdata');
    const { tourId, uid, favorite, status } = data;
    dispatch({ type: UPDATE_FAVORITE_TOUR });
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser, 'checkuser');
    switch (status) {
        case 'remove':
            db.collection('tours').doc(tourId).update({
                favoritedBy: favorite
            })
                .then(() => {
                    const obj = {
                        tourId,
                        uid,
                        favorite
                    };
                    updateFavoriteTourSuccess(dispatch, 'unliked', obj);
                })
                .catch((error) => {
                    updateFavoriteTourFail(dispatch, error);
                });
            break;
        case 'add':
            console.log('addthen');
            db.collection('tours').doc(tourId)
                .get()
                .then((doc) => {
                    console.log('doc', doc.data());
                    if (doc.data().favoritedBy.length >= 0) {
                        console.log(doc.data().favoritedBy, 'add');
                        doc.data().favoritedBy.push(uid);
                    }
                    db.collection('tours').doc(tourId)
                        .update({
                            favoritedBy: _.uniq(doc.data().favoritedBy)
                        })
                        .then(() => {
                            console.log(doc.data().favoritedBy, 'then');
                            const obj = {
                                tourId,
                                uid,
                                favorite: doc.data().favoritedBy
                            };
                            updateFavoriteTourSuccess(dispatch, 'liked', obj);
                        })
                        .catch((error) => {
                            updateFavoriteTourFail(dispatch, error);
                        });
                })
                .catch((error) => {
                    updateFavoriteTourFail(dispatch, error);
                });
            break;
        case 'new':
            console.log('new');
            favorite.push(uid);
            console.log('new favorite', favorite);
            db.collection('tours').doc(tourId)
                .update({
                    favoritedBy: _.uniq(favorite)
                })
                .then(() => {
                    console.log('then');
                    const obj = {
                        tourId,
                        uid,
                        favorite
                    };
                    console.log('then', obj);
                    updateFavoriteTourSuccess(dispatch, 'liked', obj);
                })
                .catch((error) => {
                    updateFavoriteTourFail(dispatch, error);
                });
            break;
        default:
    }
};
const updateFavoriteTourSuccess = (dispatch, status, detail) => {
    console.log(status, detail, 'updateFavoriteTourSuccess');
    console.log('status', status);
    dispatch({ type: UPDATE_FAVORITE_TOUR_SUCCESS, favoriteStatus: status, favoriteData: detail });
    Toast.show({
        text: `Tour ${status}`,
        position: 'bottom',
        buttonText: 'Okay',
        type: 'success',
        duration: 5000
    });
};

const updateFavoriteTourFail = (dispatch, error) => {
    console.log('error', error);
    const errorCode = error.code;
    dispatch({ type: UPDATE_FAVORITE_TOUR_FAIL });
    Toast.show({
        text: errorCode,
        position: 'bottom',
        buttonText: 'Okay',
        type: 'success',
        duration: 5000
    });
};
