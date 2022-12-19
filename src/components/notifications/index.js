import React, { Component } from 'react';
import {
    TouchableOpacity, ScrollView, Text, Image, Alert, AsyncStorage, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import { View, Button } from 'native-base';
import styles from './styles';
import Theme from '../../themes/Theme';
import {
    deleteNotification,
    updateSeenStatus,
    getSupportdata,
    getOwnNotifications
} from '../../action';
import { orderByFun } from '../../utils/orderFormat';
import { timeFormat } from '../../utils/dateTimeFormat';
import { notificationService } from '../../action/services/notificationServices';

class Notifications extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Notifications',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            // notifications: this.props.navigation.state.params && this.props.navigation.state.params.notifications ?
            //     this.props.navigation.state.params.notifications : [],
            notifications: [],
        };
    }

    componentDidMount() {
        this.props.getOwnNotifications();
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
        if (nextProps && nextProps.notifications !== this.props.notifications) {
            const tempArray = orderByFun(nextProps.notifications);
            this.setState({ notifications: tempArray }, () => {
            });
        }
    }

    viewNotification(data, key) {
        if (data.userSeen === false) {
            const tempNotifications = this.state.notifications;
            this.state.notifications[key].userSeen = true;
            this.setState({ notifications: tempNotifications }, () => {
                this.props.updateSeenStatus(this.state.notifications[key].dataId);
            });
        }

        const { page, tourId, messageData } = data;
        if (page === 'TourDetailScreen') {
            notificationService.requestedTourNotify(tourId)
                .then((res) => {
                    if (res) {
                        console.log('jnnnnnjnjnjnjn', res);
                        this.props.navigation.navigate('TourDetailScreen', { tourInfo: res, tourCategory: 'Current' });
                    } else {
                        this.nodataNotification(data);
                    }
                });
        } else if (page === 'CompletedTours') {
            notificationService.completedTourNotify(tourId)
                .then((res) => {
                    if (res) {
                        this.props.navigation.navigate('TourDetailScreen', { tourInfo: res, tourCategory: 'Pass' });
                    } else {
                        this.nodataNotification(data);
                    }
                });
        } else if (page === 'MessageScreen') {
            console.log('jnnnnnjnjnjnjn', page, messageData);
            AsyncStorage.getItem('userdata').then((value) => {
                const list = JSON.parse(value);
                const listValue = list && list.blockList ? list.blockList : [];
                const status = _.find(listValue, (o) => {
                    console.log(o, messageData.sendToid, 'status');
                    return o === messageData.sendToid;
                });
                console.log('status find', status, messageData);
                if (messageData) {
                    let blockedStatus;
                    if (status === undefined || status === false || status === null) {
                        blockedStatus = false;
                    }
                    if (status) {
                        blockedStatus = true;
                    }
                    this.props.navigation.navigate('MessageScreen', { data: messageData, type: 'conversation', role: 'client', blockedStatus, userData: this.props.userData });
                }
            });
        }
    }
    nodataNotification(data) {
        Alert.alert(
            'No data Available for this past notification!',
            'Are you sure you want to Remove?',
            [
                { text: 'Ok', onPress: () => this.deleteNotification(data), style: 'cancel' },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false }
        );
    }
    deleteNotification(notifications) {
        this.props.deleteNotification(notifications);
        const pulled = _.remove(this.state.notifications, (e) => {
            return e.dataId !== notifications.dataId;
        });
        const tempArray = orderByFun(pulled);
        this.setState({ notifications: tempArray });
    }
    deleteAlert(notifications) {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to Remove?',
            [
                { text: 'Ok', onPress: () => this.deleteNotification(notifications), style: 'cancel' },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false }
        );
    }

    renderLoader() {
        if (this.props.notificationsLoader) {
            return (
                // <View style={{ flex: 1 }}>
                //     <Spinner visible={this.props.notificationsLoader} textContent={'Loading...'} textStyle={styles.toastStyle} />
                // </View>
                <ActivityIndicator />
            );
        }
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                {this.renderLoader()}
                <ScrollView
                    style={styles.ScrollViewStyle}
                >
                    {this.state.notifications.length > 0 ?
                        this.state.notifications.map((data, key) => {
                            return (
                                <View>
                                    <TouchableOpacity style={data.userSeen === true ? styles.seenCss : styles.unseenCss} onPress={() => this.viewNotification(data, key)}>
                                        <View style={styles.cardItemStyle1}>
                                            <View style={styles.cardItemStyle}>
                                                <Text style={styles.textStyle}>{data.title}</Text>
                                                <Text style={styles.labelStyle}>{timeFormat(data.createdAt)}</Text>
                                            </View>
                                            <Text style={styles.bodyStyle}>{data.body}</Text>
                                            <View style={styles.buttonView}>
                                                <Button info={true} style={styles.buttonStyle}
                                                    onPress={() => this.deleteAlert(data)}
                                                >
                                                    <Text style={styles.buttonText}>Remove</Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.borderStyle}
                                    />
                                </View>
                            );
                        })
                        :
                        <View style={styles.nodataInfo}>
                            <Text style={styles.nodataText}>
                                No data Available...
                        </Text>
                        </View>
                    }
                </ScrollView>
            </View>
        );
    }
}

export const mapStateToProps = (state) => {
    const { notifications, notificationsLoader } = state.getNotifications;
    return {
        notifications,
        notificationsLoader
    };
};
export default
    connect(mapStateToProps, {
        deleteNotification,
        updateSeenStatus,
        getSupportdata,
        getOwnNotifications
    })(Notifications);
