import React, { Component } from 'react';
import { TouchableOpacity, Linking, ScrollView, ListView, Image, Text, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
import { View, Thumbnail, Button, Toast } from 'native-base';
import styles from './styles';
import Images from '../../themes/main/Theme.Main.Images';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import * as checkEmpty from '../../utils/checkEmptycondition';
import { TitleCase } from '../../utils/caseFormat';

export default class GuideProfile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerLeft:
            navigation.state.params && navigation.state.params.headerLeft,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            // color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.medium,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8

        },
    });
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            galleryactivityLoader: false,
            profilegActivityLoader: true,
            youtubeCheck: false,
            facebookCheck: false,
            instagramCheck: false,
            youtubeLink: '',
            facebookLink: '',
            instagramLink: '',
            socialIconcheck: false,
            restrictLines: 2,
        };
    }
    componentWillMount() {
        console.log('checkingGuide', this.props.navigation.state.params.data.youtubeLink);
        if (checkEmpty.isObjectEmpty(this.props.navigation.state.params)) {
            const data = this.props.navigation.state.params.data;
            this.setState({
                fullName: data.fullName ? data.fullName : '',
                location: data.address ? data.address : '',
                descripition: data.description ? data.description : '',
                gallery: data.gallery ? data.gallery : [],
                image: data.imageData ? data.imageData : {},
                language: data.languages ? data.languages : [],
                certified: data.certified ? data.certified : false,
                youtubeLink: data.youtubeLink ? data.youtubeLink : '',
                facebookLink: data.facebookLink ? data.facebookLink : '',
                instagramLink: data.instagramLink ? data.instagramLink : ''
            }, () => {
                console.log('cgeckibglang', this.state.youtubeLink);
            });
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
    // Todocr use common function for setState a variable
    onClickyoutube() {
        console.log('onclick you tube');
        if (this.state.youtubeLink) {
            const val = _.startsWith(this.state.youtubeLink, 'https://') ? this.state.youtubeLink : `https://${this.state.youtubeLink}`;
            Linking.openURL(val);
        } else {
            Toast.show({
                text: 'Youtube not linked',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            });
        }
    }
    onClickfacebook() {
        if (this.state.facebookLink) {
            const val = _.startsWith(this.state.facebookLink, 'https://') ? this.state.facebookLink : `https://${this.state.facebookLink}`;
            Linking.openURL(val);
        } else {
            Toast.show({
                text: 'Facebook not linked',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            });
        }
    }
    onClickintagram() {
        if (this.state.instagramLink) {
            const val = _.startsWith(this.state.instagramLink, 'https://') ? this.state.instagramLink : `https://${this.state.instagramLink}`;
            Linking.openURL(val);
        } else {
            console.log('insta else');
            Toast.show({
                text: 'Instagram not linked',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            });
        }
    }

    onViewImage(image) {
        if (checkEmpty.isObjectEmpty(image)) {
            if (checkEmpty.isStringEmpty(image.uri)) {
                this.props.navigation.navigate('Media', { imageUrl: image.uri });
            }
        }
    }

    numberOflinesSet() {
        const temp = this.state.restrictLines === 0 ? 2 : 0;
        return this.setState({ restrictLines: temp });
    }

    scrollAction(height) {
        if (this.state.youtubeCheck === true || this.state.facebookCheck === true || this.state.instagramCheck === true) {
            this.refs.scrollView.scrollTo({ y: height });
        }
    }

    onMessagePress() {
        console.log(this.props.navigation.state.params.data, 'Check role');
        // this.props.navigation.navigate('Message');
        AsyncStorage.getItem('userdata').then((val) => {
            const list = JSON.parse(val);
            const status = _.find(list.blockList, (o) => {
                console.log(o, this.props.navigation.state.params.data.uid, 'status');
                return o === this.props.navigation.state.params.data.uid;
            });
            if (this.props.navigation.state.params.data) {
                let blockedStatus;
                if (status === undefined || status === false || status === null) {
                    blockedStatus = false;
                }
                if (status) {
                    blockedStatus = true;
                }
                this.props.navigation.navigate('MessageScreen', {
                    data: this.props.navigation.state.params.data,
                    userData: this.props.navigation.state.params.data,
                    blockedStatus,
                    role: 'client'
                });

                //  this.props.navigation.navigate('MessageScreen', { data: this.props.navigation.state.params.data, type: 'conversation', role: 'client', blockedStatus });
            }
        });
    }

    render() {
        return (
            <SafeAreaView >
                <View style={styles.viewStyle}>
                    <ScrollView
                        style={styles.ScrollViewStyle}
                        ref="scrollView"
                        onContentSizeChange={(width, height) => this.scrollAction(height)}
                    >
                        <View style={styles.Thumbnail}>
                            {/* <Image
                                onLoadStart={() => this.setState({ profilegActivityLoader: true })}
                                onLoadEnd={() => this.setState({ profilegActivityLoader: false })}
                                source={this.state.image.uri ? { uri: this.state.image.uri } :
                                    Theme.Images.icons.agentIcon} style={styles.userImage}
                            /> */}
                            <Thumbnail
                                onLoadStart={() => this.setState({ profilegActivityLoader: true })}
                                onLoadEnd={() => this.setState({ profilegActivityLoader: false })}
                                style={styles.userImage}
                                source={this.state.image && this.state.image.uri ?
                                    { uri: this.state.image.uri }
                                    :
                                    Theme.Images.profile_screen.default_avatar
                                }
                            />
                            {this.state.profilegActivityLoader && <View><ActivityIndicator style={styles.userImagestyle} /></View>}
                        </View>
                        <View style={styles.Thumbnail}>
                            <Text style={styles.textStyle}>{this.state.fullName}</Text>
                            {
                                this.state.certified === true ?
                                    <View ><Image source={Images.icons.qualityHighIcon} style={styles.qualityStyle} /></View>
                                    :
                                    <View><Image source={Images.icons.qualityIcon} style={styles.qualityStyle} /></View>
                            }
                        </View>
                        <View style={styles.textArea}>
                            <Text style={styles.textStyle2}>{TitleCase(this.state.location)}</Text>
                        </View>
                        <View style={styles.desStyle}>
                            <Text style={styles.textStyle}>Bio</Text>
                        </View>
                        <View style={styles.desStyle2}>
                            {this.state.descripition ?
                                <View style={styles.tourDescView}>
                                    <Text
                                        style={styles.textStyle2}
                                        numberOfLines={this.state.restrictLines}
                                        onPress={() => this.numberOflinesSet()}
                                    >{this.state.descripition}</Text>
                                    {this.state.descripition && this.state.descripition.length > 123 &&
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
                                <Text style={styles.textStyle2}>No Data</Text>
                            }

                        </View>
                        <View style={styles.desStyle}>
                            <Text style={styles.textStyle}>Gallery</Text>
                        </View>
                        <View style={styles.Thumbnail2}>
                            {this.state.gallery && this.state.gallery.length > 0 ?
                                this.state.gallery.map((val) => (
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        onPress={() => { this.onViewImage(val); }}
                                    >
                                        <Image
                                            onLoadStart={() => this.setState({ galleryactivityLoader: true })}
                                            onLoadEnd={() => this.setState({ galleryactivityLoader: false })}
                                            source={val} style={styles.galleryStyle}
                                        />
                                    </TouchableOpacity>
                                ))
                                :
                                <Text style={styles.textStyle2}>No Data</Text>
                            }
                            {this.state.galleryactivityLoader && <View><ActivityIndicator style={styles.loaderStyle} /></View>}
                        </View>
                        <View style={styles.desStyle}>
                            <Text style={styles.textStyle}>Languages</Text>
                        </View>
                        <View style={styles.lanStyle}>
                            {this.state.language && this.state.language.length > 0 ?

                                this.state.language.map((val) => (

                                    <Button
                                        light style={styles.tagButton}
                                        upperCase
                                    >
                                        <Text style={styles.lanText3}>{val}</Text>
                                    </Button>
                                ))

                                :
                                <Text style={styles.textStyle2}>No Data</Text>

                            }
                        </View>
                        <View style={this.state.socialIconcheck === true ? styles.imageStyle1 : styles.imageStylewithinput}>
                            <TouchableOpacity onPress={this.onClickyoutube.bind(this)}>
                                <View
                                    style={this.state.youtubeLink ? styles.iconStyle : styles.disableIconStyle}
                                >
                                    <Image
                                        source={Theme.Images.icons.youtubeIcon}
                                        style={styles.imageStyle}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onClickfacebook.bind(this)}>
                                <View
                                    style={this.state.facebookLink ? styles.iconStyle2 : styles.disableIconStyle2}
                                >
                                    <Image
                                        source={Theme.Images.icons.facebookIcon}
                                        style={styles.imageStyle2}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onClickintagram.bind(this)}>
                                <View
                                    style={this.state.instagramLink ? styles.iconStyle2 : styles.disableIconStyle2}
                                >
                                    <Image
                                        source={Theme.Images.icons.instagramIcon}
                                        style={styles.imageStyle2}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.socialIconinput}>
                            {this.state.youtubeCheck === true &&
                                <View style={styles.profileContainer}>
                                    <Text style={styles.textHeader}>Youtube Link</Text>
                                    <TextInput
                                        style={styles.textinputStyle}
                                        editable={false}
                                        underlineColorAndroid="gray"
                                        placeholder='No youtube Link available'
                                        value={this.state.youtubeLink}
                                        onChangeText={youtubeLink => this.setState({ youtubeLink })}
                                    />
                                </View>
                            }
                            {this.state.facebookCheck === true &&
                                <View style={styles.profileContainer}>
                                    <Text style={styles.textHeader}>Facebook Link</Text>
                                    <TextInput
                                        style={styles.textinputStyle}
                                        editable={false}
                                        underlineColorAndroid="gray"
                                        placeholder='No facebook Link available'
                                        value={this.state.facebookLink}
                                        onChangeText={facebookLink => this.setState({ facebookLink })}
                                    />
                                </View>
                            }
                            {this.state.instagramCheck === true &&
                                <View style={styles.profileContainer}>
                                    <Text style={styles.textHeader}>Instagram Link</Text>
                                    <TextInput
                                        style={styles.textinputStyle}
                                        editable={false}
                                        underlineColorAndroid="gray"
                                        placeholder='No instagram Link available'
                                        value={this.state.instagramLink}
                                        onChangeText={instagramLink => this.setState({ instagramLink })}
                                    />
                                </View>
                            }
                        </View> */}
                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity style={[AppStyles.tochableButton, AppStyles.tochableView]} onPress={() => this.onMessagePress()} >
                        <LinearGradientView style={AppStyles.bottomButton} name={'Message'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        );
    }
}

