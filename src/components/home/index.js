/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
    Text, View, Dimensions, ScrollView, Image, TouchableOpacity, Modal, ListView, ActivityIndicator,
    Platform, RefreshControl, AsyncStorage, Alert, PermissionsAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import StarRating from 'react-native-star-rating';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Spinner from 'react-native-loading-spinner-overlay';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { NavigationActions, StackActions } from 'react-navigation';
import IconBadge from 'react-native-icon-badge';
import { Input, CardItem, Button, Label } from 'native-base';
import _ from 'lodash';
import { connect } from 'react-redux';
import styles from './styles';
import Images from '../../themes/main/Theme.Main.Images';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import {
    getToursData, fetchData, getCompleteToursData,
    updateFavoriteTour, getApprovedTours, getUnseenNotificationCount
} from '../../action/index';
import { isArrayEmpty, isObjectEmpty, isStringEmpty } from '../../utils/checkEmptycondition';
import { mapApiKey } from '../../utils/constants';
import { notificationService } from '../../action/services/notificationServices';
import VideoLoader from '../videoLoader/index';

let count = 0;
let updateStatus = false;
class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            searchItem: '',
            filter: false,
            tourData: [],
            noDataAvailable: false,
            clickedRating: false,
            clickedCertified: false,
            clickedPrice: false,
            imageLoader: true,
            count: 0,
            status: '',
            favoriteDetail: {},
            data: '',
            refreshing: false,
            modalVisible: false,
            userData: {},
            profileImagecheck: true,
            bioDatacheck: true,
            phoneCheck: true,
            ratingCheck: true,
            multiSliderValue: [300, 700],
            nameArray: [],
            selectedArray: [],
            unSelectedArray: [],
            badgeCount: 0,
            loading: false,
            loopCount: 0,
            loader: false,
            tourValue: [],
            approvedTour: false,
            approvedLocationTour: false,
            notificationCount: 0
        };
    }
    componentWillMount() {
        this.props.getCompleteToursData();
        this.props.getUnseenNotificationCount();
        if (isObjectEmpty(this.props.userData)) {
            if (isStringEmpty(this.props.userData.location)) {
                this.setState({
                    approvedTour: false,
                    approvedLocationTour: false
                }, () => {
                    this.props.getToursData(this.props.userData.location);
                });
            } else {
                this.setState({
                    approvedTour: true,
                    approvedLocationTour: false
                }, () => {
                    this.props.getApprovedTours();
                });
            }
        }
        AsyncStorage.getItem('userdata').then(async res => {
            this.setState({ userData: JSON.parse(res), loopCount: 0 }, () => {
                count = 0;
                updateStatus = true;
                this.setUserData();
            });
        });
    }

    componentDidMount() {
        this.createNotificationListeners();
    }

    componentWillUnmount() {
        // this is where you unsubscribe
        this.notificationListener();
    }
    async createNotificationListeners() {
        //It is triggered when click on notifications
        this.notificationOpenedListener = await firebase.notifications().onNotificationOpened((notificationOpen) => {
            this.getNotification(notificationOpen);
        });
        /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        // this.notification(notificationOpen);
        if (notificationOpen) {
            this.getNotification(notificationOpen);
        }

        // Notification Listener
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            if (notification) {
                this.getNotification(notification);
            }
        });
    }
    getNotification(notificationOpen) {
        const { value } = notificationOpen.notification.data;
        const params = JSON.parse(value);
        const { notificationId } = params;
        AsyncStorage.getItem('notification').then(async res => {
            const value = JSON.parse(res);
            console.log('what is this', res, value, notificationId);
            if (value === null || notificationId !== value) {
                AsyncStorage.setItem('notification', JSON.stringify(notificationId)).then(async () => {
                    this.setNotification(notificationOpen);
                });
            }
        });
    }

    setNotification(notificationOpen) {
        if (notificationOpen) {
            console.log('notificationnotification', notificationOpen);
            const { page, value, messageData } = notificationOpen.notification.data;
            const params = JSON.parse(value);
            const { tourId } = params;
            if (page === 'TourDetailScreen') {
                notificationService.requestedTourNotify(tourId)
                    .then((res) => {
                        console.log('jnnnnnjnjnjnjn', res);
                        this.props.navigation.navigate('TourDetailScreen', { tourInfo: res, tourCategory: 'Current' });
                    });
            } else if (page === 'CompletedTours') {
                notificationService.completedTourNotify(tourId)
                    .then((res) => {
                        this.props.navigation.navigate('TourDetailScreen', { tourInfo: res, tourCategory: 'Pass' });
                    });
            } else if (page === 'MessageScreen') {
                console.log('jnnnnnjnjnjnjn', page, messageData);
                const messageValue = JSON.parse(messageData);
                AsyncStorage.getItem('userdata').then((value) => {
                    const list = JSON.parse(value);
                    const listValue = list && list.blockList ? list.blockList : [];
                    const status = _.find(listValue, (o) => {
                        console.log(o, messageValue.sendToid, 'status');
                        return o === messageValue.sendToid;
                    });
                    console.log('status find', status, messageValue);
                    if (messageValue) {
                        let blockedStatus;
                        if (status === undefined || status === false || status === null) {
                            blockedStatus = false;
                        }
                        if (status) {
                            blockedStatus = true;
                        }
                        this.props.navigation.navigate('MessageScreen', { data: messageValue, type: 'conversation', role: 'client', blockedStatus, userData: this.props.userData });
                    }
                });
            }
            // const feedback = JSON.parse(feedbackDetail);
        }
    }

    setUserData() {
        if (this.state.userData !== null) {
            const data = this.state.userData;
            console.log('saasdddd', data);
            if (data.imageData) {
                this.setState({
                    profileImagecheck: false
                });
            }
            if (data.description) {
                this.setState({
                    bioDatacheck: false
                });
            }
            if (data.phone) {
                this.setState({
                    phoneCheck: false
                });
            }
        }
        // if (isObjectEmpty(this.props.userData)) {
        //     if (this.props.userData.location === '' || this.props.userData.location === undefined) {
        //         Alert.alert(
        //             'Location Update',
        //             'Please Update the Location',
        //             [
        //                 { text: 'Ok', onPress: () => this.props.navigation.navigate('Search', { userdata: this.props.userData }) },
        //                 { text: 'Cancel', style: 'cancel' },
        //             ],
        //             { cancelable: false }
        //         );
        //     }
        // }
        // if (isObjectEmpty(this.props.userData) && (!this.props.userData.location || this.props.userData.location === '')) {
        //         Geolocation.getCurrentPosition((info) => {
        //         console.log(info, 'locationinfo');
        //         axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${info.coords.latitude},${info.coords.longitude}&key=${mapApiKey}`)
        //             .then((mapdata) => {
        //                 console.log(mapdata, 'mapdata ', mapdata.data.results[0].formatted_address);
        //                 const results = mapdata.data.results[0].address_components;
        //                 const city = this.findResult(results, 'locality');
        //                 const state = this.findResult(results, 'administrative_area_level_1');
        //                 const country = this.findResult(results, 'country');
        //                 const currentLocation = `${city},${state},${country}`;
        //                 const userdata = this.props.userData;
        //                 const data = {
        //                     fullName: userdata.fullName,
        //                     email: userdata.email,
        //                     address: userdata.address,
        //                     phone: userdata.phone,
        //                     imageData: userdata.imageData,
        //                     setting: userdata.setting,
        //                     videoUrl: userdata.videoUrl,
        //                     gallery: userdata.galleryImages,
        //                     location: currentLocation,
        //                     password: userdata.password,
        //                     description: userdata.description,
        //                     currentUserId: userdata.uid
        //                 };
        //                 console.log('data', data);
        //                 this.props.updateProfileDetails(data);
        //             });
        //     }, error => Alert.alert('Info', JSON.stringify(error.message)),
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        //   );
        // }
        // if (isObjectEmpty(this.props.userData) && (!this.props.userData.location || this.props.userData.location === '')) {
        //     console.log('laoder on funct', this.state.loader);
        //     this.setState({ loader: true }, () => { console.log('laoder on'); });
        //     Geolocation.getCurrentPosition((info) => {
        //         console.log(info, 'locationinfo');
        //         axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${info.coords.latitude},${info.coords.longitude}&key=${mapApiKey}`)
        //             .then((mapdata) => {
        //                 console.log(mapdata, 'mapdata ', mapdata.data.results[0].formatted_address);
        //                 const results = mapdata.data.results[0].address_components;
        //                 const city = this.findResult(results, 'locality');
        //                 const state = this.findResult(results, 'administrative_area_level_1');
        //                 const country = this.findResult(results, 'country');
        //                 const currentLocation = `${city},${state},${country}`;
        //                 const userdata = this.props.userData;
        //                 const data = {
        //                     fullName: userdata.fullName,
        //                     email: userdata.email,
        //                     address: userdata.address,
        //                     phone: userdata.phone,
        //                     imageData: userdata.imageData,
        //                     setting: userdata.setting,
        //                     videoUrl: userdata.videoUrl,
        //                     gallery: userdata.galleryImages,
        //                     location: currentLocation,
        //                     password: userdata.password,
        //                     description: userdata.description,
        //                     currentUserId: userdata.uid
        //                 };
        //                 console.log('data', data);
        //                 this.props.updateProfileDetails(data);
        //             }).catch(() => {
        //                 this.setState({ loader: false });
        //                 Alert.alert('Info', 'Unable to fetch current location');
        //             });
        //     }, error => Alert.alert('Info', JSON.stringify(error.message), this.setState({ loader: false })),
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        //   );
        // }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'np111111111');
        console.log(nextProps.tourDetails, this.props.tourDetails, 'np11 tourDetails');
        console.log(nextProps.userData, this.props.userData, 'np userData');
        if (nextProps && nextProps.notificationsCount !== this.props.notificationsCount) {
            this.setState({ notificationCount: nextProps.notificationsCount })
        }
        if (nextProps.userData !== this.props.userData) {
            if (isObjectEmpty(nextProps.userData) && isStringEmpty(nextProps.userData.location)) {
                this.setState({ location: nextProps.userData.location }, () => {

                });
            }
        }
        // todo-cr-si: pavi @janu - check tourDetails data - completed
        if (this.props.tourDetails !== nextProps.tourDetails) {
            if (isArrayEmpty(nextProps.tourDetails)) {
                this.setState({
                    approvedTour: false,
                    approvedLocationTour: false
                }, () => {
                    this.setState({
                        tourData: nextProps.tourDetails,
                        tourValue: nextProps.tourDetails
                    }, () => {
                        if (this.state.tourData.length === 0) {
                            this.setState({
                                noDataAvailable: true
                            });
                        }
                    });
                });
            } else if (nextProps.tourDetails.length === 0 && nextProps.tourLoader === false) {
                console.log('tourDetails elseIf', nextProps.tourDetails, nextProps.tourLoader);
                this.setState({
                    approvedTour: false,
                    approvedLocationTour: true
                }, () => {
                    this.props.getApprovedTours();
                });
            }
        }
        if (this.props.approvedTourDetails !== nextProps.approvedTourDetails) {
            if (isArrayEmpty(nextProps.approvedTourDetails)) {
                this.setState({
                    tourData: nextProps.approvedTourDetails,
                    tourValue: nextProps.approvedTourDetails
                }, () => {
                });
            }
        }

        if (nextProps.updateDetails !== this.props.updateDetails) {
            this.props.fetchData();
        }

        if (this.props.certifiedTourData !== nextProps.certifiedTourData) {
            if (nextProps && isArrayEmpty(nextProps.certifiedTourData)) {
                this.setState({
                    tourData: nextProps.certifiedTourData
                }, () => {
                    console.log(this.state.tourData, 'certified tour Data');
                });
            }
        }
        if (this.props.ratedTourData !== nextProps.ratedTourData) {
            if (nextProps && isArrayEmpty(nextProps.ratedTourData)) {
                this.setState({
                    tourData: nextProps.ratedTourData
                }, () => {
                });
            }
        }
        console.log(nextProps, 'np');
        if (nextProps.update !== this.props.update) {
            //    this.props.navigation.goBack();
            // this.props.fetchData();
            if (nextProps.userData !== this.props.userData) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction);
            }
        }
        if (nextProps.favoriteData !== this.props.favoriteData) {
            if (nextProps.favoriteStatus === 'liked' || nextProps.favoriteStatus === 'unliked') {
                // this.props.getToursData(this.props.userData.location);
                this.setState({
                    status: nextProps.favoriteStatus
                });
            }
        }
        if (nextProps.completeTourData !== this.props.completeTourData) {
            if (isArrayEmpty(nextProps.completeTourData)) {
                console.log('status completeTourData', nextProps.completeTourData);
                const status = _.map(nextProps.completeTourData, (o) => {
                    console.log('status home111', o);
                    return o.ratebyClient === false;
                });
                console.log('status home', status);
                const value = _.includes(status, true);
                if (value === true) {
                    console.log('value', value);
                    this.setState({
                        ratingCheck: true
                    });
                }
            } else {
                this.setState({
                    ratingCheck: false
                }, () => {
                });
            }
        }
    }

    findResult(results, name) {
        console.timeLog(results, 'reas');
        this.result = _.find(results, (obj) => {
            console.log(obj, 'obj');
            return obj.types[0] === name && obj.types[1] === 'political';
        });
        return this.result ? this.result.short_name : null;
    }

    onMessagePress() {
        this.props.navigation.navigate('Message');
    }
    onFilterPress() {
        this.setState({
            filter: true
        });
    }

    onDone() {
        console.log(this.state.multiSliderValue, this.state.selectedArray, 'onDone');
        this.setState({
            filter: false,
            clickedCertified: false,
            clickedRating: false,
            clickedPrice: false,
        }, () => {
            if (this.state.name === 'certified') {
                this.certifiedTourList();
            } else if (this.state.name === 'ratings') {
                this.ratedTourList();
            } else if (this.state.name === 'reset') {
                this.setState({
                    clickedCertified: false,
                    clickedRating: false,
                    clickedPrice: false,
                    nameArray: []
                }, () => {
                    if (isObjectEmpty(this.props.userData) && isStringEmpty(this.props.userData.location)) {
                        console.log('location onDone', this.props.userData, this.props.userData.location);
                        this.props.getToursData(this.props.userData.location);
                    } else {
                        this.props.getApprovedTours();
                    }
                });
            } else if (this.state.name === 'price') {
                this.onPriceFilter(this.state.multiSliderValue);
            } else {
                //do nothing
            }
        });
    }

    onclose() {
        this.setState({
            filter: false
        });
    }
    onTourImagePress(details) {
        this.props.navigation.navigate('TourDesc', { tourDetails: details });
    }
    onHeartIconPress(detail) {
        this.setState({
            favoriteDetail: detail
        });
        if (detail.favoritedBy) {
            const favorited = _.includes(detail.favoritedBy, this.props.userData.uid);
            if (favorited === true) {
                const favoritedList = detail.favoritedBy;
                const index = favoritedList.indexOf(this.props.userData.uid); // 1
                if (index !== -1) {
                    favoritedList.splice(index, 1);
                    const obj = {
                        tourId: detail.tourId,
                        uid: this.props.userData.uid,
                        favorite: favoritedList,
                        status: 'remove'
                    };
                    this.props.updateFavoriteTour(obj);
                }
            } else {
                const obj = {
                    tourId: detail.tourId,
                    uid: this.props.userData.uid,
                    favorite: detail.favoritedBy,
                    status: 'add'
                };
                this.props.updateFavoriteTour(obj);
                detail.favoritedBy.push(this.props.userData.uid);
            }
        } else {
            const val = [];
            const obj = {
                tourId: detail.tourId,
                uid: this.props.userData.uid,
                favorite: _.uniq(detail.favoritedBy),
                status: 'new'
            };
            this.props.updateFavoriteTour(obj);
            val.push(this.props.userData.uid);
            detail.favoritedBy = val;
        }
    }
    // recommendedPress() {
    // }
    onResetPress() {
        this.setState({
            name: 'reset',
        }, () => {
            this.onDone();
        });
    }

    onImageLoad() {
        console.log('onImageLoad');
        ++this.state.count;
        if (this.state.count === this.state.tourData.length) {
            console.log('count', this.state.count);
            this.setState({
                imageLoader: false,
                count: 0
            }, () => {

            });
        }
    }
    onCertifiedPress() {
        this.setState({
            name: 'certified',
            clickedCertified: !this.state.clickedCertified,
            clickedRating: false,
            clickedPrice: false
        }, () => {

        });
    }
    certifiedTourList() {
        const tourCertified = [];
        this.state.tourData.map((eachTour, index) => {
            if (eachTour.guideCertified === true) {
                tourCertified.push(eachTour);
            }
        });
        this.setState({
            tourData: tourCertified
        }, () => {
        });
    }
    ratedTourList() {
        const orderTourList = _.orderBy(this.state.tourData, ['averageRatingCount'], ['desc']);
        this.setState({
            tourData: orderTourList
        });
    }
    multiSliderValuesChange = values => {
        this.setState({
            multiSliderValue: values,
        }, () => {
            console.log(this.state.multiSliderValue, 'slider');
        });
    }
    onPriceFilter() {
        const startRange = this.state.multiSliderValue[0];
        const endRange = this.state.multiSliderValue[1];
        const priceFilteredTourData = [];
        this.state.tourValue.map((eachTour, index) => {
            console.log(eachTour, eachTour.tourPrice, eachTour.tourPrice > startRange && eachTour.tourPrice <= endRange, 'condition');
            if (eachTour.tourPrice >= startRange && eachTour.tourPrice <= endRange) {
                priceFilteredTourData.push(eachTour);
            }
        });
        const orderedData = _.orderBy(priceFilteredTourData, ['tourPrice'], ['asc']);
        this.setState({
            tourData: orderedData
        }, () => {
        });
    }
    onRatingPress() {
        this.setState({
            name: 'ratings',
            clickedRating: !this.state.clickedRating,
            clickedCertified: false,
            clickedPrice: false,

        }, () => {
            // if (this.state.clickedRating === true) {
            //     this.state.nameArray.push(this.state.name);
            //     this.state.selectedArray.push(this.state.name);
            // }
        });
    }
    onPricePress() {
        this.setState({
            name: 'price',
            clickedPrice: !this.state.clickedPrice,
            clickedCertified: false,
            clickedRating: false,

        }, () => {
            // if (this.state.clickedPrice === true) {
            //     this.state.nameArray.push(this.state.name);
            //     this.state.selectedArray.push(this.state.name);

            // }
        });
    }
    _refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._refreshListView()}
            />
        );
    }
    _refreshListView() {
        //Start Rendering Spinner
        this.setState({
            refreshing: true,
            clickedCertified: false,
            clickedRating: false,
            clickedPrice: false
        }, () => {
            if (isStringEmpty(this.props.userData.location)) {
                this.props.getToursData(this.props.userData.location);
                this.setState({
                    refreshing: false
                }, () => {
                });
            } else {
                this.props.getApprovedTours();
                this.setState({
                    refreshing: false
                }, () => {
                });
            }
        });
    }

    modalOpen() {
        this.setState({
            modalVisible: true
        });
    }
    onClose() {
        this.setState({
            modalVisible: false
        });
    }
    profileEdit() {
        this.setState({
            modalVisible: false
        }, () => {
            this.props.navigation.navigate('ProfileEdit');
        });
    }
    bioPlaced() {
        this.setState({
            modalVisible: false
        }, () => {
            this.props.navigation.navigate('ProfileEdit');
        });
    }
    phonePlaced() {
        this.setState({
            modalVisible: false
        }, () => {
            this.props.navigation.navigate('ProfileEdit');
        });
    }
    ratePlaced() {
        this.setState({
            modalVisible: false
        }, () => {
            this.props.navigation.navigate('Tours', { tourType: '', tourTab: 'Pass' });
        });
    }
    onClickShare(item) {
        console.log('share link11');
        // RNFetchBlob.fetch('GET', item.tourImageUrl, {
        //     Authorization: 'Bearer access-token...',
        // })
        //     .then((res) => {
        //         const base64Str = res.base64();
        //         console.log('base64', base64Str);
        //         this.setState({ imageBase64: base64Str }, () => {
        //             const imgeUrl = 'data:image/png;base64,' + this.state.imageBase64;
        //             console.log('imgeUrl', imgeUrl);
        //         });
        //     })
        //     .catch((errorMessage, statusCode) => {
        //         console.log('errorMessage', errorMessage, statusCode);
        //     });
        // const REACT_ICON = 'data:image/png;base64,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';
        // const img = 'data:image/png;base64,item.tourImageUrl';
        // const imgeUrl = 'data:image/png;base64,' + this.state.imageBase64;
        const urlArr = 'Apple: ' + 'https://apps.apple.com/in/app/tourzey/id1468639910' + '\n' +
            'Android: ' + 'https://play.google.com/store/apps/details?id=com.tourzey.tourzey&hl=en';
        const tourName = `Tour Name: ${item.tourName}.`;
        const tourDec = `\nTour Description: ${item.tourDesc}.\n`;
        const shareMessage = tourName + tourDec + urlArr;
        const shareOptions = {
            title: 'Tourzey',
            message: shareMessage,
            // url: imgeUrl,
        };
        Share.open(shareOptions);
    }

    viewNotification() {
        this.setState({
            modalVisible: false
        }, () => {
            this.props.navigation.navigate('Notifications');
        });
    }

    renderRow(item) {
        let serviceCount = 0;
        let commaSymbol = null;
        let liked = '';
        if (_.includes(item.favoritedBy, this.props.userData.uid)) {
            liked = 'ok';
        }
        return (
            <View style={styles.homeContainer}>
                {this.state.imageLoader === true &&
                    <ActivityIndicator size={Platform.OS === 'ios' ? 0 : 25} />}
                <View style={styles.mainView}>
                    <TouchableOpacity onPress={() => this.onTourImagePress(item)}>
                        <Image source={{ uri: item.tourImageUrl }} style={styles.tourImageStyle} onLoad={() => this.onImageLoad()} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconStyle1} onPress={() => { this.onClickShare(item); }}>
                        <Image source={Images.icons.shareIconWhite} style={styles.shareIcon} />
                    </TouchableOpacity>
                    {liked === 'ok' ?
                        <TouchableOpacity style={styles.heartIconView} onPress={() => this.onHeartIconPress(item)}>
                            <Icon name="heart" style={styles.heartIconFilled} size={25} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.heartIconView} onPress={() => this.onHeartIconPress(item)}>
                            <Image source={Images.icons.heartIcon} style={styles.heartIcons} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.infoView}>
                    <View style={styles.nameViewWrap}>
                        <View style={styles.nameView}>
                            <View style={styles.nameSpacing}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.nameStyling}>{item.tourName}</Text>
                                    {isStringEmpty(item.tourVideoUrl) &&
                                        <Icon name="play-circle" style={styles.video} size={20} />
                                    }
                                </View>
                                <View style={styles.tourCategoryView}>
                                    {item.tourService && item.tourService.map((value, index) => {
                                        serviceCount++;
                                        if (serviceCount === item.tourService.length) {
                                            commaSymbol = null;
                                        } else {
                                            commaSymbol = ', ';
                                        }
                                        return (
                                            <Text style={styles.tourCategoryStyle}>{value}<Text>{commaSymbol}</Text></Text>
                                        );
                                    })
                                    }
                                    {/* <Text style={styles.tourCategoryStyle}>{item.tourService}</Text> */}
                                    <Text style={styles.dotStyle}>{' . '}</Text>
                                    <Text style={styles.tourCategoryStyle}>{item.postedBy}</Text>
                                    <Text style={styles.dotStyle}>{' . '}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightView}>
                        <View style={styles.earningsView}>
                            <Text style={styles.earningAmount}>${item.tourPrice ? parseInt(item.tourPrice) : 0}</Text>
                        </View>
                        <View style={styles.nameView}>
                            <View style={styles.starCountview}>
                                <StarRating
                                    halfStarEnabled
                                    disabled
                                    maxStars={5}
                                    rating={item.averageRatingCount ? item.averageRatingCount : 0}
                                    starSize={20}
                                    fullStarColor={'#f2b518'}
                                    starStyle={styles.starSpacing}
                                />
                            </View>
                            <View style={styles.ratingPoint}>
                                <Text style={styles.starCounttext}>{item.averageRatingCount}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderLoader() {
        if (this.props.tourLoader || this.props.certifiedTourLoader || this.props.ratedTourLoader || this.props.favoriteLoading || this.props.approvedTourLoader) {
            this.state.visible = true;
            return (
                <VideoLoader
                    tourType={'Local'}
                    screen={'Home'}
                />
                // <View style={{ flex: 1 }}>
                //     <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                // </View>
            );
        }
        if (this.state.loader) {
            return (
                <VideoLoader
                    tourType={'Local'}
                    screen={'Home'}
                />
                // <View style={{ flex: 1 }}>
                //     <Spinner visible={this.state.loader} textContent={'Fetching your location...'} textStyle={styles.toastStyle} />
                // </View>
            );
        }
    }
    onCountCheck(value) {
        console.log('onRatingCount', value);
        const temp = Object.values(value);
        console.log('temp', temp);
        const val = [];
        temp.map((item, key) => {
            console.log('item11111', item);
            if (item === true) {
                val.push(item);
            }
        });
        this.state.badgeCount = val.length;
    }

    render() {
        console.log('badgeCount', this.state.approvedTour, this.state.badgeCount, this.state.ratingCheck);
        const { ratingCheck, phoneCheck, profileImagecheck, bioDatacheck } = this.state;
        let location = '';
        if (isObjectEmpty(this.props.userData) && isStringEmpty(this.props.userData.location)) {
            location = this.props.userData.location;
        }
        const val = {
            ratingCheck,
            phoneCheck,
            profileImagecheck,
            bioDatacheck,
            notificationCheck: this.state.notificationCount > 0
        };
        let loaderValue = '';
        if (this.props.approvedTourLoader === false && this.props.tourLoader === false && this.props.certifiedTourLoader === false && this.props.ratedTourLoader === false && this.props.favoriteLoading === false) {
            loaderValue = 'Not loading';
        } else {
            loaderValue = 'loading';
        }
        return (
            <View style={styles.scrollContainer}>
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', { userdata: this.props.userData })}>
                        <View style={styles.searchViewWrap}>
                            <View style={styles.nameView}>
                                <View style={styles.searchView}>
                                    <Image source={Images.icons.searchIcon} style={styles.searchIcon} />
                                    <Text style={styles.locationStyle}>{this.props.userData && this.props.userData.location ? this.props.userData.location : 'Search Location'}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.modalOpen()}>
                        <IconBadge
                            MainElement={
                                <View
                                    style={{
                                        // backgroundColor: '#489EFE',
                                        width: 20,
                                        height: 20,
                                        margin: 6,
                                        resizeMode: 'cover',
                                        marginTop: 5,
                                        marginLeft: 5
                                    }}
                                >

                                    <Image
                                        source={Images.icons.notification}
                                        style={styles.iconStyle}
                                    />
                                </View>
                            }
                            BadgeElement={
                                <Text style={{ color: '#FFFFFF' }}>{this.state.badgeCount}</Text>
                            }
                            Hidden={this.state.badgeCount === 0}
                            IconBadgeStyle={{
                                width: 20,
                                height: 20,
                                marginTop: -10,
                                marginRight: 8,
                                borderRadius: 25,
                                resizeMode: 'cover',
                            }}
                        />
                        {/* <Image
                                source={Images.icons.notificationIcon}
                                style={styles.iconStyle}
                            /> */}
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.onFilterPress()}>
                            <Image source={Images.icons.filtersIcon} style={styles.filterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMessagePress()}>
                            <Image
                                source={Images.icons.sendIcon}
                                style={styles.messageIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.lineStyle} />
                {/* todo-cr-mi - suren @janani - assign loader value to single name and use it */}
                {this.state.approvedTour === true && loaderValue === 'Not loading' ?
                    <View style={styles.suggestionView}>
                        <Label style={styles.suggestionTextStyle}>New tours are on the way, meanwhile showing related tours from other locations...</Label>
                    </View>
                    :
                    this.state.approvedLocationTour === true && loaderValue === 'Not loading' ?
                        <View style={styles.suggestionView}>
                            <Label style={styles.suggestionTextStyle}>New tours are on the way for <Text>{'"'}</Text><Text style={{ fontWeight: 'bold' }}>{location}</Text><Text>{'"'}</Text>, meanwhile showing related tours from other locations....</Label>
                        </View>
                        :
                        loaderValue === 'Not loading' &&
                        null
                }
                <Modal
                    animationType="fade"
                    transparent
                    visible={this.state.filter}
                    onRequestClose={() => {
                        this.setState({ filter: false });
                    }}
                >
                    <View style={styles.modelView}>
                        <View style={styles.modelViewStyle} >
                            <View style={styles.headerModalView}>
                                <View style={styles.nameViewWrap}>
                                    <View style={styles.nameView}>
                                        <TouchableOpacity onPress={() => this.onclose()}>
                                            <Image source={Images.icons.leftArrowIcon} style={styles.leftArrowIcon} />
                                        </TouchableOpacity>
                                        <View style={styles.filterSpacing}>
                                            <Text style={styles.filterStyling}>Filter</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.resetView}>
                                    <TouchableOpacity onPress={() => { this.onResetPress(); }}>
                                        <Text style={styles.resetText}>RESET</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.modelContainer}>
                                {/* <TouchableOpacity onPress={() => { this.recommendedPress(); }}>
                                    <View style={styles.CertifiedView} >
                                        <Text style={styles.textStyle}>
                                            Recommended
                                    </Text>
                                    </View>
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => { this.onCertifiedPress(); }}>
                                    <View style={styles.CertifiedView} >
                                        {this.state.clickedCertified === true ?
                                            <Text style={styles.clickedTextStyle}>
                                                Certified
                                            </Text>
                                            :
                                            <Text style={styles.textStyle}>
                                                Certified
                                            </Text>
                                        }

                                        <Image source={Images.icons.qualityHighIcon} style={styles.qualityIcon} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.onRatingPress(); }}>
                                    <View style={styles.CertifiedView} >
                                        {this.state.clickedRating === true ?
                                            <Text style={styles.clickedTextStyle}>
                                                Ratings
                                            </Text>
                                            :
                                            <Text style={styles.textStyle}>
                                                Ratings
                                            </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.onPricePress(); }}>
                                    <View style={styles.CertifiedView} >
                                        {this.state.clickedPrice === true ?
                                            <Text style={styles.clickedTextStyle}>
                                                Price
                                            </Text>
                                            :
                                            <Text style={styles.textStyle}>
                                                Price
                                            </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                                {this.state.clickedPrice === true &&
                                    <View>
                                        <MultiSlider
                                            values={[
                                                this.state.multiSliderValue[0],
                                                this.state.multiSliderValue[1],
                                            ]}
                                            sliderLength={280}
                                            onValuesChange={this.multiSliderValuesChange}
                                            min={1}
                                            max={1500}
                                            step={1}
                                            allowOverlap
                                            snapped
                                        />
                                        <Text> Ranges From: {this.state.multiSliderValue[0]} {' '} {' '} To: {this.state.multiSliderValue[1]} </Text>
                                    </View>
                                }
                            </View>

                            <View style={AppStyles.lineStyle} />
                            <TouchableOpacity onPress={() => this.onDone()}>
                                <View style={styles.doneView}>

                                    <Text style={styles.doneStyle}>Done</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* <ScrollView> */}

                <ScrollView
                    refreshControl={this._refreshControl()}
                >
                    {isArrayEmpty(this.state.tourData) && this.state.tourData.length > 0 &&
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.state.tourData)}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections
                        />

                    }
                    {this.state.tourData.length === 0 && loaderValue === 'Not loading' &&
                        <View style={styles.nodataInfo}>
                            <Text style={styles.nodataText}>
                                No Tours are available...
                            </Text>
                        </View>
                    }
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent
                    visible={this.state.modalVisible}
                >
                    <View style={styles.modelView1}>
                        <View style={styles.modelContainerStyle}>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <TouchableOpacity style={styles.closeIconView} onPress={() => this.onClose()}>
                                    <Image source={Images.icons.closeWhiteIcon} style={styles.closeIcon} />
                                </TouchableOpacity>
                            </View>
                            {this.state.badgeCount === 0 ?
                                <Text style={styles.noNoificationStyle}>You're all caught up, no new notifications found</Text>
                                :
                                <View style={styles.noificationStyle}>
                                    {this.state.notificationCount > 0 === true &&
                                        <Button style={styles.secondaryButtonWhite} onPress={() => this.viewNotification()}>
                                            <Text style={styles.buttonTextSecondary}>Notifications <Text style={styles.notifyCount}>{this.state.notificationCount}</Text></Text>
                                        </Button>
                                    }
                                    {this.state.profileImagecheck &&
                                        <Button style={styles.secondaryButtonWhite} onPress={() => this.profileEdit()}>
                                            <Text style={styles.buttonTextSecondary}>Please add profile picture</Text>
                                        </Button>
                                    }
                                    {this.state.bioDatacheck &&
                                        <Button style={styles.secondaryButtonWhite} onPress={() => this.bioPlaced()}>
                                            <Text style={styles.buttonTextSecondary}>Please add bio data</Text>
                                        </Button>
                                    }
                                    {this.state.phoneCheck &&
                                        <Button style={styles.secondaryButtonWhite} onPress={() => this.phonePlaced()}>
                                            <Text style={styles.buttonTextSecondary}>Please add phone number</Text>
                                        </Button>
                                    }
                                    {this.state.ratingCheck === true &&
                                        <Button style={styles.secondaryButtonWhite} onPress={() => this.ratePlaced()}>
                                            <Text style={styles.buttonTextSecondary}>Please rate the completed tours</Text>
                                        </Button>
                                    }
                                </View>
                            }
                            {this.onCountCheck(val)}
                        </View>
                    </View>
                </Modal>
                {this.renderLoader()}
            </View >
        );
    }
}

