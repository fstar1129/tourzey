import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { SafeAreaView } from 'react-navigation';
import { View, Thumbnail, Text, Button } from 'native-base';
import Share from 'react-native-share';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
// import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getGuideDetail, getRequestTourDetail, updateFavoriteTour } from '../../action/index';
import Video from 'react-native-video';
import styles from './styles';
import Theme from '../../themes/Theme';
import Moment from 'moment';
import Images from '../../themes/main/Theme.Main.Images';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import LinearGradientView from '../../components/common/gradient/linearGradient';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import TourCategoryGradientModal from '../common/gradient/tourCategoryGradient';
import { isObjectEmpty, isStringEmpty, isArrayEmpty } from '../../utils/checkEmptycondition';
import { TitleCase } from '../../utils/caseFormat';
import _ from 'lodash';
// todo-cr-mi - pavi @ janani - use imports properly

class TourDescription extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    // todo-cr-mi - pavi @ janani - use separate file for moment
    constructor(props) {
        super(props);
        const currentDate = Date.now();
        // todo-cr-mi: pavi @ janani - use moment as seperate file
        const time = Moment().format('LT');
        this.state = {
            count: 1,
            details: {},
            guideDetail: {},
            favoriteVal: '',
            minimumDate: Moment(currentDate).utc().format('ll'),
            tourDate: Moment(currentDate).utc().format('ll'),
            tourTime: Moment(time, 'h:mm A').format('HH:mm A'),
            requestTourDetail: {},
            restrictLines: 2,
            favoriteDetail: {},
            imageBase64: '',
            isBuffering: false,
            isPaused: false
        };
    }

    componentDidMount() {
        console.log('componentDidMount isPaused', this.state.isPaused);
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
            if (isObjectEmpty(state.params.tourDetails)) {
                console.log('tourDetails', state.params.tourDetails);
                this.setState({
                    details: state.params.tourDetails
                }, () => {
                    if (isObjectEmpty(this.state.details) && isStringEmpty(this.state.details.userId)) {
                        console.log('componentDidMount', this.state.details);
                        this.props.getGuideDetail(this.state.details.userId);
                    }
                    console.log('detail....', this.state.details);
                    if (isObjectEmpty(this.state.details)) {
                        console.log('detail....1111', this.state.details);
                        if (isArrayEmpty(this.state.details.requestedClients)) {
                            const obj = {
                                requestedClients: this.state.details.requestedClients,
                                tourId: this.state.details.tourId,
                            };
                            this.props.getRequestTourDetail(obj);
                        } else {
                            console.log('detail....222', this.state.details);
                            this.setState({
                                status: 'notRequested'
                            });
                        }
                    }
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
        if (nextProps.guideDetail !== this.props.guideDetail) {
            if (isObjectEmpty(nextProps.guideDetail)) {
                this.setState({
                    guideDetail: nextProps.guideDetail
                });
            }
        }
        console.log('nextProps requestTourStatus', nextProps.requestTourStatus);
        if (nextProps.requestTourStatus !== this.props.requestTourStatus) {
            console.log('if requestTourStatus', nextProps.requestTourStatus);
            if (nextProps.requestTourStatus === 'Disabled') {
                console.log('Disabled', nextProps.requestTourStatus);
                this.setState({
                    status: 'requested'
                });
                // this else if for if no request(new and complete)
            } else if (nextProps.requestTourStatus === 'Enabled') {
                console.log('Enabled', nextProps.requestTourStatus);
                this.setState({
                    status: 'notRequested'
                });
            } else {
                console.log('Nothing', nextProps.requestTourStatus);
                this.setState({
                    status: 'notRequested'
                });
            }
        }
        if (nextProps.requestTourDetail !== this.props.requestTourDetail) {
            this.setState({
                requestTourDetail: nextProps.requestTourDetail
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
        console.log('Check tour details', this.state.isPaused, this.state.details);
        this.setState({
            isPaused: true
        }, () => {
            console.log('onRequestTour', this.state.isPaused);
            this.props.navigation.navigate('TourConfirmation',
                {
                    tourDetails: this.state.details,
                    tourMemberCount: this.state.count,
                    tourDate: this.state.tourDate,
                    tourTime: this.state.tourTime,
                    guideDetail: this.state.guideDetail
                });
        });
    }
    onMinusPress() {
        if (this.state.count > 1) {
            this.state.count = this.state.count - 1;
        }
        this.setState({
            count: this.state.count
        });
    }

    onPlusPress() {
        this.state.count = this.state.count + 1;
        this.setState({
            count: this.state.count
        });
    }

    onBackIconPress() {
        console.log('onBackIconPress', this.state.isPaused);
        this.setState({
            isPaused: true
        }, () => {
            console.log('onBackIconPress11111', this.state.isPaused);
            this.props.navigation.goBack();
        });
    }
    numberOflinesSet() {
        const temp = this.state.restrictLines === 0 ? 2 : 0;
        return this.setState({ restrictLines: temp });
    }

    renderLoader() {
        console.log('renderLoader', this.props.guideLoader);
        if (this.props.guideLoader || this.props.requestTourDetailLoader) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
    }
    onHeartIconPress(detail) {
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

    onClickShare() {
        console.log('share link11');
        // RNFetchBlob.fetch('GET', this.state.details.tourImageUrl, {
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
        // const img = 'data:image/png;base64,this.state.details.tourImageUrl';
        // const imgeUrl = 'data:image/png;base64,' + this.state.imageBase64;
        const urlArr = 'Apple: ' + 'https://apps.apple.com/in/app/tourzey/id1468639910' + '\n' +
            'Android: ' + 'https://play.google.com/store/apps/details?id=com.tourzey.tourzey&hl=en';
        const tourName = `Tour Name: ${this.state.details.tourName}.`;
        const tourDec = `\nTour Description: ${this.state.details.tourDesc}.\n`;
        const shareMessage = tourName + tourDec + urlArr;
        const shareOptions = {
            title: 'Tourzey',
            message: shareMessage,
            // url: imgeUrl,
        };
        Share.open(shareOptions);
    }

    onLoad = (data) => {
        console.log('On load fired!');
        this.setState({ duration: data.duration });
    };

    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    onBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
        this.setState({ isBuffering });
    };

    onGuidePress(guideDetail) {
        console.log('onGuidePress', this.state.isPaused);
        this.setState({
            isPaused: true
        }, () => {
            console.log('onGuidePress11111', this.state.isPaused);
            this.props.navigation.navigate('GuideProfile', { data: guideDetail });
        });
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
        console.log('render isPaused', this.state.isPaused);
        console.log('status', this.state.status);
        console.log('checkDetails', this.state.details);
        const { details, guideDetail, requestTourDetail, isBuffering } = this.state;
        console.log('guideDetail', details, guideDetail, requestTourDetail);
        let liked = '';
        if (_.includes(details.favoritedBy, this.props.userData.uid)) {
            liked = 'ok';
        }
        return (
            // <SafeAreaView>
            <ScrollView style={styles.mainContainer}>
                <View>
                    <View style={styles.mainView}>
                        <View>
                            <Image source={{ uri: details.tourImageUrl }} style={styles.tourImage} />
                        </View>
                        <TouchableOpacity style={styles.backIconView} onPress={() => this.onBackIconPress()}>
                            <Image
                                source={Images.icons.leftArrowWhiteIcon}
                                style={styles.backIcon}
                            />
                        </TouchableOpacity>
                        {liked === 'ok' ?
                            <TouchableOpacity style={styles.heartIconView} onPress={() => this.onHeartIconPress(details)}>
                                <Icon name="heart" style={styles.heartIconFilled} size={25} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.heartIconView} onPress={() => this.onHeartIconPress(details)}>
                                <Image source={Images.icons.heartIcon} style={styles.heartIcons} />
                            </TouchableOpacity>
                        }
                    </View>
                    {isStringEmpty(details.tourVideoUrl) &&
                        <View style={{ margin: 20, backgroundColor: 'rgba(0, 0, 0, 0.9)', alignItems: 'center', justifyContent: 'center' }}>
                            <Video
                                source={{ uri: details.tourVideoUrl }}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref;
                                }}
                                controls
                                onLoad={this.onLoad}
                                paused={this.state.isPaused}
                                onBuffer={this.onBuffer}
                                onEnd={() => this.setState({ isBuffering: false })}
                                onProgress={this.onProgress}
                                style={{ width: '100%', height: 200, justifyContent: 'center' }}
                            />
                            {isBuffering &&
                                <ActivityIndicator
                                    size="large" color="#000"
                                    style={{ opacity: 1, position: 'absolute', alignSelf: 'center' }}
                                />
                            }
                        </View>
                    }
                    <View style={styles.container}>
                        <View style={styles.infoView}>
                            <View style={styles.nameViewWrap}>
                                <View style={styles.nameView}>
                                    <View>
                                        <Text style={styles.tourName}>{details.tourName ? TitleCase(details.tourName) : '-'}</Text>
                                        <View style={styles.tourCategoryView}>
                                            <Text style={styles.tourCategoryStyle}>{details.tourLocation ? TitleCase(details.tourLocation) : '-'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.earningsView}>
                                <Text style={styles.earningAmount}>${details.tourPrice ? parseInt(details.tourPrice) : null}</Text>
                            </View>
                        </View>
                        {details.tourDesc ?
                            <View style={styles.tourDescView}>
                                <Text
                                    numberOfLines={this.state.restrictLines}
                                    style={styles.tourDesc}
                                    onPress={() => this.numberOflinesSet()}
                                >{details.tourDesc ? details.tourDesc : null}</Text>
                                {details.tourDesc && details.tourDesc.length > 123 &&
                                    <TouchableOpacity onPress={() => { this.numberOflinesSet(); }}>
                                        <Image
                                            source={this.state.restrictLines === 2 ?
                                                Theme.Images.icons.dropDown : Theme.Images.icons.dropup
                                            }
                                            style={styles.dropDownStyle}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                            :
                            null
                        }
                        <View style={styles.ratingView}>
                            <Icon name="home" style={styles.homeIcon} size={25} />
                            <Icon
                                name={details.lodgeFacility && details.lodgeFacility === 'Yes'
                                    ? 'check-circle' : 'times-circle'}
                                style={details.lodgeFacility && details.lodgeFacility === 'Yes'
                                    ? styles.tickIcon : styles.wrongIcon} size={25}
                            />
                            <Image
                                source={Theme.Images.icons.carIcon}
                                style={styles.carIcon}
                            />
                            <Icon
                                name={details.transportFacility && details.transportFacility === 'Yes'
                                    ? 'check-circle' : 'times-circle'}
                                style={details.transportFacility && details.transportFacility === 'Yes'
                                    ? styles.tickIcon : styles.wrongIcon} size={25}
                            />
                        </View>
                        <View style={styles.infoView}>
                            <View style={styles.guideViewWrap}>

                                <View style={styles.nameView}>
                                    <TouchableOpacity onPress={() => this.onGuidePress(guideDetail)}>
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
                                        <TouchableOpacity onPress={() => this.onGuidePress(guideDetail)}>
                                            <View style={styles.guideView}>
                                                <Text style={styles.nameStyling}>{guideDetail.fullName ? guideDetail.fullName : '-'}</Text>
                                                {details.guideCertified === true || guideDetail.certified === true ?
                                                    <Image source={Images.icons.qualityHighIcon} style={styles.qualityHighIcon} />
                                                    :
                                                    <Image source={Images.icons.qualityIcon} style={styles.qualityHighIcon} />
                                                }
                                            </View>
                                        </TouchableOpacity>
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
                                    <View style={styles.ratingPoint}>
                                        <Text style={styles.starCounttext}>{details.averageRatingCount}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {details.tourService && details.tourService.length > 1 ?
                            <View style={styles.tagView}>
                                {details.tourService.map((item, key) => (
                                    <TourCategoryGradientModal style={AppStyles.mainCategoryButton} name={item.toUpperCase()} />
                                ))
                                }
                            </View>
                            :
                            null
                        }
                        <View style={styles.dateAndTimeView}>
                            {this.state.status === 'notRequested' ?
                                <View style={styles.calendarView}>
                                    <DatePicker
                                        iconComponent={
                                            <Image source={Images.icons.calendarIcon} style={styles.calendarIcon} />
                                        }
                                        date={this.state.tourDate}
                                        mode="date"
                                        placeholder="Select Date"
                                        format="ll"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon
                                        minDate={this.state.minimumDate}
                                        textStyle={{ color: '#1f66dd', paddingBottom: 10, }}
                                        customStyles={{
                                            dateInput: {
                                                marginLeft: 10,
                                                borderWidth: 0,
                                                alignItems: 'flex-start',
                                                marginRight: 0,
                                            },
                                            dateText: {
                                                color: Colors.default,
                                                fontSize: 15,
                                            },
                                        }}
                                        onDateChange={(date) => { this.setState({ tourDate: date }); }}
                                    />
                                </View>
                                :
                                <View style={styles.calendarViewStyle}>
                                    <Text style={styles.tourDateText}>{requestTourDetail.tourDate}</Text>
                                    <Image source={Images.icons.calendarIcon} style={styles.calendarIconView} />
                                </View>
                            }
                            {this.state.status === 'notRequested' ?
                                <View style={styles.clockView}>
                                    <DatePicker
                                        iconComponent={
                                            <Image source={Images.icons.clockIcon} style={styles.clockIcon} />
                                        }
                                        date={this.state.tourTime}
                                        mode="time"
                                        placeholder="Select Date"
                                        format="HH:mm A"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon
                                        textStyle={{ color: '#1f66dd', paddingBottom: 10, }}
                                        customStyles={{
                                            dateInput: {
                                                marginLeft: 20,
                                                borderWidth: 0,
                                                alignItems: 'flex-start',
                                                marginRight: 0,
                                            },
                                            dateText: {
                                                color: Colors.default,
                                                fontSize: 15,
                                            },
                                        }}
                                        onDateChange={(time) => { this.setState({ tourTime: time }); }}
                                    />
                                </View>
                                :
                                <View style={styles.clockViewStyle}>
                                    <Text style={styles.tourDateText}>{requestTourDetail.tourTime}</Text>
                                    <Image source={Images.icons.clockIcon} style={styles.clockIconView} />
                                </View>
                            }
                            <TouchableOpacity onPress={() => { this.onClickShare(); }}>
                                <View style={styles.shareView}>
                                    <Image
                                        source={Theme.Images.icons.shareIcon}
                                        style={styles.iconStyle}
                                    />
                                    <Text style={styles.textStyle}>Share</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineStyle} />
                        {this.state.status === 'notRequested' ?
                            <View style={styles.addView}>
                                <TouchableOpacity onPress={() => this.onMinusPress()}>
                                    <View style={styles.minusIconView}>
                                        <Image source={Images.icons.minusIcon} style={styles.minusIcon} />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.countView}>
                                    <Text style={styles.countText}>{this.state.count}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.onPlusPress()}>
                                    <View style={styles.plusIconView}>
                                        <Image source={Images.icons.plusIcon} style={styles.plusIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            // requestTourDetail.count &&
                            <View style={styles.addView}>
                                <View style={styles.countView}>
                                    <Text style={styles.countText}>{requestTourDetail.count}</Text>
                                </View>
                            </View>
                        }
                    </View>
                    <View>
                        {this.state.status === 'notRequested' &&
                            <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onRequestTour.bind(this)}>
                                <LinearGradientView style={AppStyles.primaryBtn} name={'Request Tour'} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                {this.renderLoader()}
            </ScrollView>
            // </SafeAreaView>

        );
    }

}
export const mapStateToProps = (status) => {
    console.log(status, 'tourDesc det');
    const { userData } = status.getuserData;
    const {
        guideDetail,
        guideLoader,
        error
    } = status.guideDetail;
    const {
        requestTourStatus,
        requestTourDetailLoader,
        requestTourDetail,
    } = status.requestTourData;
    const { updateFavoriteError, favoriteLoading, favoriteStatus, updateFavorite, favoriteData } = status.updateFavoriteTour;
    return {
        userData,
        guideDetail,
        guideLoader,
        error,
        requestTourStatus,
        requestTourDetailLoader,
        requestTourDetail,
        updateFavoriteError,
        favoriteLoading,
        favoriteStatus,
        updateFavorite,
        favoriteData
    };
};

export default connect(mapStateToProps, { getGuideDetail, getRequestTourDetail, updateFavoriteTour })(TourDescription);
