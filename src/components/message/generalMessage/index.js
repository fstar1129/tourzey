import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import _ from 'lodash';
import { View, Card, CardItem, Thumbnail, Text, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import Moment from 'moment';
import styles from './styles';
import Theme from '../../../themes/Theme';
import { getMessage, getCoversationList } from '../../../action/messageAction';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';

class GeneralMessage extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          conversations: []
        };
    }
    componentDidMount() {
        this.props.getCoversationList();
    }

    componentWillReceiveProps(nextProps) {
        const orderlist = _.orderBy(nextProps.conversationList, ['createdAt'], ['desc']);
        this.setState({ conversations: orderlist }, () => console.log('9999', this.state.conversations));
    }


    //TODO: Go to the message screen
    onMessagePress(val) {
        this.props.navigation.navigate('MessageScreen', { data: val, type: 'conversation', role: 'client' });
    }

    timeFormat(getValue) {
        const local = new Date((getValue));
        const date = Moment(local).fromNow();
        return date;
    }

    renderLoader() {
        if (this.props.loading) {
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.props.loading} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
    }


    renderRow(details) {
        return (
            <View style={styles.CardContainer}>
                <TouchableOpacity onPress={() => { this.onMessagePress(details); }}>
                    <Card style={styles.cardViewStyle}>
                        <CardItem>
                            <View style={styles.infoView}>
                                <View style={styles.nameViewWrap}>
                                    <View style={styles.nameView}>
                                        <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                        <View style={styles.nameSpacing}>
                                            <Text style={styles.nameStyling}>{details.fullName}</Text>
                                            {/* <Text note>{details.group_name}</Text> */}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.dateView}>
                                    <Text style={styles.dateText}>{this.timeFormat(details.createdAt)}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <View style={AppStyles.lineStyle} />
                        <CardItem>
                            <Body>
                                {/* <Text style={styles.messageTitle}>
                                    {details.LastText}
                                </Text> */}
                                <Text style={styles.messageDescription}>
                                    {_.startsWith(details.LastText, 'https://image') || _.startsWith(details.LastText, 'https://firebasestorage.') ? 'Video/image': details.LastText}<Text style={styles.viewText}> VIEW FULL MESSAGE</Text>
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        {this.state.conversations && this.state.conversations.length > 0 ?
                            <ListView
                                dataSource={this.ds.cloneWithRows(this.state.conversations)}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections
                            />
                            :
                            <View style={styles.nodataView}>
                                <Text style={styles.nodataText}>
                                    No Message Available
                                </Text>
                            </View>
                        }
                    </View>
                    {this.renderLoader()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (state) => {
    console.log(state, 'checking MessageConversationList');
    const conver = state.getConversationList.conversationList.map((res) => res);
    const { conversationList, error, loading } = state.getConversationList;
    console.log('conversationList', conversationList);
    return { conver, error, loading, conversationList };
};

export default connect(mapStateToProps, { getCoversationList, getMessage })(GeneralMessage);

