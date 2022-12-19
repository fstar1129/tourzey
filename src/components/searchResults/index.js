
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TouchableOpacity, Image,
    ListView, Platform, ActivityIndicator, Alert, Modal
} from 'react-native';
import { Thumbnail, Label } from 'native-base';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Video from 'react-native-video';
import _ from 'lodash';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Images from '../../themes/main/Theme.Main.Images';
import Videos from '../../themes/main/Theme.Main.Videos';
import {
    findTours, updateFavoriteTour, getCategoryTours
} from '../../action/index';
import TourCategoryGradientModal from '../common/gradient/tourCategoryGradient';

import styles from './styles';
import { TitleCase } from '../../utils/caseFormat';
import { isArrayEmpty, isObjectEmpty, isStringEmpty } from '../../utils/checkEmptycondition';
import VideoLoader from '../videoLoader/index';

class SearchResults extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.headerTitle : null,
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: navigation.state.params.headerRight,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.default,
            fontSize: Theme.Font.sizes.regular,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
    });
    constructor() {
        super();
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            currentCity: '',
            selectCity: '',
            toursData: [],
            loading: false,
            imageLoader: true,
            count: 0,
            favoriteDetail: {},
            status: '',
            filter: false,
            clickedCertified: false,
            clickedRating: false,
            clickedPrice: false,
            multiSliderValue: [300, 700],
            tourValue: [],
            categoryTour: false,
            categoryLocationTour: false

        };
    }

    componentWillMount() {
        this.setState({ loading: true });
        const { isCategory, category } = this.props.navigation.state.params;
        if (isObjectEmpty(this.props.userData)) {
            if (isStringEmpty(this.props.userData.location)) {
                this.setState({
                    categoryTour: false,
                    categoryLocationTour: false
                }, () => {
                    this.props.findTours(this.props.userData.location, isCategory, category);
                });
            } else {
                this.setState({
                    categoryTour: true,
                    categoryLocationTour: false
                }, () => {
                    this.props.getCategoryTours(isCategory, category);
                });
            }
        }
    }

    componentDidMount() {
        const { category } = this.props.navigation.state.params;
        let value = '';
        if (category) {
            value = TitleCase(category);
        }
        this.props.navigation.setParams({
            headerTitle: value
        });

        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.leftArrowIcon}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>,
        });

        this.props.navigation.setParams({
            headerRight:
                <TouchableOpacity onPress={() => this.onFilterPress()}>
                    <Image source={Images.icons.filtersIcon} style={styles.filterIconStyle} />
                </TouchableOpacity>,
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('gfasd', nextProps, nextProps.toursData);

        if (nextProps.toursData !== this.props.toursData) {
            if (isArrayEmpty(nextProps.toursData)) {
                this.setState({
                    categoryTour: false,
                    categoryLocationTour: false
                }, () => {
                    this.setState({ toursData: nextProps.toursData, tourValue: nextProps.toursData });
                });
            } else if (nextProps.toursData.length === 0 && nextProps.loaderVal === false) {
                console.log('params nextProps', this.props.navigation.state.params);
                if (isObjectEmpty(this.props.navigation.state.params)) {
                    const { isCategory, category } = this.props.navigation.state.params;
                    this.setState({
                        categoryTour: false,
                        categoryLocationTour: true
                    }, () => {
                        this.props.getCategoryTours(isCategory, category);
                    });
                }
            }
        }
        if (nextProps.categoryTour !== this.props.categoryTour) {
            this.setState({ toursData: nextProps.categoryTour, tourValue: nextProps.categoryTour });
        }
        if (nextProps.favoriteData !== this.props.favoriteData) {
            if (nextProps.favoriteStatus === 'liked' || nextProps.favoriteStatus === 'unliked') {
                // this.props.getToursData(this.props.userData.location);
                this.setState({
                    status: nextProps.favoriteStatus
                });
            }
        }
    }

    onFilterPress() {
        const { isCategory, category } = this.props.navigation.state.params;
        if (!isObjectEmpty(this.state.toursData)) {
            Alert.alert(
                'Filter is failed',
                'No data is available to apply filter. So please either click Ok to reload or go back to choose category ',
                [
                    {
                        text: 'Ok', onPress: () => this.props.findTours(this.props.userData.location, isCategory, category)
                    },
                    { text: 'Cancel', style: 'cancel' },
                ],
                { cancelable: false }
            );
        } else {
            this.setState({
                filter: true
            });
        }
    }
    onDone() {
        const { isCategory, category } = this.props.navigation.state.params;
        this.setState({
            filter: false,

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
                        // this.props.getToursData(this.props.userData.location);
                        this.props.findTours(this.props.userData.location, isCategory, category);
                    } else {
                        this.props.getCategoryTours(isCategory, category);
                    }
                });
            } else if (this.state.name === 'price') {
                this.onPriceFilter(this.state.multiSliderValue);
            } else {
                //do nothing
                // this.props.findTours(this.props.userData.location, isCategory, category);
            }
        });
    }

    onTourImagePress(details) {
        this.props.navigation.navigate('TourDesc', { tourDetails: details });
    }

    renderLoader() {
        console.log('renderLoader', this.props.loaderVal, this.props.favoriteLoading, this.props.categoryTourLoader);
        if (this.props.loaderVal === true || this.props.favoriteLoading === true || this.props.categoryTourLoader === true) {
            console.log('params renderLoader', this.props.loaderVal, this.props.favoriteLoading, this.props.navigation.state.params);
            const params = this.props.navigation.state.params;
            return (
                <VideoLoader
                    tourType={params && params.category ?
                        params.category : 'Others'}
                        screen={'Category'}
                />
            );
        } else {
            return false;
        }
    }
    onclose() {
        this.setState({
            filter: false
        });
    }
    onResetPress() {
        this.setState({
            name: 'reset',
        }, () => {
            this.onDone();
        });
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
        this.state.toursData.map((eachTour, index) => {
            console.log(eachTour.guideDetails.certified, eachTour, 'certifiedGUide');
            if (eachTour.guideDetails.certified === true) {
                tourCertified.push(eachTour);
            }
        });
        this.setState({
            toursData: tourCertified
        }, () => {
        });
    }
    ratedTourList() {
        const orderTourList = _.orderBy(this.state.toursData, ['averageRatingCount'], ['desc']);
        this.setState({
            toursData: orderTourList
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
        console.log('onpriceFilter', this.state.multiSliderValue);
        const startRange = this.state.multiSliderValue[0];
        const endRange = this.state.multiSliderValue[1];
        const priceFilteredtoursData = [];
        this.state.tourValue.map((eachTour, index) => {
            console.log(eachTour.tourPrice, eachTour.tourPrice > startRange && eachTour.tourPrice <= endRange, 'Hiiii');
            if (eachTour.tourPrice > startRange && eachTour.tourPrice < endRange) {
                priceFilteredtoursData.push(eachTour);
            }
        });
        const orderedData = _.orderBy(priceFilteredtoursData, ['tourPrice'], ['asc']);

        this.setState({
            toursData: orderedData
        }, () => {
        });
    }
    onRatingPress() {
        // this.props.getRatedGuideDetails();
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
    onImageLoad() {
        ++this.state.count;
        if (isArrayEmpty(this.state.toursData)) {
            if (this.state.count === this.state.toursData.length) {
                this.setState({
                    imageLoader: false,
                    count: 0
                }, () => {

                });
            }
        }
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
    renderRow(item) {
        console.log('item searchResults', item);
        let liked = '';
        if (_.includes(item.favoritedBy, this.props.userData.uid)) {
            liked = 'ok';
        }
        return (
            <View style={styles.homeContainer}>
                <View style={styles.mainView}>
                    <TouchableOpacity onPress={() => this.onTourImagePress(item)}>
                        {this.state.imageLoader === true &&
                            <ActivityIndicator size={Platform.OS === 'ios' ? 0 : 25} />}
                        <Image
                            source={{ uri: item.tourImageUrl }}
                            style={styles.tourImageStyle}
                            onLoad={() => this.onImageLoad()}
                        />
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
                <View style={styles.container}>
                    <View style={styles.infoView}>
                        <View style={styles.tourNameView}>
                            <Text style={styles.tourNameStyling}>{TitleCase(item.tourName)}</Text>
                            {isStringEmpty(item.tourVideoUrl) &&
                                <Icon name="play-circle" style={styles.video} size={25} />
                            }
                        </View>
                        <View style={styles.earningsView}>
                            <Text style={styles.earningAmount}>${item.tourPrice ? parseInt(item.tourPrice) : 0}</Text>
                        </View>
                    </View>

                    <View style={styles.infoView}>
                        <View style={styles.nameViewWrap}>
                            <View style={styles.nameView}>
                                {/*  todo-cr-mi: suren @jana - use ternary operator */}
                                {item.guideDetails.imageData === '' ?
                                    <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                    :
                                    <Thumbnail style={styles.userImage} source={{ uri: item.guideDetails.imageData.uri }} />
                                }
                                <View style={styles.nameSpacing}>

                                    <View style={styles.guideView}>
                                        <Text style={styles.nameStyling}>{item.guideDetails.fullName}</Text>
                                        {item.guideDetails.certified === true ?
                                            <Image source={Images.icons.qualityHighIcon} style={styles.qualityHighIcon} />
                                            :
                                            <Image source={Images.icons.qualityIcon} style={styles.qualityHighIcon} />
                                        }
                                    </View>
                                    <View style={styles.textView}>
                                        <Text style={styles.addressStyling}>{TitleCase(item.guideDetails.address)}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={styles.categoryView}>
                            <View>
                                {item.tourService && item.tourService.length === 1 ?
                                    //  todo-cr-mi: suren @jana  remove unused parameters
                                    item.tourService.map((val, key) => (
                                        <View style={AppStyles.tochableButton}>
                                            <TourCategoryGradientModal style={styles.categoryButton} name={val.toUpperCase()} />
                                        </View>
                                    ))
                                    :
                                    null
                                }
                            </View>
                            {/* rating is staticc */}
                            <View style={styles.ratingView}>
                                <StarRating
                                    halfStarEnabled
                                    disabled
                                    maxStars={5}
                                    rating={item.averageRatingCount ? item.averageRatingCount : 0}
                                    starSize={20}
                                    fullStarColor={'#f2b518'}
                                    starStyle={styles.starSpacing}
                                />
                                <View style={styles.ratingPoint}>
                                    <Text style={styles.starCounttext}>{item.averageRatingCount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {item.tourService && item.tourService.length > 1 ?
                        <View style={styles.tagView}>
                            {item.tourService.map((val, key) => (
                                <TourCategoryGradientModal style={styles.mainCategoryButton} key={key} name={val.toUpperCase()} />
                            ))
                            }
                        </View>
                        :
                        null
                    }
                </View>
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
                                {/* <MultiSlider 
                                enabledTwo={true}
                                step={1}
                                min={1}
                                max={1500}
                                onToggleOne={() => { console.log('toggle1'); }}
                                onToggleTwo={() => { console.log('toggle2'); }}
                                /> */}
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

            </View>
        );
    }

    render() {
        let loaderValue = '';
        if (this.props.loaderVal === false && this.props.favoriteLoading === false && this.props.categoryTourLoader === false) {
            loaderValue = 'Not loading';
        } else {
            loaderValue = 'loading';
        }
        let location = '';
        if (isObjectEmpty(this.props.userData) && isStringEmpty(this.props.userData.location)) {
            location = this.props.userData.location;
        }
        const { toursData } = this.state;
        return (
            <View style={styles.scrollContainer}>
                {this.state.categoryTour === true && loaderValue === 'Not loading' ?
                    <View style={styles.suggestionView}>
                        <Label style={styles.suggestionTextStyle}>New tours are on the way, meanwhile showing related tours from other locations...</Label>
                    </View>
                    :
                    this.state.categoryLocationTour === true && loaderValue === 'Not loading' ?
                        <View style={styles.suggestionView}>
                            <Label style={styles.suggestionTextStyle}>New tours are on the way for <Text>{'"'}</Text><Text style={{ fontWeight: 'bold' }}>{location}</Text><Text>{'"'}</Text>, meanwhile showing related tours from other locations....</Label>
                        </View>
                        :
                        loaderValue === 'Not loading' &&
                        null
                }
                {toursData && toursData.length > 0 &&
                    <ScrollView >
                        <ListView
                            dataSource={this.ds.cloneWithRows(toursData)}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections
                        />
                    </ScrollView>
                }
                {toursData && toursData.length === 0 && loaderValue === 'Not loading' &&
                    <View style={styles.nodataInfo}>
                        <Text style={styles.nodataText}>
                            No data available
                          </Text>
                    </View>
                }
                {this.renderLoader()}
            </View>
        );
    }
}

export const mapStateToProps = (status) => {
    // console.log(status, 'npst');
    const { userData } = status.getuserData;
    const { toursData, loaderVal, error } = status.getJobDetails;
    const { updateFavoriteError, favoriteLoading, favoriteStatus, updateFavorite, favoriteData } = status.updateFavoriteTour;
    const { categoryTourLoader, categoryTour } = status.getApprovedTour;
    return {
        userData,
        toursData,
        loaderVal,
        error,
        updateFavoriteError,
        favoriteLoading,
        favoriteStatus,
        updateFavorite,
        favoriteData,
        categoryTourLoader,
        categoryTour
    };
};

export default connect(mapStateToProps, { findTours, updateFavoriteTour, getCategoryTours })(SearchResults);
