
import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Body, Label, Item, Textarea, Input } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { NavigationActions, StackActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import { mapApiKey } from '../../utils/constants';
import {
    updateProfileDetails, fetchData
} from '../../action/index';


import styles from './styles';


class SearchLocation extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Location',
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
        this.state = {
            currentCity: '',
            selectCity: '',
        };
    }

    componentWillMount() {
        if (this.props.navigation.state.params.userdata) {
            this.setState({ currentCity: this.props.navigation.state.params.userdata.location });
        }
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
    }
    componentWillReceiveProps(nextProps) {
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
    }

    onSavePress() {
        console.log('LaunchScreen2', this.props.navigation.state.params);
        const userdata = this.props.navigation.state.params.userdata;
        const data = {
            fullName: userdata.fullName,
            email: userdata.email,
            address: userdata.address,
            phone: userdata.phone,
            imageData: userdata.imageData,
            setting: userdata.setting,
            videoUrl: userdata.videoUrl,
            gallery: userdata.galleryImages,
            location: this.state.selectCity,
            password: userdata.password,
            description: userdata.description,
            currentUserId: userdata.uid
        };
        console.log('data', data);
        this.props.updateProfileDetails(data);
    }

    selectLocation(details) {
        console.log(details, 'details');
        if (details.description === 'Current Location') {
            axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${details.geometry.location.lat},${details.geometry.location.lng}&key=${mapApiKey}`)
                .then((mapdata) => {
                    console.log(mapdata, 'mapdata ', mapdata.data.results[0].formatted_address);
                    const results = mapdata.data.results[0].address_components;
                    const city = this.findResult(results, "locality");
                    const state = this.findResult(results, "administrative_area_level_1");
                    const country = this.findResult(results, "country");
                    const currentLocation = city + ',' + state + ',' + country;
                    this.setState({ selectCity: currentLocation });
                });
        } else {
            this.setState({ selectCity: details.formatted_address });
        }
    }

    findResult(results, name) {
        console.timeLog(results, 'reas');
        this.result = _.find(results, (obj) => {
            console.log(obj, 'obj');
            return obj.types[0] === name && obj.types[1] === "political";
        });
        return this.result ? this.result.short_name : null;
    }

    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.props.loading} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <ScrollView>
                    <View style={styles.profileContainer}>
                        <View style={styles.headerView} >
                            <Label style={styles.labelStyle}>Current City</Label>
                            <Text style={styles.textStyle}>{this.state.currentCity}</Text>
                        </View>
                        <View style={styles.searchLineStyle} />
                        <View style={styles.cityView}>
                            <Label style={styles.selectLabelStyle}>Select City</Label>
                            <View style={styles.inputView}>
                                {/* <Input
                                    placeholderTextColor="#ABABAB"
                                    placeholder="Enter your city..."
                                    style={styles.searchItemStyle}
                                    value={this.state.selectCity}
                                    onChangeText={(text) => this.setState({ selectCity: text })}
                                /> */}
                                <GooglePlacesAutocomplete
                                    placeholder='Search'
                                    minLength={2} // minimum length of text to search
                                    autoFocus={false}
                                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                    listViewDisplayed={false}    // true/false/undefined
                                    fetchDetails={true}
                                    // renderDescription={row => row.description} // custom description render
                                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                        console.log(data, details);
                                        this.selectLocation(details);
                                    }}

                                    getDefaultValue={() => ''}

                                    query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: 'AIzaSyAeODubKk9sups2xh8yXBVWgM1UHJCUSe4',
                                        language: 'en', // language of the results
                                        types: '(cities)' // default: 'geocode'
                                    }}

                                    style={styles.searchItemStyle, styles.searchAddressStyle}
                                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                    currentLocationLabel="Current Location"
                                    nearbyPlacesAPI='None' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                    GoogleReverseGeocodingQuery={{
                                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                    }}
                                    GooglePlacesSearchQuery={{
                                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                        rankby: 'distance',
                                        type: 'cafe'
                                    }}

                                    GooglePlacesDetailsQuery={{
                                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                        fields: 'formatted_address',
                                    }}

                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                    //   predefinedPlaces={[homePlace, workPlace]}

                                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                                />
                            </View>
                        </View>
                    </View>
                    {this.renderLoader()}
                </ScrollView>
                <TouchableOpacity onPress={this.onSavePress.bind(this)}>
                    <LinearGradientView style={AppStyles.submitBtn} name={'Save'} />
                </TouchableOpacity>
            </View>
        );
    }
}

export const mapStateToProps = (state) => {
    console.log('state', state.imageData);
    const { userData } = state.getuserData;
    const { updateDetails, error, loading, update } = state.updateDetail;
    console.log('userData', userData);

    return {

        userData,
        updateDetails,
        error,
        loading,
        update,
    };
};

export default
    connect(mapStateToProps, {
        updateProfileDetails, fetchData
    })(SearchLocation);