export const mapStateToProps = (status) => {
    // console.log(status, 'npst');
    const { userData } = status.getuserData;
    const { tourDetails, error, tourLoader } = status.tourData;
    const { updateDetails, loading, update } = status.updateDetail;
    const { certifiedTourData, certifiedTourError, certifiedTourLoader } = status.filterCertifiedTour;
    const { ratedTourData, ratedTourError, ratedTourLoader } = status.filterRatedTour;
    const { updateFavoriteError, favoriteLoading, favoriteStatus, updateFavorite, favoriteData } = status.updateFavoriteTour;
    const {
        completeTourData,
        completeTourError,
        completeTourLoader
    } = status.completeTourData;
    const { approvedTourLoader, approvedTourDetails } = status.getApprovedTour;
    const { notificationsCount } = status.getNotificationCount;
    return {
        userData,
        tourDetails,
        error,
        tourLoader,
        updateDetails,
        loading,
        update,
        certifiedTourData,
        certifiedTourError,
        certifiedTourLoader,
        ratedTourData,
        ratedTourError,
        ratedTourLoader,
        updateFavoriteError,
        favoriteLoading,
        favoriteStatus,
        updateFavorite,
        favoriteData,
        completeTourData,
        completeTourError,
        completeTourLoader,
        approvedTourLoader,
        approvedTourDetails,
        notificationsCount
    };
};

export default connect(mapStateToProps,
    {
        getToursData,
        fetchData,
        updateFavoriteTour,
        getCompleteToursData,
        getApprovedTours,
        getUnseenNotificationCount
    })(HomeScreen);

