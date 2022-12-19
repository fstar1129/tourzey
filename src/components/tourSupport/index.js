import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, NavigationActions, StackActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { View, Thumbnail, Text, Label, Textarea } from 'native-base';
import StarRating from 'react-native-star-rating';
import styles from './styles';
import Theme from '../../themes/Theme';
//todo cr @srini Mi-remove unused imports
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import { isObjectEmpty, isStringEmpty } from '../../utils/checkEmptycondition';
import { toastMessagesuccess, toastMessagefailure } from '../../utils/showMessage';
import { getGuideDetail } from '../../action/index';
import LinearGradientView from '../common/gradient/linearGradient';


const db = firebase.firestore();
class TourSupport extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Support',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.default,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
    });
    constructor(props) {
        super(props);
        this.state = {
            completeTourDetail: {},
            guideDetail: {},
            description: '',
            loader: false
        };
    }


    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <View style={styles.backIconViewStyle}>
                        <Image
                            source={Theme.Images.icons.leftArrowIcon}
                            style={styles.backIcon}
                        />
                    </View>
                </TouchableOpacity>,
        });
        if (this.props.navigation.state.params) {
            const { state } = this.props.navigation;
            if (isObjectEmpty(state.params.completeTourDetail)) {
                this.setState({
                    completeTourDetail: state.params.completeTourDetail,
                    // description: state.params.completeTourDetail.tourDesc
                }, () => {
                    if (this.state.completeTourDetail && this.state.completeTourDetail.tourPostedById) {
                        this.props.getGuideDetail(this.state.completeTourDetail.tourPostedById);
                    }
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        //Todo-cr-si ->@srini Apply check empty Condition for nextProps -> By Punitha
        if (nextProps && isObjectEmpty(nextProps.guideDetail)) {
            this.setState({
                guideDetail: nextProps.guideDetail
            }, () => {
            });
        }
    }

    onSubmitPress() {
        if (isStringEmpty(this.state.completeTourDetail.tourId)) {
            this.setState({
                loader: true
            });
            const currentUser = firebase.auth().currentUser;
            db.collection('contracts')
                .where('tourId', '==', this.state.completeTourDetail.tourId)
                .where('approvedClientId', '==', currentUser.uid)
                .get()
                .then((ref) => {
                    if (ref.size > 0) {
                        ref.forEach((docs) => {
                            db.collection('contracts')
                                .doc(docs.id).update({
                                    supportTourdesc: this.state.description ? this.state.description : '',
                                    updatedTourDescAt: Date.now()
                                })
                                .then(() => {
                                    console.log('sucesssss');
                                    toastMessagesuccess('Tour details uploaded successfully');
                                    this.setState({
                                        loader: false
                                    }, () => {
                                        this.navigateBack();
                                    });
                                })
                                .catch((error) => {
                                    console.log('failure', error);
                                    toastMessagefailure('Tour details uploaded failure');
                                    this.setState({
                                        loader: false
                                    });
                                });
                        });
                    } else {
                        toastMessagefailure('No data available');
                        this.setState({
                            loader: false
                        });
                    }
                })
                .catch((error) => {
                    console.log('failure', error);
                    toastMessagefailure('Tour details uploaded failure');
                    this.setState({
                        loader: false
                    });
                });
        }
    }
    navigateBack() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'ToursList', params: { tourType: 'complete' } })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }
    ratingScreen() {
        if (this.state.completeTourDetail.tourId) {
            this.props.navigation.navigate('RateAndReview', { tourId: this.state.completeTourDetail.tourId });
        }
    }


    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.props.guideLoader || this.state.loader} textContent={'Loading...'} textStyle={styles.toastStyle} />
            </View>
        );
    }

    render() {
        const { completeTourDetail, guideDetail } = this.state;
        console.log('completeTourDetail', completeTourDetail);
        // const totalPrice = (completeTourDetail.count) * (completeTourDetail.tourPrice);
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.mainContainer}>
                        <View style={styles.mainView}>
                            <View>
                                <Image
                                    source={{
                                        uri: completeTourDetail.tourImageUrl ?
                                            completeTourDetail.tourImageUrl : ''
                                    }}
                                    style={styles.tourImage}
                                />
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.tourCategoryView}>
                                {/* todo srini cr mi-remove unused code */}
                                <Text style={styles.tourCategoryStyle}>{completeTourDetail.uniqueId ? <Text> {'#'}{completeTourDetail.uniqueId} </Text> : ''}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <View style={styles.nameViewWrap}>
                                    <View style={styles.nameView}>
                                        <View>
                                            <Text style={styles.tourName}>{completeTourDetail.tourName}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.starCountview}>
                                    <StarRating
                                        halfStarEnabled
                                        disabled
                                        maxStars={5}
                                        rating={completeTourDetail.tourRating ? completeTourDetail.tourRating : 0}
                                        starSize={20}
                                        fullStarColor={'#f2b518'}
                                        starStyle={styles.starSpacing}
                                    />
                                </View>
                                <Text style={styles.starCounttext}>{completeTourDetail.tourRating}</Text>
                            </View>
                            <View style={styles.tourCategoryView}>
                                <Text style={styles.tourCategoryStyle1}>{completeTourDetail.tourDate}</Text>
                                <Text style={styles.dotStyle}> . </Text>
                                <Text style={styles.tourCategoryStyle1}>{completeTourDetail.tourTime}</Text>
                            </View>
                            <View style={styles.guideMainView}>
                                <View style={styles.guideViewWrap}>
                                    <View style={styles.nameView}>
                                        <Thumbnail style={styles.userImage} source={guideDetail.imageData ? { uri: guideDetail.imageData.uri } : Theme.Images.profile_screen.default_avatar} />
                                        <View style={styles.nameSpacing}>
                                            <View style={styles.guideView}>
                                                <Text style={styles.nameStyling}>{guideDetail.fullName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.totalPriceView}>
                                    <Text style={styles.totalPrice}>${parseInt(completeTourDetail.tourPrice)}</Text>
                                </View>
                            </View>
                            <View style={styles.tourDescView}>
                                <Label style={styles.tourDesc}>"All questions and concerns regarding tours but submitted within 24 hours of the tour ending. Please be as detailed as possible."</Label>
                            </View>
                            <Text style={styles.giveDetailstextStyle}>Give Details</Text>
                            <View>
                            {isStringEmpty(completeTourDetail.supportTourdesc) ?
                                <Text style={styles.supportTourdescStyle}>{completeTourDetail.supportTourdesc}</Text>
                                :
                                <Textarea
                                    style={styles.textinputStyle}
                                    rowSpan={5}
                                    underlineColorAndroid="gray"
                                    placeholder='Enter description'
                                    placeholderTextColor="light gray"
                                    value={this.state.description}
                                    onChangeText={description => this.setState({ description })}
                                />
                            }
                            <View style={styles.lineStyle} />
                            </View>
                        </View>
                        {this.renderLoader()}
                    </View>
                </ScrollView>
                {(isStringEmpty(completeTourDetail.supportTourdesc)) ?
                    null
                    :
                    <TouchableOpacity style={[AppStyles.tochableButton, AppStyles.tochableView]} onPress={this.onSubmitPress.bind(this)} >
                        <LinearGradientView style={AppStyles.bottomButton} name={'Submit'} />
                    </TouchableOpacity>
                }
            </SafeAreaView>

        );
    }

}
export const mapStateToProps = (state) => {
    // const { userData } = state.checkData;
    const { guideDetail, guideLoader, error } = state.guideDetail;
    return {
        // userData,
        guideDetail,
        guideLoader,
        error
    };
};

export default connect(mapStateToProps, { getGuideDetail })(TourSupport);
