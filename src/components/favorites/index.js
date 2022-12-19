
import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, ListView, Platform, ActivityIndicator } from 'react-native';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Images from '../../themes/main/Theme.Main.Images';
import {
    getFavoriteTours
} from '../../action/index';
import TourCategoryGradientModal from '../common/gradient/tourCategoryGradient';

import styles from './styles';
import { TitleCase } from '../../utils/caseFormat';
import _ from 'lodash';

class FavoriteTours extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.headerTitle : null,
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: null,
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
            favoriteTours: [],
            loading: false,
            imageLoader: true,
            count: 0
        };
    }

    componentWillMount() {
        this.setState({ loading: true });
        this.props.getFavoriteTours(this.props.userData.uid);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerTitle: 'Favorites'
        });

        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                      <View style={styles.backIconViewStyle}>
                    <Image
                        source={Theme.Images.icons.leftArrowIcon}
                        style={styles.backIcon}
                    />
                    </View>
                </TouchableOpacity>,
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('gfasd', nextProps, nextProps.favoriteTourData);
        if (nextProps.favoriteTourData !== this.props.favoriteTourData) {
            this.setState({ favoriteTours: nextProps.favoriteTourData });
        }
    }


    onTourImagePress(details) {
        this.props.navigation.navigate('TourDesc', { tourDetails: details });
    }

    renderLoader() {
        console.log('loaderVal', this.props.loaderVal, this.state.loading);
        if (this.props.favoriteTourLoader) {
            this.state.visible = true;
            return (
                <View style={{ justifyContent: 'center' }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
    }
    //    {/* todo-cr-mi: suren @jana -remove unused function call mi  - completed*/}

    onImageLoad() {
        console.log('onImageLoad');
        ++this.state.count;
        if (this.state.count === this.state.favoriteTours.length) {
            console.log('count', this.state.count);
            this.setState({
                imageLoader: false,
                count: 0
            }, () => {

            });
        }
    }
    renderRow(item) {
        console.log('searchResults', item);
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
                    <TouchableOpacity style={styles.heartIconView}>
                        <Icon name="heart" style={styles.heartIconFilled} size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.infoView}>
                        <View style={styles.tourNameView}>
                            <Text style={styles.tourNameStyling}>{TitleCase(item.tourName)}</Text>
                        </View>
                        <View style={styles.earningsView}>
                            <Text style={styles.earningAmount}>${item.tourPrice ? parseInt(item.tourPrice) : 0}</Text>
                        </View>
                    </View>

                    <View style={styles.infoView}>
                        <View style={styles.nameViewWrap}>
                            <View style={styles.nameView}>
                                {item.guideDetails.imageData === '' ?
                                    <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                    :
                                    <Thumbnail style={styles.userImage} source={{ uri: item.guideDetails.imageData.uri }} />
                                }
                                <View style={styles.nameSpacing}>
                                    <Text style={styles.nameStyling}>{item.guideDetails.fullName}</Text>
                                    <View style={styles.textView}>
                                        <Text style={styles.addressStyling}>{TitleCase(item.guideDetails.address)}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={styles.categoryView}>
                            <View>
                                {item.tourService && item.tourService.length === 1 ?
                                    item.tourService.map((val, key) => (
                                        <TouchableOpacity style={AppStyles.tochableButton}>
                                            <TourCategoryGradientModal style={styles.categoryButton} name={val.toUpperCase()} />
                                        </TouchableOpacity>
                                    ))
                                    :
                                    null
                                }
                            </View>
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

            </View>
        );
    }

    render() {
        const { favoriteTours } = this.state;
        let loaderValue = '';
        if (this.props.favoriteTourLoader === false) {
            loaderValue = 'Not loading';
        } else {
            loaderValue = 'loading';
        }
        return (
                <View style={styles.scrollContainer}>
                    {favoriteTours && favoriteTours.length > 0 &&
                        <ScrollView >
                            <ListView
                                dataSource={this.ds.cloneWithRows(favoriteTours)}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections
                            />
                        </ScrollView>
                    }
                    {favoriteTours && favoriteTours.length === 0 && loaderValue === 'Not loading' &&
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
    console.log(status, 'npst');
    const { userData } = status.getuserData;
    const { favoriteTourData,
        favouriteTourError,
        favoriteTourLoader } = status.getFavoriteTour;
    return {
        userData,
        favoriteTourData,
        favouriteTourError,
        favoriteTourLoader
    };
};

export default connect(mapStateToProps, { getFavoriteTours })(FavoriteTours);
