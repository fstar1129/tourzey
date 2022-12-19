import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Alert, Modal, Image, Dimensions, AsyncStorage, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
//todo cr @srini Mi-remove unused imports
import Spinner from 'react-native-loading-spinner-overlay';
import {
    View, Thumbnail, Text, Button, Textarea
} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import {
    getImageUrl, fetchData, updateProfileDetails, getMultipleImageUrl, onDeleteImage
} from '../../action/index';
// import { isStringEmpty, isObjectEmpty } from '../../utils/checkEmptycondition';
import { alertMessage } from '../../utils/showMessage';

//todo cr @srini Mi-remove unused const variable
class ProfileEdit extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            // color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        }
    });
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            oldPassword: '',
            newPassword: '',
            phone: '',
            selectImage: false,
            imageData: '',
            description: '',
            address: '',
            setting: {},
            videoUrl: '',
            gallery: '',
            location: '',
            passportActivityLoader: true,
            userData: {},
            height: 80
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('userdata').then(async res => {
            this.setState({ userData: JSON.parse(res) });
            this.setUserData();
        });
    }

    setUserData() {
        if (this.state.userData !== null) {
            const data = this.state.userData;
            this.setState({
                imageData: data.imageData ? data.imageData : '',
                fullName: data.fullName ? data.fullName : '',
                email: data.email ? data.email : '',
                password: data.password ? data.password : '',
                phone: data.phone ? data.phone : '',
                description: data.description ? data.description : '',
                address: data.address ? data.address : '',
                setting: data.setting ? data.setting : '',
                videoUrl: data.videoUrl ? data.videoUrl : '',
                gallery: data.galleryImages ? data.galleryImages : '',
                location: data.location ? data.location : ''
            }, () => {
                console.log('aaaaaaaaaa', this.state);
            });
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.leftArrowIcon}
                        style={AppStyles.backIcon}
                    />
                </TouchableOpacity>,
        });
    }


    async componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
        if (nextProps.imageDetail !== this.props.imageDetail) {
            // this.props.fetchData();
            this.setState({
                imageData: nextProps.imageDetail.imageData
            });
        }
        if (this.props.updateDetails !== nextProps.updateDetails) {
            AsyncStorage.getItem('userdata').then(async res => {
                this.setState({ userData: JSON.parse(res) });
                this.setUserData();
            });
            // this.props.fetchData();
            // const resetAction = NavigationActions.reset({
            //     index: 0,
            //     actions: [
            //         NavigationActions.navigate({ routeName: 'Jobs' })
            //     ]
            // });
            // this.props.navigation.dispatch(resetAction);
        }
    }

    onclose() {
        this.setState({
            selectImage: false
        });
    }

    onSavePress() {
        const {
            imageData,
            fullName,
            email,
            phone,
            description,
            address,
            setting,
            videoUrl,
            gallery,
            location } = this.state;
        const data = {
            imageData,
            fullName,
            email,
            phone,
            description,
            address,
            setting,
            videoUrl,
            gallery,
            location
        };
        console.log('onSavePress', data);
        this.props.updateProfileDetails(data);
    }

    selectImage() {
        this.setState({
            selectImage: true
        });
    }

    pickSingle(circular = false) {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(imageInfo => {
            this.setState({
                selectImage: false
            });
            if (imageInfo && imageInfo !== undefined && imageInfo !== {}) {
                if (imageInfo.mime === 'image/jpeg') {
                    this.setState({
                        imageInfo: {
                            uri: imageInfo.path,
                            width: imageInfo.width,
                            height: imageInfo.height,
                            mime: imageInfo.mime
                        },
                        images: null
                    }, () => {
                        this.props.getImageUrl(this.state.imageInfo, this.props.userData);
                    });
                } else {
                    //todo cr @srini SI-make seprate file for alert
                    alertMessage('Invalid file selection', 'Please select image file');
                }
            } else {
                alertMessage('Warning', 'Cannot be get image');
            }
        }).catch(error => {
            alertMessage('Warning', 'File Could not to be attached')
        });
    }
    passwordChange() {
        console.log('passwordChange');
        this.props.navigation.navigate('ChangePassword');
    }

    updateSize = (height) => {
        this.setState({
            height: height + 40
        });
    }

    renderLoader() {
        if (this.props.loading || this.props.loader || this.props.galleryLoader || this.props.deleteLoader) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
        }
        this.state.visible = false;
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    render() {
        console.log('ty', this.props.userData);
        const {height} = this.state;
        let newStyle = {
            height,
            fontSize: 18,
            paddingLeft: 5,
          }
        return (
            <SafeAreaView>
                <View style={styles.viewStyle}>
                    <ScrollView style={styles.ScrollViewStyle}>
                        <View style={styles.imageView}>
                            <View>
                                <TouchableOpacity onPress={() => this.selectImage()} >
                                    <View>
                                        <Image
                                            onLoadStart={() => this.setState({ passportActivityLoader: true })}
                                            onLoadEnd={() => this.setState({ passportActivityLoader: false })}
                                            source={this.state.imageData ? { uri: this.state.imageData.uri } :
                                                Theme.Images.profile_screen.default_avatar} style={styles.galleryStyle}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {this.state.passportActivityLoader && <View><ActivityIndicator style={styles.galleryStyle1} /></View>}
                                <TouchableOpacity>
                                    <View>
                                        <Thumbnail style={styles.editIcon} source={Theme.Images.icons.editIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text>{this.state.fullName}</Text>
                        </View>
                        <View style={styles.profileContainer}>
                            <Text style={styles.textHeader}>Email Address</Text>
                            <TextInput
                                editable={false}
                                style={styles.textinputStyle}
                                underlineColorAndroid="gray"
                                placeholder='Enter email address'
                                // placeholderTextColor='white'
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                        <View style={styles.profileContainer}>
                            <TouchableOpacity style={AppStyles.tochableButton}>
                                <Button style={AppStyles.secondaryButtonWhite} onPress={this.passwordChange.bind(this)}>
                                    <Text style={AppStyles.buttonTextSecondary}>Change Password</Text>
                                </Button>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileContainer}>
                            <Text style={styles.textHeader}>Phone Number</Text>
                            <TextInput
                                style={styles.textinputStyle}
                                underlineColorAndroid="gray"
                                placeholder='Enter phone number'
                                value={this.state.phone}
                                onChangeText={phone => this.setState({ phone })}
                            />
                        </View>
                        <View style={styles.profileContainer}>
                            <Text style={styles.textHeader}>Bio</Text>
                            <Textarea
                                // style={styles.textinputStyle1}
                                style={this.state.description === '' ? styles.textinputStyle1 : [newStyle]}
                                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                                multiline
                                // rowSpan={7}
                                maxLength={300}
                                underlineColorAndroid="gray"
                                placeholder='Enter description'
                                placeholderTextColor="light gray"
                                value={this.state.description}
                                onChangeText={description => this.setState({ description })}
                            />
                        <Text style={styles.textcountView}>
                            {this.state.description.length}/300
                         </Text>
                            <View style={styles.lineStyle} />
                        </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity style={[AppStyles.tochableButton, AppStyles.tochableView]} onPress={this.onSavePress.bind(this)} >
                            <LinearGradientView style={AppStyles.bottomButton} name={'Save'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.selectImage}
                    onRequestClose={() => {
                        this.setState({ selectImage: false });
                    }}
                >
                    <View style={AppStyles.modelView}>
                        <View style={AppStyles.modelContainer}>
                            <View style={styles.iconViewStyle}>
                                <TouchableOpacity style={styles.textView} onPress={() => this.pickSingle()}>
                                    <Text style={AppStyles.textStyle}>Select Image From Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onclose()} style={styles.closeIconView}>
                                    <Image source={Theme.Images.icons.closeWhiteIcon} style={styles.closeIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {this.renderLoader()}

            </SafeAreaView>
        );
    }
}
export const mapStateToProps = (state) => {
    const { imageDetail, image, loader, errorValue,
        galleryLoader,
        galleryImage,
        galleryImageDetail,
        galleryError } = state.imageData;
    console.log('state', state.imageData, galleryImageDetail);
    const { userData } = state.getuserData;
    const { updateDetails, error, loading, update } = state.updateDetail;
    const {
        deleteLoader,
        deleteImage,
        deleteImageDetail,
        deleteErr
    } = state.deleteImage;
    console.log('userData', userData);

    return {
        imageDetail,
        image,
        userData,
        updateDetails,
        error,
        loading,
        update,
        loader,
        errorValue,
        galleryLoader,
        galleryImage,
        galleryImageDetail,
        galleryError,
        deleteLoader,
        deleteImage,
        deleteImageDetail,
        deleteErr
    };
};

export default
    connect(mapStateToProps, {
        getImageUrl, fetchData, updateProfileDetails, getMultipleImageUrl, onDeleteImage
    })(ProfileEdit);

