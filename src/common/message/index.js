import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Text, Thumbnail, Container, Content, Footer, Textarea } from 'native-base';
import { ScrollView, View, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import _ from 'lodash';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import styles from './styles';
import Theme from '../../themes/Theme';
import { postMessage, getMessage, postVideo, postImage } from '../../action/index';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientViewMessage from '../../components/common/gradient/chatGradient';

let textStatus = false;
class Message extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params ? navigation.state.params.data ? navigation.state.params.data.fullName : null : null,
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params && navigation.state.params.userData && navigation.state.params.userData.role === 'Client' && navigation.state.params.blockedStatus === false ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            fontSize: Theme.Font.sizes.regular,
            textAlign: 'center',
            flex: 0.8,
        },
    });
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            myText: '',
            sendVisible: false,
            displayText: '',
            sendToid: '',
            sendByid: '',
            role: '',
            messages: [],
            imageloader: false,
        };
    }
    componentWillMount() {
        if (this.props.navigation.state.params !== undefined) {
            this.setState({
                data: this.props.navigation.state.params.data,
                blockedStatus: this.props.navigation.state.params.blockedStatus
            });
            const { state } = this.props.navigation;
            this.setState({ role: this.props.navigation.state.params.role });
            if (state.params.type === 'conversation') {
                this.setState({
                    sendToid: this.props.navigation.state.params.data.sendToid
                }, () => {
                });
            } else if (state.params.role === 'Guide') {
                this.setState({ sendToid: state.params.data.uid });
            } else {
                this.setState({
                    sendToid: state.params.data.uid
                });
            }
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                this.props.navigation &&
                    this.props.navigation.state &&
                    this.props.navigation.state.params &&
                    this.props.navigation.state.params.notification ?
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Messages'); }}>
                        <View style={styles.backIconViewStyle}>
                            <Image
                                source={Theme.Images.icons.backIcon}
                                style={AppStyles.backIcon}
                            />
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                        <View style={styles.backIconViewStyle}>
                            <Image
                                source={Theme.Images.icons.backIcon}
                                style={AppStyles.backIcon}
                            />
                        </View>
                    </TouchableOpacity>,
            headerRight:
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Information', { data: this.props.navigation.state.params.data }); }}>
                    <Image
                        source={Theme.Images.icons.Warning}
                        style={AppStyles.warningIcon}
                    />
                </TouchableOpacity>
        });
        const getMessageData = {
            // sendByid: this.state.sendByid,
            sendToid: this.state.sendToid
        };
        this.props.getMessage(getMessageData);
    }
    async componentWillReceiveProps(nxtprops) {
        if (this.props.textArr !== nxtprops.textArr) {
            const orderText = await this.appendMessages(this.state.messages, nxtprops.textArr);
            this.setState({ messages: orderText, imageloader: nxtprops.imageLoading, textLoader: nxtprops.loading }, () => {
            });
        }
        if (this.props.imageUrl !== nxtprops.imageUrl) {
            this.sendText(nxtprops.imageUrl, nxtprops.videoUrl, '');
        }
        if (this.props.postImageUrl !== nxtprops.postImageUrl) {
            this.sendText(nxtprops.postImageUrl, '', nxtprops.postImageUrl);
        }
    }
    onUserIconPress() {
        this.props.navigation.goBack();
    }
    onVideoPress() {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            if (res) {
                const fName = res.fileName.split(".");
                const format = _.lowerCase(fName[1]);
                console.log('video1111', format);
                if (Platform.OS === 'ios') {
                    if (format === 'mp 4') {
                        this.props.postVideo(res);
                    } else {
                        this.alertView('Warning', 'Please choose video');
                    }
                } else {
                    if (res.type === 'video/mp4') {
                        this.props.postVideo(res);
                    } else {
                        this.alertView('Warning', 'Please choose video');
                    }
                }
            } else {
                this.alertView('Error', 'File Could not to be attached');
            }
        });
    }
    onImagePress() {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            console.log('1111', res);
            if (res) {
                const fName = res.fileName.split(".");
                const format = _.lowerCase(fName[1]);
                if (Platform.OS === 'ios') {
                    if (format === 'jpg' || format === 'png' || format === 'jpeg' || format === 'pdf') {
                        this.props.postImage(res);
                    } else {
                        this.alertView('Warning', 'Please choose image');
                    }
                } else {
                    console.log('res onImagePress', res);
                    if (res.type === 'image/jpeg' || res.type === 'image/png') {
                        this.props.postImage(res);
                    } else {
                        this.alertView('Warning', 'Please choose image');
                    }
                }
            } else {
                this.alertView('Error', 'File Could not to be attached');
            }

        });
    }
    onVideoclick(ref) {
        console.log('vvvv', ref);
            if (ref.videoUrl !== '' && ref.videoUrl !== null) {
                this.props.navigation.navigate('Media', { videoUrl: ref.videoUrl });
            } else if (ref.postImageUrl !== '' && ref.postImageUrl !== null) {
                this.props.navigation.navigate('Media', { imageUrl: ref.postImageUrl });
            } else if (ref.textId !== '' && ref.textId !== null) {
                console.log('text');
            } else {
                this.alertView('Warning', 'There is no media');
            }
    }
    alertView(err, des) {
        Alert.alert(
            err,
            des,
            [
                { text: 'Ok', style: 'cancel' },
            ],
            { cancelable: false }
        );
    }
    // appends 2 message arrays
    appendMessages = (oldMessages, messages) => {
        const newMessages = _.concat([], oldMessages);
        messages.map(newMessage => {
            const index = _.findIndex(oldMessages, m => m.textId === newMessage.textId);
            if (index > -1) {
                newMessages[index] = newMessage;
            } else {
                newMessages.push(newMessage);
            }
        });
        return newMessages.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return -1;
            }
            if (a.createdAt > b.createdAt) {
                return 1;
            }
            return 0;
        });
    }
    getText(text) {
        textStatus = true;
        this.setState({ myText: text });
    }
    sendText(text, video, image) {
        const db = firebase.firestore();
        const ref = db.collection('messages').doc();
        const textId = ref.id;
        console.log('sendText fun', text, video, image);
        const messages = this.state.messages || [];
        const data = {
            textId,
            text,
            // sendByid: this.state.sendByid,
            sendToid: this.state.sendToid,
            videoUrl: video || '',
            postImageUrl: image || ''
        };
        const textData = {
            textId,
            text,
            role: this.state.role,
            position: 'right',
            createdAt: Date.now(),
            videoUrl: video || '',
            postImageUrl: image || ''
        };
        messages.push(textData);
        this.props.postMessage(data);
        this.setState({ sendVisible: true, myText: '', displayText: text, messages, visible: false },
            () => {
                console.log('sendText message', this.state.messages);
            });
    }
    //review by jaga @suren si- don't duplicate the loader
    renderLoader() {
        if (this.props.imageLoading || this.props.videoLoading || this.props.loading) {
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
    renderMessageLoader() {
        if (this.state.messages.length > 0 || this.state.messages.length === 0) {
            const loaderVisible = !(this.state.messages.length >= 0);
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={loaderVisible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
    }

    render() {
        let count = 0;
        //Cr:si:jaga @suren: remove unwanted codes
        return (
            <Container>
                {/* <Header /> */}
                <ScrollView
                    style={styles.messageContainerView}
                    ref={(ref) => { this.scrollView = ref; }}
                    keyboardShouldPersistTaps='handled'
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}
                >
                    <View>
                        <Content style={styles.contentStyle}>
                            {this.state.messages.length > 0 &&
                                this.state.messages.map((ref) => {
                                    console.log(ref, 'ref');
                                    if (ref.role === this.state.role) {
                                        count = 0;
                                    } else {
                                        count += 1;
                                    }
                                    return (
                                        <View>
                                            {ref.role === this.state.role ?
                                                <View>
                                                    <View style={styles.sendMsgView}>
                                                        <View style={styles.sendMsgContent}>
                                                            <Thumbnail style={styles.msgSentIcon} source={Theme.Images.icons.msgSentIcon} />
                                                            <TouchableOpacity onPress={() => this.onVideoclick(ref)}>
                                                                <LinearGradientViewMessage style={styles.primaryButtonMain} name={ref} />
                                                            </TouchableOpacity>
                                                            {/* <Text style={styles.deliverText}>Delivered</Text> */}
                                                        </View>
                                                    </View>
                                                    {/* {ref.deliveredStatus === true &&
                                                        <Text style={styles.deliverText}>Delivered</Text>
                                                    } */}
                                                </View>
                                                :
                                                <View style={styles.userView}>
                                                    <TouchableOpacity onPress={() => this.onVideoclick(ref)}>
                                                        {count === 1 ?
                                                            <View style={{ flexDirection: 'row' }}>
                                                                {/* Todo cr by jaga: @suren fix eslint error*/}
                                                                <Thumbnail
                                                                    style={styles.userImage}
                                                                    source={this.state.data && this.state.data.imageData ? { uri: this.state.data.imageData.uri } :
                                                                        Theme.Images.profile_screen.default_avatar
                                                                    }
                                                                />
                                                                {/* <Text style={{ color: '#4CD964' }}>online</Text> */}
                                                                <LinearGradientViewMessage style={styles.receiveMsgFirst} name={ref} />
                                                            </View>
                                                            :
                                                            <View style={styles.receviedMsgView}>
                                                                <LinearGradientViewMessage style={styles.receiveMsgAll} name={ref} />
                                                            </View>
                                                        }
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                    );
                                })
                            }

                        </Content>
                    </View>

                </ScrollView>

                {this.renderLoader()}
                {this.renderMessageLoader()}
                <Footer>
                    {this.state.blockedStatus === false || this.state.blockedStatus === undefined ?
                        <View style={styles.messageContainer}>
                            <Icon name="camera" onPress={this.onImagePress.bind(this)} style={styles.camera} size={28} />
                            <MaterialIcon name="videocam" onPress={this.onVideoPress.bind(this)} style={styles.video} size={35} />
                            <View style={styles.messageView}>
                                <Textarea
                                    placeholder="Message"
                                    placeholderTextColor="#8c8c8c"
                                    style={styles.textareaStyle}
                                    value={this.state.myText}
                                    onChangeText={(text) => {
                                        this.getText(text);
                                        // this.setState({ myText: text });
                                        // textStatus = true;
                                    }}
                                />
                                {console.log(this.state.myText, 'textfield')}
                                {textStatus === true || this.state.myText !== '' ?
                                    // {/* / */}
                                    <MaterialIcon
                                        name="send" style={styles.microphone}
                                        size={20}
                                        onPress={() => {
                                            this.sendText(this.state.myText);
                                            textStatus = false;
                                        }}
                                    /> :
                                    null
                                }
                            </View>
                        </View> :
                        <View style={styles.footerStyle}>
                            {this.props.navigation.state.params.userData.role === 'Client' ?
                                <Text style={styles.footerText}>  This Guide is blocked by you! So you can't text him!
                              </Text>
                                :
                                <Text style={styles.footerText}>  You are blocked by this Client! So you can't text him!
                               </Text>
                            }
                        </View>
                    }

                </Footer>
                {Platform.OS === 'ios' &&
                    <KeyboardSpacer />
                }
            </Container>
        );
    }
}
export const mapStateToProps = (state) => {
    console.log('state', state);
    const { textArr, error, loading } = state.getMessage;
    const { videoUrl, videoLoading, videoErr, imageUrl } = state.postVideoUrl;
    const { imageLoading, postImageUrl, imageErr } = state.postImageUrl;
    const { postmessageLoader } = state.postMessage;
    return {
        textArr,
        error,
        loading,
        videoUrl,
        videoLoading,
        videoErr,
        imageUrl,
        imageLoading,
        postImageUrl,
        imageErr,
        postmessageLoader
    };
};
export default connect(mapStateToProps, { postMessage, getMessage, postVideo, postImage })(Message);
