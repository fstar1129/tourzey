import React, { Component } from 'react';
import {
    View, Card, CardItem, Text,
    Body, Item, Label, Textarea, Button, Toast
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';
import {
    postVideo
} from '../../action/index';
import styles from './styles';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import { isStringEmpty } from '../../utils/checkEmptycondition';
import ProgressGradientView from '../common/gradient/progressGradient';

class Description extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Description',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 1,
        },
    });
    constructor(props) {
        super(props);
        const currentDate = Date.now();
        this.state = {
            minimumDate: Moment(currentDate).utc().format('MMM D,YYYY'),
            fromDate: Moment().utc().add(2, 'hours').format('MMM D,YYYY'),
            toDate: Moment().utc().add(2, 'hours').format('MMM D,YYYY'),
            description: '',
            alert: false,
            videoUrl: '',
            videoLoader: false,
            remove: false,
        };
    }

    componentWillMount() {

        if (this.props.navigation.state.params !== undefined) {
            const { state } = this.props.navigation;
            if (state.params.quickTour === true) {
                console.log('description', state.params.percent);
                let val = 60;
                this.location = state.params.location;
                this.mood = state.params.mood;
                this.tourName = state.params.tourName;
                val += state.params.percent;
                this.setState({
                    percent: val
                }, () => {
                    console.log('percent setState', this.state.percent);
                });
            } else if (state.params.futureTour === true) {
                let val = 60;
                this.location = state.params.location;
                this.service = state.params.service;
                this.tourName = state.params.tourName;
                val += state.params.percent;
                
                this.setState({
                    percent: val 
                });
            }
    }
    }

    componentDidMount() {
        console.log('percent', this.props.navigation.state.params.percent);
        console.log('post', this.state.post);
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.backIcon}
                        style={AppStyles.backIcon}
                    />
                </TouchableOpacity>,
            headerRight:
                <View>
                    <Text style={AppStyles.nextBtn} onPress={() => { this.onNextPress(); }}>NEXT</Text>
                </View>
        });
    }
    

    componentWillReceiveProps(nextProps) {
        const { state } = this.props.navigation;
        this.setState({
            visible: false, videoLoader: nextProps.videoLoading
        }, () => { console.log('1234video', this.state.videoUrl); });
        if (nextProps.videoUrl !== this.props.videoUrl) {
            Toast.show({
                        text: 'Your video uploaded successfully',
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: 'success',
                        duration: 5000
                    });
            this.setState({ videoUrl: nextProps.videoUrl });
        }
      }

      onNextPress() {
          console.log('desc', this.state.description);
        if (this.state.description === '' || !this.state.fromDate || !this.state.toDate) {
            this.setState({
                alert: true
            });
        } else {
            if (this.props.navigation.state.params !== undefined) {
                const { state } = this.props.navigation;
                if (state.params.quickTour === true) {
                this.props.navigation.navigate('ListPrice', 
                { 
                tourName: this.tourName, 
                location: this.location,
                mood: this.mood,
                description: this.state.description,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                jobVideo: this.state.videoUrl,
                percent: this.state.percent,
                quickTour: true
                }
                );
                } else if (state.params.futureTour === true) {
                    this.props.navigation.navigate('ListPrice', 
                { 
                tourName: this.state.tourName, 
                location: this.location,
                service: this.service,
                description: this.state.description,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                jobVideo: this.state.videoUrl,
                percent: this.state.percent,
                futureTour: true 
                }
                );
                }
        }
      }
    }

    moveToMedia() {
       
        if (isStringEmpty(this.state.videoUrl)) {
            this.props.navigation.navigate('Media', { videoUrl: this.state.videoUrl });
        } else {
            Alert.alert(
                'Warning',
                'There is no media',
                [
                    { text: 'Ok', style: 'cancel' },
                ],
                { cancelable: false }
            );
        }
    }

    uploadVideo() {        
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            // Android
            if (res) {
            if (res && (res.type === 'video/mp4' || res.fileName.indexOf('MP4') !== -1)) {
                this.props.postVideo(res);
            } else {
                //
                Alert.alert(
                    'Warning',
                    'Please choose video',
                    [
                        { text: 'Ok', style: 'cancel' },
                    ],
                    { cancelable: false }
                );
            }
        } else {
            Alert.alert(
                'Error',
                'File Could not to be attached',
                [
                    { text: 'Ok', style: 'cancel' },
                ],
                { cancelable: false }
            );
        }
        });
        this.setState({ remove: true });
    }

    removeVideo() {
     this.setState({ videoUrl: '', remove: false });
    }

    checkValue() {
        if (isStringEmpty(this.state.description)) {
            this.state.alert = false;
        }
    }
    renderLoader() {
        if (this.state.videoLoader) {
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
        return (
            <SafeAreaView>
             <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
                <View style={AppStyles.progress}>
                <ProgressGradientView width={this.state.percent} />
                </View>
                <View style={styles.profileContainer}>                    
                    <Label style={styles.labelStyle}>Tourzey guides love the details, give them more to help plan out your tour.</Label>
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                                <Item style={styles.itemStyle}>
                                    <Textarea
                                        placeholderTextColor="#dcdcdc" 
                                        placeholder='Ex: We are looking to land in Tanzania on the July 1, 2019. We would like to see the following: 1. Kilimanjaro
                                        2. Dar es Salaam
                                        3. Serengeti National Park
                                        4. Zanibar. We will need transportation, rooming and a security detail.'
                                        style={styles.textareaStyle}
                                        maxLength={300}
                                        value={this.state.description}
                                        onChangeText={(text) => this.setState({ description: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Text style={styles.textcountView}>
                    {this.state.description.length}/300
                     </Text>
                     <View style={styles.titleView}>
                            <Card style={styles.fromDatecardView}>
                                <CardItem style={styles.dateCardStyle}>
                                    <Body>
                                        <Text style={styles.titleStyle}>From Date</Text>

                                                    <View style={styles.pickerView}>
                                                        <DatePicker
                                                            style={{ width: '80%', marginRight: 0, height: 22, backgroundColor: 'transparent' }}
                                                            date={this.state.fromDate}
                                                            mode="date"
                                                            placeholder="Select Date"
                                                            format="MMM D,YYYY"
                                                            confirmBtnText="Confirm"
                                                            cancelBtnText="Cancel"
                                                            showIcon={false}
                                                            // minDate={Moment.utc().add(2, 'hours').format('DD/MM/YYYY')}
                                                            minDate={this.state.minimumDate}
                                                            textStyle={{ color: '#1f66dd', paddingBottom: 10, }}
                                                            customStyles={{
                                                                dateInput: {
                                                                    marginLeft: 0,
                                                                    borderWidth: 0,
                                                                    alignItems: 'flex-start',
                                                                },
                                                                dateText: {
                                                                    color: Colors.primary,
                                                                    marginBottom: Metrics.margins.large,
                                                                    fontSize: 15,

                                                                }

                                                                // ... You can check the source to find the other keys.
                                                            }}
                                                            onDateChange={(date) => { this.setState({ fromDate: date }); }}
                                                        />
                                                        <Icon style={styles.pickerIcon} name="chevron-down" />
                                                    </View>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={styles.toDatecardView}>
                                <CardItem style={styles.dateCardStyle}>
                                    <Body>
                                        <Text style={styles.titleStyle}>To Date</Text>
                                            <View>
                                                    <View style={styles.pickerView}>
                                                        <DatePicker
                                                            style={{ width: '80%', marginRight: 0, height: 22, paddingBottom: 10, backgroundColor: 'transparent', }}
                                                            date={this.state.toDate}
                                                            mode="date"
                                                            placeholder="Select Date"
                                                            format="MMM D,YYYY"
                                                            confirmBtnText="Confirm"
                                                            cancelBtnText="Cancel"
                                                            showIcon={false}
                                                            minDate={this.state.fromDate}
                                                            customStyles={{
                                                                dateInput: {
                                                                    marginLeft: 0,
                                                                    borderWidth: 0,
                                                                    alignItems: 'flex-start',
                                                                },
                                                                dateText: {
                                                                    color: Colors.primary,
                                                                    marginBottom: Metrics.margins.large,
                                                                    fontSize: 15,
                                                                }

                                                                // ... You can check the source to find the other keys.
                                                            }}
                                                            onDateChange={(date) => { this.setState({ toDate: date }); }}
                                                        />
                                                        <Icon style={styles.pickerIcon} name="chevron-down" />
                                                    </View>
                                            </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                </View>
                {this.renderLoader()}
                {this.checkValue()}
                    <View style={styles.uploadVideoStyle}>
                    { this.state.videoUrl !== '' ?                   
                        <Button rounded onPress={this.moveToMedia.bind(this)}>
                        <Text>View video</Text>
                        </Button>               
                    :                  
                        <Button rounded onPress={this.uploadVideo.bind(this)}>
                        <Text>Upload Video</Text>
                        </Button>                                   
                    }
                    </View>
                    { this.state.remove === true && this.state.videoUrl !== '' &&
                        <Text onPress={this.removeVideo.bind(this)} style={styles.removeVideoStyle}>Remove video</Text>
                    }   
                    <View>
                    {this.state.alert === true ?
                            <View style={styles.alertView}>
                                <Text style={styles.alert}>
                                    * The value is mandatory.
                                </Text>
                            </View> 
                            : null
                    }
                </View>
            </ScrollView> 
            </SafeAreaView> 
        );
    }
}

export const mapStateToProps = (status) => {
    const jobDetails = status.jobPost;
    const navigateTo = status.isSignedin.navigateTo;
    const userData = status.getuserData.userData;
    const { videoUrl, videoLoading, videoErr } = status.postVideoUrl;

    return {
        jobDetails,
        navigateTo,
        userData,
        videoUrl,
        videoLoading,
        videoErr
    };
};

export default
    connect(mapStateToProps, {
         postVideo
    })(Description);

