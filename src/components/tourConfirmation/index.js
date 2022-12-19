import React, { Component } from 'react';
import { ListView, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { SafeAreaView, NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { View, Card, CardItem, Thumbnail, Text, Body, Input, Button } from 'native-base';
import styles from './styles';
import Theme from '../../themes/Theme';
import Images from '../../themes/main/Theme.Main.Images';
import LinearGradientView from '../../components/common/gradient/linearGradient';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import TourCategoryGradientModal from '../common/gradient/tourCategoryGradient';
import { isObjectEmpty, isStringEmpty } from '../../utils/checkEmptycondition';
import { requestTour, updateFavoriteTour } from '../../action/index';
import _ from 'lodash';


class TourConfirmation extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Confirmation',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: null,
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
            details: {},
            tourMemberCount: '',
            guideDetail: {},
            requestedDetails: {},
            tourDate: '',
            tourTime: '',
            favoriteDetail: {},
            favoriteVal: ''
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

        if (this.props.navigation.state.params !== undefined) {
            const { state } = this.props.navigation;
            if (isObjectEmpty(state.params.tourDetails) ||
                isStringEmpty(state.params.tourMemberCount) ||
                isObjectEmpty(state.params.guideDetail) ||
                isStringEmpty(state.params.tourDate) ||
                isStringEmpty(state.params.tourTime)
            ) {
                // console.log('tourConfirmation', state.params.tourDetails, state.params.guideDetail);
                this.setState({
                    details: state.params.tourDetails,
                    tourMemberCount: state.params.tourMemberCount,
                    guideDetail: state.params.guideDetail,
                    tourDate: state.params.tourDate,
                    tourTime: state.params.tourTime
                }, () => {
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log('TourConfirm', nextProps, nextProps.requestedDetails);
        if (nextProps.requestedDetails !== this.props.requestedDetails) {
            this.setState({
                requestedDetails: nextProps.requestedDetails
            }, () => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction);
            });
        }

        console.log(nextProps.updateFavorite, 'before');
        if (nextProps.favoriteData !== this.props.favoriteData) {
            console.log(nextProps.updateFavorite, 'updateFavorite');
            if (nextProps.favoriteStatus === 'liked' || nextProps.favoriteStatus === 'unliked') {
                console.log(nextProps.favoriteStatus, 'favoriteStatus');
                this.setState({
                    favoriteVal: nextProps.favoriteStatus
                });
            }
        }
    }


    onRequestTour() {
        // console.log('onRequestTour', this.state.details, this.state.details.tourId);
        const obj = {
            tourId: this.state.details.tourId,
            tourPostedById: this.state.guideDetail.uid,
            tourRequestedById: this.props.userData.uid,
            count: this.state.tourMemberCount,
            tourRequestedName: this.props.userData.fullName,
            tourName: this.state.details.tourName,
            tourPrice: this.state.details.tourPrice,
            tourImageUrl: this.state.details.tourImageUrl,
            tourApprovalStatus: 'Pending',
            tourDate: this.state.tourDate,
            tourTime: this.state.tourTime,
            tourComplete: false
        };
        // console.log('onRequestTour obj', obj);
        this.props.requestTour(obj);
    }

    renderLoader() {
        // console.log('renderLoader', this.props.requestedLoader);
        if (this.props.requestedLoader) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
    }

    onHeartIconPress(detail) {
        console.log('detail', detail);
        console.log('onHeartIconPress', detail);
        this.setState({
            favoriteDetail: detail
        });
        console.log('detail', detail);
        if (detail.favoritedBy) {
            const favorited = _.includes(detail.favoritedBy, this.props.userData.uid);
            console.log('favorited', favorited);
            if (favorited === true) {
                const favoritedList = detail.favoritedBy;
                const index = favoritedList.indexOf(this.props.userData.uid); // 1
                console.log('index', index);
                if (index !== -1) {
                    console.log('index-1', index);
                    favoritedList.splice(index, 1);
                    console.log('favoritedList', favoritedList);
                    const obj = {
                        tourId: detail.tourId,
                        uid: this.props.userData.uid,
                        favorite: favoritedList,
                        status: 'remove'
                    };
                    this.props.updateFavoriteTour(obj);
                }
            } else {
                console.log('favorited else', favorited);
                const obj = {
                    tourId: detail.tourId,
                    uid: this.props.userData.uid,
                    favorite: detail.favoritedBy,
                    status: 'add'
                };
                console.log('favorited obj', obj);
                this.props.updateFavoriteTour(obj);
                detail.favoritedBy.push(this.props.userData.uid);
            }
        } else {
            const val = [];
            console.log('favorited2222', val);
            console.log('favorited3333', detail, detail.favoritedBy);
            const obj = {
                tourId: detail.tourId,
                uid: this.props.userData.uid,
                favorite: _.uniq(detail.favoritedBy),
                status: 'new'
            };
            console.log('favorited444', obj);
            this.props.updateFavoriteTour(obj);
            val.push(this.props.userData.uid);
            console.log('favorited22222222222', val);
            detail.favoritedBy = val;
            console.log('favorited55555', detail.favoritedBy);
        }
    }

    onMessagePress() {
        console.log('onMessagePress');
        // this.props.navigation.navigate('Message');
        AsyncStorage.getItem('userdata').then((val) => {
            const list = JSON.parse(val);
            const status = _.find(list.blockList, (o) => {
                console.log(o, this.state.guideDetail.uid, 'status');
                return o === this.state.guideDetail.uid;
            });
            if (this.state.guideDetail) {
                let blockedStatus;
                if (status === undefined || status === false || status === null) {
                    blockedStatus = false;
                }
                if (status) {
                    blockedStatus = true;
                }
                this.props.navigation.navigate('MessageScreen', {
                    data: this.state.guideDetail,
                    userData: this.state.guideDetail,
                    blockedStatus,
                    role: 'client'
                });

                //  this.props.navigation.navigate('MessageScreen', { data: this.props.navigation.state.params.data, type: 'conversation', role: 'client', blockedStatus });
            }
        });
    }

    render() {
        const { details, tourMemberCount, guideDetail } = this.state;
        console.log('guideDetail', guideDetail);
        let liked = '';
        if (_.includes(details.favoritedBy, this.props.userData.uid)) {
            liked = 'ok';
        }
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.tourImageView}>
                            <Image source={{ uri: details.tourImageUrl }} style={styles.tourImageStyle} />
                        </View>
                        {liked === 'ok' ?
                            <TouchableOpacity style={styles.heartIconView} onPress={() => this.onHeartIconPress(details)}>
                                <Icon name="heart" style={styles.heartIconFilled} size={25} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.heartIconView} onPress={() => this.onHeartIconPress(details)}>
                                <Image source={Images.icons.heartIcon} style={styles.heartIcons} />
                            </TouchableOpacity>
                        }
                        <View style={styles.mainContainer}>
                            <View style={styles.tourDescView}>
                                <Text style={styles.tourName}>{details.tourName ? details.tourName : '-'}</Text>
                                <Text style={styles.descLabel}>Description</Text>
                                <Text style={styles.tourDescStyle}>{details.tourDesc ? details.tourDesc : null}</Text>
                            </View>
                            <View style={styles.lineStyle} />
                            <View style={styles.infoView}>
                                <View style={styles.nameViewWrap}>
                                    <View style={styles.nameView}>
                                        <Image source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=salem&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyAeODubKk9sups2xh8yXBVWgM1UHJCUSe4' }} style={styles.mapView} />
                                        <View style={styles.nameSpacing}>
                                            <Text style={styles.descLabel}>Address</Text>
                                            <Text style={styles.desc}>{details.tourLocation ? details.tourLocation : '-'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.lineStyle} />
                            <View>
                                <Text style={styles.descLabel}>Date and Time</Text>
                                <View style={styles.dateAndTimeView}>
                                    <View style={styles.calendarView}>

                                        <Text style={styles.dateTextStyle}>{this.state.tourDate}</Text>
                                        <Image source={Images.icons.calendarIcon} style={styles.calendarIcon} />
                                    </View>
                                    <View style={styles.clockView}>

                                        <Text style={styles.dateTextStyle}>{this.state.tourTime}</Text>
                                        <Image source={Images.icons.clockIcon} style={styles.clockIcon} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.lineStyle} />
                            <View style={styles.priceView}>
                                <Text style={styles.priceStyle}>{tourMemberCount}X</Text>
                                <Text style={styles.priceStyle}>${details.tourPrice ? parseInt(details.tourPrice) : '-'}</Text>
                            </View>
                            <View style={styles.lineStyle} />
                            <View style={styles.infoView}>
                                <View style={styles.guideViewWrap}>

                                    <View style={styles.nameView}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('GuideProfile', { data: guideDetail })}>
                                            <Thumbnail
                                                style={styles.userImage}
                                                source={guideDetail.imageData && guideDetail.imageData.uri ?
                                                    { uri: guideDetail.imageData.uri }
                                                    :
                                                    Theme.Images.profile_screen.default_avatar
                                                }
                                            />
                                        </TouchableOpacity>
                                        <View style={styles.nameSpacing}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('GuideProfile', { data: guideDetail })}>
                                                <View style={styles.guideView}>
                                                    <Text style={styles.nameStyling}>{guideDetail.fullName ? guideDetail.fullName : '-'}</Text>
                                                    {guideDetail.certified === true ?
                                                        <Image source={Images.icons.qualityHighIcon} style={styles.qualityHighIcon} />
                                                        :
                                                        <Image source={Images.icons.qualityIcon} style={styles.qualityHighIcon} />
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                            {/* <Text style={styles.locationStyle}>{guideDetail.address ? guideDetail.address : '-'}</Text> */}
                                            <Button style={styles.tagButton} onPress={this.onMessagePress.bind(this)}>
                                                <Text style={styles.lanText3} uppercase={false}>Message</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.categoryView}>
                                    <View>
                                        {details.tourService && details.tourService.length === 1 ?
                                            details.tourService.map((item, key) => (
                                                <View style={AppStyles.tochableButton}>
                                                    <TourCategoryGradientModal style={styles.categoryButton} name={item.toUpperCase()} />
                                                </View>
                                            ))
                                            :
                                            null
                                        }
                                    </View>
                                    <View style={styles.nameView}>
                                        <View style={styles.starCountview}>
                                            <StarRating
                                                halfStarEnabled
                                                disabled
                                                maxStars={5}
                                                rating={details.averageRatingCount ? details.averageRatingCount : 0}
                                                starSize={20}
                                                fullStarColor={'#f2b518'}
                                                starStyle={styles.starSpacing}
                                            />
                                        </View>
                                        <Text style={styles.starCounttext}>{details.averageRatingCount}</Text>
                                    </View>
                                </View>
                            </View>
                            {details.tourService && details.tourService.length > 1 ?
                                <View style={styles.textCenter}>
                                    <View style={styles.tagView}>
                                        {details.tourService.map((item, key) => (
                                            <TourCategoryGradientModal style={AppStyles.mainCategoryButton} name={item.toUpperCase()} />
                                        ))
                                        }
                                    </View>
                                </View>
                                :
                                null
                            }
                        </View>
                        <View>
                            <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onRequestTour.bind(this)}>
                                <LinearGradientView style={AppStyles.primaryBtn} name={'Request Tour'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.renderLoader()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (status) => {
    // console.log(status, 'tourConfirmation det');
    const { userData } = status.getuserData;
    const {
        requestedDetails,
        requestedLoader,
        error
    } = status.requestTour;
    const { updateFavoriteError, favoriteLoading, favoriteStatus, updateFavorite, favoriteData } = status.updateFavoriteTour;
    return {
        userData,
        requestedDetails,
        requestedLoader,
        error,
        updateFavoriteError,
        favoriteLoading,
        favoriteStatus,
        updateFavorite,
        favoriteData
    };
};

export default connect(mapStateToProps, { requestTour, updateFavoriteTour })(TourConfirmation);

