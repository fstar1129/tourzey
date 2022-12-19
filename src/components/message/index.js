import React, { Component } from 'react';
import { ListView, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import _ from 'lodash';
import { View, Thumbnail, Text, Input } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import Moment from 'moment';
import styles from './styles';
import Theme from '../../themes/Theme';
import { getMessage, getCoversationList } from '../../action/messageAction';
import * as checkEmpty from '../../utils/checkEmptycondition';

class Message extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Messages',
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

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            conversations: [],
            searchItem: '',
            tempConversations: [],
            session: null,
        };
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
        if (this.props.navigation.state && this.props.navigation.state.params
            && this.props.navigation.state.params.conversationList) {
            this.setState({ conversations: this.props.navigation.state.params.conversationList });
        }
        this.props.getCoversationList();
        this.setState({
            session: true
        });
    }

    componentWillReceiveProps(nextProps) {
        // todo-cr-si: pavi @ jana check props value
        if (nextProps.conversationList) {
            const orderlist = _.orderBy(nextProps.conversationList, ['createdAt'], ['desc']);
            this.setState({ conversations: orderlist, tempConversations: orderlist }, () => console.log('9999', this.state.conversations));
        }
    }


    //TODO: Go to the message screen
    onMessagePress(val) {
        AsyncStorage.getItem('userdata').then((value) => {
            const list = JSON.parse(value);
            const listValue = list && list.blockList ? list.blockList : [];
            const status = _.find(listValue, (o) => {
                console.log(o, val.sendToid, 'status');
                return o === val.sendToid;
            });
            console.log('status find', status, val);
            if (val) {
                let blockedStatus;
                if (status === undefined || status === false || status === null) {
                    blockedStatus = false;
                }
                if (status) {
                    blockedStatus = true;
                }
                this.props.navigation.navigate('MessageScreen', { data: val, type: 'conversation', role: 'client', blockedStatus, userData: this.props.userData });
            }
        });
    }


    timeFormat(getValue) {
        // todo-cr-si: pavi @ jana check getValue
        if (getValue) {
            const local = new Date((getValue));
            const date = Moment(local).fromNow();
            return date;
        }
    }


    //todo:cr:mi: srini@jaga: add comments to functions
    searchMessages(text) {
        this.setState({ searchMessages: text }, () => {
            // const filtered =  _.filter(this.state.conversations, item => item.fullName.indexOf(this.state.searchMessages) );
            //todo:cr:mi: srini@jaga: use meaningful variable names (filtered, obj)
            // const filtered = _.filter(this.state.tempConversations, (obj) => obj.fullName.indexOf(this.state.searchMessages) !== -1);
            const filtered = _.filter(this.state.tempConversations, (obj) => obj.fullName.toLowerCase().indexOf(this.state.searchMessages.toLowerCase()) !== -1);
            this.setState({ conversations: filtered });
            console.log('filter', this.state.searchMessages, filtered);
        });
    }
    renderLoader() {
        if (this.props.conversationLoading || this.state.session === null) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
    }

    renderRow(details) {
        console.log('1111', details);

        return (
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.CardContainer}>
                    <TouchableOpacity onPress={() => { this.onMessagePress(details); }}>
                        <View style={styles.infoView}>
                            <View style={styles.nameViewWrap}>
                                <View style={styles.nameView}>
                                    {/* <Thumbnail style={styles.userImage} source={details.profilePic ? { uri: details.profilePic } : Theme.Images.profile_screen.default_avatar} /> */}
                                    {details.imageData ?
                                        <Thumbnail style={styles.userImage} source={{ uri: details.imageData.uri }} />
                                        :
                                        <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                    }
                                    <View style={styles.nameSpacing}>
                                        <Text style={styles.nameStyling}>{details.fullName}</Text>
                                        <Text style={styles.messageDescription}>
                                            {_.startsWith(details.LastText, 'https://image') || _.startsWith(details.LastText, 'https://firebasestorage.') ? 'Video/image' : details.LastText}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.dateView}>
                                <Text style={styles.dateText}>{this.timeFormat(details.createdAt)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.chatLineStyle} />
            </View>
        );
    }

    render() {
        return (
            // <SafeAreaView>
                <View style={styles.viewStyle}>
                    <View style={styles.headerView}>
                        <Input
                            placeholderTextColor="#000000"
                            placeholder="Search Here"
                            style={styles.searchItemStyle}
                            value={this.state.searchMessages}
                            onChangeText={(text) => this.searchMessages(text)}
                        />
                    </View>
                    <View style={styles.searchLineStyle} />
                    <ScrollView>
                        {checkEmpty.isArrayEmpty(this.state.conversations) && this.state.conversations.length > 0 ?
                            <ListView
                                dataSource={this.ds.cloneWithRows(this.state.conversations)}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections
                            />
                         : 
                        //  { this.state.conversations.length === 0 && 
                            <View style={styles.nodataView}>
                                <Text style={styles.nodataText}>
                                    No Message Available
                                </Text>
                            </View>
                        }
                    </ScrollView>

                    {this.renderLoader()}
                </View>
            // </SafeAreaView >
        );
    }
}

export const mapStateToProps = (state) => {
    console.log('state', state);
    const conver = state.getConversationList.conversationList.map((res) => res);
    const { conversationList, error, conversationLoading } = state.getConversationList;
    const { userData } = state.getuserData;
    return { conver, error, conversationLoading, conversationList, userData };
};

export default connect(mapStateToProps,
    { getCoversationList, getMessage })(Message);

