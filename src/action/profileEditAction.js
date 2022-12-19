import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native';
import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    UPLOAD_MULTIPLE_IMAGES,
    UPLOAD_MULTIPLE_IMAGES_SUCCESS,
    UPLOAD_MULTIPLE_IMAGES_FAIL,
    DELETE_IMAGE,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL
} from './types';

const storage = firebase.storage();
const storageRef = storage.ref();
const db = firebase.firestore();

export const getImageUrl = (imageInfo, userValue) => {
    const currentUser = firebase.auth().currentUser;
    return (dispatch) => {
        dispatch({ type: UPLOAD_IMAGE });
        const dateTime = new Date().getTime();
        storageRef.child(`${'profile/image.jpg' + '_'}${dateTime}`)
            .putFile(imageInfo.uri, { contentType: imageInfo.mime })
            .then(res => {
                const value = {
                    uri: res.downloadURL,
                    mime: res.metadata.contentType,
                    type: 'image'
                };
                db.collection('users')
                    .where('uid', '==', currentUser.uid)
                    .get()
                    .then((detail) => {
                        detail.forEach((doc) => {
                            if (doc.data()) {
                                db.collection('users').doc(doc.id).update({
                                    imageData: value
                                })
                                    .then(() => {
                                        const imageValue = {
                                            uri: res.downloadURL,
                                            mime: res.metadata.contentType,
                                            type: 'image'
                                        };
                                        userValue.imageData = imageValue;
                                        AsyncStorage.setItem('userdata', JSON.stringify(userValue)).then(() => {
                                            uploadImageSuccess(dispatch, userValue);
                                        });
                                    })
                                    .catch((error) => {
                                        uploadImageFail(dispatch, error);
                                    });
                            }
                        });
                    })
                    .catch((error) => {
                        uploadImageFail(dispatch, error);
                    });
            }).catch((error) => {
                uploadImageFail(dispatch, error);
            });
    };
};

const uploadImageSuccess = (dispatch, imageData) => {
    Toast.show({
        text: 'Image uploaded successfully',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: imageData });
};

const uploadImageFail = (dispatch, error) => {
    Toast.show({
        text: 'Image cannot be uploaded',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
    dispatch({ type: UPLOAD_IMAGE_FAIL, payload: error });
};

export const getMultipleImageUrl = (imagesDetail, userdata) => {
    const currentUser = firebase.auth().currentUser;
    console.log('imagesDetail', imagesDetail);
    return (dispatch) => {
        const images = [];

        dispatch({ type: UPLOAD_MULTIPLE_IMAGES });
        if (imagesDetail.length > 0) {
            imagesDetail.map(async (info, key) => {
                const dateTime = new Date().getTime();
                console.log('info', info);
                let obj = {};
                await storageRef.child(`${'gallery/image.jpg' + '_'}${dateTime}`)
                    .putFile(info.uri, { contentType: info.mime })
                    .then(async (res) => {
                        console.log('res', res);
                        obj = {
                            uri: res.downloadURL,
                            mime: res.metadata.contentType,
                            type: 'image'
                        };
                        console.log('obj', obj);
                        images.push(obj);
                        console.log('result', images, imagesDetail.length, images.length, imagesDetail.length === images.length);
                        if (imagesDetail.length === images.length) {
                            db.collection('users')
                                .where('uid', '==', currentUser.uid)
                                .get()
                                .then((detail) => {
                                    const galleryPic = images;
                                    detail.forEach((doc) => {
                                        if (doc.data()) {
                                            galleryPic.map((item, key) => {
                                                doc.data().gallery.push(item);
                                            });
                                            db.collection('users').doc(doc.id).update({
                                                gallery: doc.data().gallery
                                            })
                                                .then(() => {
                                                    userdata.gallery = doc.data().gallery;
                                                    AsyncStorage.setItem('userdata', JSON.stringify(userdata)).then(() => {
                                                        uploadMultipleImagesSuccess(dispatch, userdata);
                                                    });
                                                })
                                                .catch((error) => {
                                                    uploadMultipleImagesFail(dispatch, error);
                                                });
                                        }
                                    });
                                })
                                .catch((error) => {
                                    uploadMultipleImagesFail(dispatch, error);
                                });
                        }
                    }).catch((error) => {
                        console.log('error', error);
                        uploadMultipleImagesFail(dispatch, images);
                    });
            });
        } else {
            uploadMultipleImagesFail(dispatch, images);
        }
    };
};

const uploadMultipleImagesSuccess = (dispatch, images) => {
    console.log('gallery dispatch', images);
    Toast.show({
        text: 'Gallery images uploaded successfully',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
    dispatch({ type: UPLOAD_MULTIPLE_IMAGES_SUCCESS, payload: images });
};

const uploadMultipleImagesFail = (dispatch, images) => {
    Toast.show({
        text: 'Gallery images not to be uploaded',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
    dispatch({ type: UPLOAD_MULTIPLE_IMAGES_FAIL, payload: images });
};


export const onDeleteImage = (imageData, userValue) => {
    console.log('onDeleteImage', imageData);
    const currentUser = firebase.auth().currentUser;
    return (dispatch) => {
        dispatch({ type: DELETE_IMAGE });
        db.collection('users')
            .where('uid', '==', currentUser.uid)
            .get()
            .then((detail) => {
                console.log('detail', detail);
                let count = 0;
                detail.forEach((data) => {
                    const { gallery } = data.data();
                    gallery.map((val, index) => {
                        console.log('index', index);
                        if (val.uri === imageData.uri) {
                            count += 1;
                            console.log('equal', index, val);
                            gallery.splice(index, 1);
                        }
                    });
                    console.log('check', detail.size, count, detail.size === count);
                    if (detail.size === count) {
                        db.collection('users').doc(data.id).update({
                            gallery
                        })
                            .then(() => {
                                console.log('equal', gallery);
                                userValue.gallery = gallery;
                                AsyncStorage.setItem('userdata', JSON.stringify(userValue)).then(() => {
                                    deleteImageSuccess(dispatch, userValue);
                                });
                            })
                            .catch((error) => {
                                deleteImageFail(dispatch, error);
                            });
                    } else {
                        deleteImageFail(dispatch, gallery);
                    }
                });
            })
            .catch((err) => {
                deleteImageFail(dispatch, err);
            });
    };
};
const deleteImageSuccess = (dispatch, gallery) => {
    console.log('deleteImageSuccess', gallery);
    Toast.show({
        text: 'Deleted image successfully',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
    dispatch({ type: DELETE_IMAGE_SUCCESS, payload: gallery });
};

const deleteImageFail = (dispatch, err) => {
    Toast.show({
        text: 'Image cannot be deleted',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
    dispatch({ type: DELETE_IMAGE_FAIL, payload: err });
};
