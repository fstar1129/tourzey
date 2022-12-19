import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Alert, View, Image, Linking, Dimensions, ListView } from 'react-native';
import { Text, Card, CardItem, Body, Button, Thumbnail } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import StarRating from 'react-native-star-rating';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';
import { updateJobDetails, verifyHiredAgent } from '../../action/index';
import LinearGradientView from '../common/gradient/linearGradient';
import { isObjectEmpty, isStringEmpty } from '../../utils/checkEmptycondition';


const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;


class AgentProfile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.data.role === 'broker' ? 'Broker Profile' : 'Guide Profile',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
    });
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            showDetails: false,
            data: {},
            value: [],
            hiredValue: false,
            status: true,
            showVideo: false,
            showExperience: false,
        };
    }

    componentWillMount() {
        const { state } = this.props.navigation;
        //Todo cr by suren:@janani si-remove else - completed
        if (state.params && isObjectEmpty(state.params.data)) {
            this.setState({
                data: state.params.data
            });
        }
    }

    componentDidMount() {
        this.props.verifyHiredAgent(this.state.data.uid, this.props.navigation.state.params.jobid);
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.backIcon}
                        style={AppStyles.backIcon}
                    />
                </TouchableOpacity>,
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('Checking navigation', nextProps);
        if (nextProps.updateDetails !== this.props.updateDetails) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Jobs' })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }
    onMessagePress() {
        // this.props.navigation.navigate('Messages', this.state.data);
        this.props.navigation.navigate('MessageScreen', { data: this.state.data, type: 'agentProfile', role: 'client' });
    }
    onHirePress() {
        Alert.alert(
            'Confirm',
            'Are you sure you want to Hire this agent?',
            [
                {
                    text: 'Ok', onPress: () => { this.onConfirmPress(); }
                },
                { text: 'Cancel', style: 'cancel' }
            ],
            { cancelable: false }
        );
    }
    onConfirmPress() {
        // this.state.value.push(this.state.data.uid);
        const obj = {
            agentId: this.state.data.uid,
            message: '',
            fund: ''
        };
        this.props.updateJobDetails(this.state.data.uid, this.props.navigation.state.params.jobid, obj);
    }
    jobCompletePress() {
        this.props.navigation.navigate('CompletedJobs', { jobComplete: this.state.data });
    }
    renderLoader() {
        if (this.props.loading || this.props.loader) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
        this.state.visible = false;
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
            </View>
        );
    }
    openDoc(detail) {
        //todo-cr-mi: need to add seperate file for undefined condition 
        if (detail.fileUrl !== undefined || detail.fileUrl !== '' || detail.fileUrl !== null) {
            Linking.canOpenURL(detail.fileUrl)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(detail.fileUrl);
                    }
                    Alert.alert(
                        'Cannot open the url',
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false }
                    );
                }).catch(() => {
                    Alert.alert('No documents attached.', [
                        { text: 'OK' },
                    ], { cancelable: false });
                });
        } else {
            //Todo cr by suren:@janani mi-use common function
            Alert.alert(
                'Info',
                'No documents attached.',
                [
                    { text: 'OK' },
                ], { cancelable: false });
        }
    }

    onSeeMore() {
        if (this.state.status === true) {
            this.setState({ status: false });
        } else {
            this.setState({ status: true });
        }
    }
    get pagination() {
        return (
            <Pagination
                dotsLength={this.state.data.gallery.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ backgroundColor: 'transparent' }}
                dotStyle={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'black'
                }}
                inactiveDotStyle={{
                }}
                // Define styles for inactive dots here}}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    openVideo(video) {
        console.log('video', video);
        this.props.navigation.navigate('Billing', { videoUrl: video.videoUrl });
    }

    _renderItem({ item, index }) {
        console.log(item, index, 'renderrow');
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onLongPress={() => {
                    Alert.alert(
                        'Confim',
                        'Are you sure want to remove this picture?',
                        [
                            {
                                text: 'Ok',
                                onPress: () => this.onDeletePress(item),
                                style: 'cancel'
                            },
                            { text: 'Cancel', style: 'cancel' }

                        ],
                        { cancelable: false }
                    );
                }}
            >
                <View style={styles.textCenter}>
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 300, height: 150 }}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    onViewImage(image) {
        if (isObjectEmpty(image)) {
            console.log('image', image, image.uri);
            if (isStringEmpty(image.uri)) {
                this.props.navigation.navigate('Media', { imageUrl: image.uri });
            }
        }
    }

    renderRow(item) {
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => this.onViewImage(item)}>
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 65, height: 65, borderRadius: 5 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    onShowVideos() {
        console.log('onShowVideos');
        this.setState({ showVideo: !this.state.showVideo });
    }

    onShowExperience() {
        this.setState({ showExperience: !this.state.showExperience });
    }


    render() {
        let videoId = [];
        console.log('renderuh', this.state.data);
        if (this.state.data.videoUrl) {
            videoId = this.state.data.videoUrl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        }
        console.log('Agent profile', this.state.data,
            `https://img.youtube.com/vi/${videoId[1]}/1.jpg`);
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.profileContainer}>
                        <View style={styles.wrapper}>
                            <View style={styles.back}>
                                <Card style={styles.cardViewStyle}>

                                    <CardItem>
                                        <Body>
                                            {this.state.showDetails === false &&
                                                <TouchableOpacity onPress={() => this.setState({ showDetails: !this.state.showDetails })} >
                                                    <Icon style={styles.icon} name="minus-circle" />
                                                </TouchableOpacity>
                                            }
                                            {this.state.showDetails === true &&
                                                <TouchableOpacity onPress={() => this.setState({ showDetails: !this.state.showDetails })} >
                                                    <Icon style={styles.icon} name="plus-circle" />
                                                </TouchableOpacity>
                                            }
                                            <View style={styles.agentDetails}>
                                                <Text style={styles.agentName}>
                                                    {this.state.data.fullName ? this.state.data.fullName : '-'}
                                                </Text>
                                                {/* <Text style={styles.agentOffice}>
                                                    {this.state.data.brokerageName ? this.state.data.brokerageName : '-'}
                                                </Text> */}
                                                <Text style={styles.serviceArea}>
                                                    {this.state.data.serviceArea ? this.state.data.serviceArea : '-'}
                                                </Text>
                                                <View>
                                                    <StarRating
                                                        disabled
                                                        halfStarEnabled
                                                        maxStars={5}
                                                        rating={this.state.data.ratingCount ? this.state.data.ratingCount : 0}
                                                        starSize={20}
                                                        fullStarColor={'#f2b518'}
                                                        starStyle={styles.starSpacing}
                                                    />
                                                </View>
                                                <Text style={styles.jobCompletedText}>
                                                    Jobs Completed {this.state.data.jobId &&
                                                        <Text style={AppStyles.textPrimary}>({this.state.data.jobId.length})</Text>
                                                    }
                                                </Text>
                                            </View>
                                            {this.state.showDetails === false &&
                                                <View style={styles.detailView}>
                                                    {/* <Text style={styles.overView}>Overview</Text> */}
                                                    {this.state.data.description ?
                                                        <View>
                                                            {this.state.data.description.length > 80 ?
                                                                <Text style={styles.description}>
                                                                    {this.state.status ?
                                                                        <Text style={styles.description}>
                                                                            {this.state.data.description.slice(0, 80)}
                                                                            <Text style={AppStyles.textPrimary} onPress={() => this.onSeeMore()}> SEE MORE</Text>
                                                                        </Text>
                                                                        :
                                                                        <Text style={styles.description}>{this.state.data.description}
                                                                            <Text style={AppStyles.textPrimary} onPress={() => this.onSeeMore()}> SEE LESS</Text>
                                                                        </Text>
                                                                    }
                                                                </Text>
                                                                :
                                                                <Text style={styles.description}>{this.state.data.description}</Text>
                                                            }
                                                        </View>
                                                        :
                                                        <View style={styles.hypen}>
                                                            <Text style={AppStyles.textPrimary}>-</Text>
                                                        </View>
                                                    }

                                                    {/* {this.props.navigation.state.params.jobPrice ?
                                                        <Text style={styles.offerPrice}>
                                                            Job Price:
                                                         <Text style={AppStyles.textPrimary}> ${this.props.navigation.state.params.jobPrice}</Text>
                                                        </Text>
                                                        :
                                                        <Text style={styles.offerPrice}>
                                                            Offer Price:
                                                     <Text style={AppStyles.textPrimary}> ${this.state.data.price ? this.state.data.price : '-'}</Text>
                                                        </Text>

                                                    } */}

                                                </View>
                                            }
                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={styles.front}>
                                {this.state.data && this.state.data.imageData ?
                                    //Todo cr by suren:@janani mi-use ternary operator
                                    <Thumbnail
                                        source={{ uri: this.state.data.imageData.uri }}
                                        style={styles.profileImage}
                                    />
                                    :
                                    <Thumbnail
                                        source={Theme.Images.profile_screen.default_avatar}
                                        style={styles.profileImage}
                                    />
                                }
                            </View>
                            {this.state.data.fav ?
                                //Todo cr by suren:@janani mi-use ternary operator
                                <View style={styles.heartIconView}>
                                    <Icon name="heart" style={styles.heartIconFilled} size={10} />
                                </View>
                                :
                                <View style={styles.heartIconView}>
                                    <Icon name="heart" style={styles.heartIcon} size={10} />
                                </View>
                            }

                        </View>
                        <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <Body>
                                    <View>
                                        <Text style={styles.gallery}>
                                            Gallery
                                        </Text>
                                    </View>
                                    {this.state.data.gallery
                                        && this.state.data.gallery.length > 0
                                        ?
                                        <ListView
                                            contentContainerStyle={styles.listView}
                                            dataSource={this.ds.cloneWithRows(this.state.data.gallery)}
                                            renderRow={this.renderRow.bind(this)}
                                        />
                                        :
                                        <View style={styles.textCenter}>
                                            <Text style={styles.textPrimary}>No Media Attached</Text>
                                        </View>

                                    }
                                </Body>
                            </CardItem>
                        </Card>
                        {this.state.data && this.state.data.fullName &&
                            <Card style={styles.cardViewStyle}>
                                <CardItem>
                                    <Body>
                                        <TouchableOpacity onPress={this.onShowVideos.bind(this)}>
                                            <View style={styles.jobCompleteViewCommon}>
                                                <View style={styles.jobCompleteView}>
                                                    <Icon name="play-circle" size={15} style={styles.videoIcon} />
                                                    {/* <Image source={Theme.Images.icons.jobsIcon} style={styles.briefcaseIcon} /> */}
                                                    <Text style={AppStyles.textPrimary}>
                                                        {this.state.data.fullName} Videos
                                                </Text>
                                                </View>
                                                {this.state.showVideo === false &&
                                                    <Icon name="chevron-down" style={styles.downIcon} size={10} />
                                                }
                                                {this.state.showVideo === true &&
                                                    <Icon name="chevron-up" style={styles.downIcon} size={10} />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                                {this.state.showVideo === true &&
                                    <CardItem>
                                        <Body>
                                            <View>
                                                {/* <Text style={styles.video}>
                                                    Video
                                               </Text> */}
                                            </View>
                                            <View style={styles.textCenter}>
                                                {this.state.data.videoUrl && videoId !== [] && this.state.data.videoUrl ?
                                                    //Todo cr by suren:@janani mi-import the url from seperate file 
                                                    <TouchableOpacity
                                                        onPress={() => this.openVideo(this.state.data)}
                                                    >
                                                        <Icon name="play-circle" style={styles.playCircleIcon} color='white' size={40} />
                                                        <Image
                                                            source={{ uri: `https://img.youtube.com/vi/${videoId[1]}/1.jpg` }}
                                                            style={{ width: 300, height: 150 }}
                                                        />
                                                    </TouchableOpacity>
                                                    :
                                                    <Text style={styles.textPrimary}>No Files Attached</Text>
                                                }
                                            </View>
                                        </Body>
                                    </CardItem>
                                }
                            </Card>
                        }
                        <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <Body>
                                    <View>
                                        <Text style={AppStyles.textPrimary}>
                                            Languages
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.languages}>
                                            {this.state.data.languages ? this.state.data.languages : <Text style={AppStyles.textPrimary}>-</Text>}
                                        </Text>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <Body>
                                    <TouchableOpacity onPress={this.onShowExperience.bind(this)}>
                                        <View style={styles.jobCompleteViewCommon}>
                                            <View style={styles.jobCompleteView}>
                                                <Text style={AppStyles.textPrimary}>
                                                    Experience
                                                </Text>
                                            </View>
                                            {this.state.showExperience === false &&
                                                <Icon name="chevron-down" style={styles.downIcon} size={10} />
                                            }
                                            {this.state.showExperience === true &&
                                                <Icon name="chevron-up" style={styles.downIcon} size={10} />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </Body>
                            </CardItem>
                            {this.state.showExperience === true &&
                                <CardItem>
                                    <Body>
                                        <View style={styles.textCenter}>
                                            {this.state.data.experience.length > 0 ?
                                                <View style={styles.tagView}>
                                                    {this.state.data.experience.map((item, key) => (
                                                        <Text style={styles.tag} key={key}>{item}</Text>
                                                    ))
                                                    }
                                                </View>
                                                :
                                                <Text style={AppStyles.textPrimary}>-</Text>
                                            }
                                        </View>
                                    </Body>
                                </CardItem>
                            }
                        </Card>
                        {/* <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <Body>
                                    <View style={styles.textCenter}>
                                        <Text style={AppStyles.textPrimary}>
                                            Attached File
                                        </Text>
                                    </View>
                                    <View style={styles.textCenter}>
                                        {this.state.data.fileName && this.state.data.fileUrl ?

                                            <TouchableOpacity
                                                onPress={() => this.openDoc(this.state.data)}
                                            >
                                                <Text style={styles.textPrimary}>{this.state.data.fileName.split('|')[0].trim()}</Text>
                                            </TouchableOpacity>
                                            :
                                            <Text style={styles.textPrimary}>No Files Attached</Text>
                                        }
                                    </View>
                                </Body>
                            </CardItem>
                        </Card> */}

                        {this.props.statusVal === 'hired' ?
                            <Text style={styles.hiredTag}>Already hired</Text>
                            :
                            <View style={styles.buttonView}>
                                <TouchableOpacity style={AppStyles.tochableButton}>
                                    <Button style={AppStyles.secondaryButtonWhite} onPress={this.onHirePress.bind(this)}>
                                        <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Hire</Text>
                                    </Button>
                                </TouchableOpacity>
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onMessagePress.bind(this)} >
                                    <LinearGradientView style={AppStyles.primaryButton} name={'Message'} />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    {this.renderLoader()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (status) => {
    const { update, updateDetails, loading, loader, verifyAgent, hiredAgentDetail, statusVal } = status.getJobDetails;
    return { update, updateDetails, loading, loader, verifyAgent, hiredAgentDetail, statusVal };
};

export default connect(mapStateToProps, { updateJobDetails, verifyHiredAgent })(AgentProfile);
