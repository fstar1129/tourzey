import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native';
import { CardItem, Right, Switch, Left, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import Theme from '../../themes/Theme';
import { isSignedIn, updateProfileDetails, LogoutUser } from '../../action/index';

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
        header: null
    });
    constructor(props) {
        super(props);
        this.state = {
            imageData: '',
            notification: false,
            userData: '',
            setting: {},
            passportActivityLoader: true,
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({ title: 'Settings' });
        if (this.props && this.props.userData) {
            const { setting, imageData } = this.props.userData;

            this.setState({
                userData: this.props.userData,
                imageData,
                notification: setting && setting.notification,

            });
        }
    }
    /* Navigation will be added for all onclick functions*/
    onClickEditIcon() {
        this.props.navigation.navigate('ProfileEdit');
    }
    onClickPayment() {
        console.log('clicked payment icon');
    }
    onClickCertified() {
        this.props.navigation.navigate('GetCertified');
    }
    onClickMessages() {
        this.props.navigation.navigate('Message');
    }
    onClickTours() {
        // this.props.navigation.navigate('NewTours', { title: 'Current Tours' });
        this.props.navigation.navigate('Tours', { title: 'Current Tours' });
    }
    onClickFavorites() {
        console.log('onClickFavorites');
        this.props.navigation.navigate('FavoriteTours');
    }
    onClickSupport() {
        this.props.navigation.navigate('Support');
    
    }
    onClickContact() {
        this.props.navigation.navigate('ContactUs');
    
    }
    onClickNotification() {
        this.props.navigation.navigate('Notifications');
    }
    onClickAbout() {
        console.log('clicked support About icon');
    }
    onClickLogout() {
        Alert.alert(
            'Logout',
            'Are you sure you want to Logout?',
            [
                { text: 'Ok', onPress: () => this.props.navigation.navigate('Logout', { loading: true }), style: 'cancel' },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false }
        );
    }

    toggleswitch(value) {
        this.setState({ notification: value }, () => {
            const {
                imageData,
                fullName,
                email,
                phone,
                description,
                address,
                videoUrl,
                galleryImages,
                location,
                languages,
                youtubeLink,
                facebookLink,
                instagramLink
            } = this.props.userData;
            const setting = {
                notification: this.state.notification,
            };
            const data = {
                setting,
                imageData,
                fullName,
                email,
                phone,
                description,
                address,
                videoUrl,
                galleryImages,
                location,
                languages,
                youtubeLink,
                facebookLink,
                instagramLink
            };
            this.props.updateProfileDetails(data);
        });
    }

    render() {
        const { userData } = this.state;
        return (
            <ScrollView style={styles.containerViewStyle}>
                <View style={styles.containerViewStyle}>
                    <View>
                        <CardItem style={styles.itemView}>
                            <Left>
                                <TouchableOpacity onPress={() => { this.onClickEditIcon(); }}>
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
                                <TouchableOpacity onPress={() => { this.onClickEditIcon(); }}>
                                    <Text style={styles.largeTextStyle}>
                                        {userData ? userData.fullName : ''}
                                    </Text>
                                </TouchableOpacity>
                            </Left>
                            <Right>
                                <TouchableOpacity onPress={() => { this.onClickEditIcon(); }}>
                                    <View>
                                        <Thumbnail style={styles.editIcon} source={Theme.Images.icons.editIcon} />
                                    </View>
                                </TouchableOpacity>
                            </Right>
                        </CardItem>
                    </View>
                    {/* <View>
                        <TouchableOpacity onPress={() => { this.onClickPayment(); }}>
                            <CardItem style={styles.itemView}>
                                <Image
                                    source={Theme.Images.icons.paymentIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Payment</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.lineStyle} />
                    <View>
                        <TouchableOpacity onPress={() => { this.onClickMessages(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.messageIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Messages</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineStyle} />
                    <View>
                        <TouchableOpacity onPress={() => { this.onClickTours(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.tourIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Tours</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineStyle} />
                    <View>
                        <TouchableOpacity onPress={() => { this.onClickFavorites(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.favoriteIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Favorites</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineStyle} />
                    {/* <View>
                        <TouchableOpacity onPress={() => { this.onClickCertified(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.blackFacouriteIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Favourites</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View>  */}
                    <View style={styles.lineStyle} />
                    <View>
                        <CardItem>
                            <Left>
                                <Image
                                    source={Theme.Images.icons.notificationIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Notifications</Text>
                            </Left>
                            <Right>
                                <Switch
                                    onValueChange={(value) => this.toggleswitch(value)}
                                    value={this.state.notification}
                                    onTintColor={Theme.Colors.primary}
                                    thumbColor={Platform.OS === 'ios' ? null : Theme.Colors.white}
                                    tintColor={Platform.OS === 'ios' ? null : Theme.Colors.grey}
                                />
                            </Right>
                        </CardItem>
                    </View>
                    <View style={styles.lineStyle} />
                    <View>
                        <TouchableOpacity onPress={() => { this.onClickNotification(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.notificationIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>All Notifications</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineStyle} />
                    <View>
                        <TouchableOpacity onPress={() => { this.onClickSupport(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.supportIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Support</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineStyle} />
                    <View>
                        <TouchableOpacity onPress={() => { this.onClickContact(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.contactIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Contact Us </Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineStyle} />
                    {/* <View>
                        <TouchableOpacity onPress={() => { this.onClickAbout(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.aboutIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>About</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.lineStyle} />
                    <View>
                        <TouchableOpacity onPress={() => { this.onClickLogout(); }}>
                            <CardItem>
                                <Image
                                    source={Theme.Images.icons.logoutIcon}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.textStyle}>Logout</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

}


export const mapStateToProps = (status) => {
    console.log(status, 'settingsstatus');
    const { userData } = status.getuserData;
    return { userData };
};

export default connect(mapStateToProps, { isSignedIn, updateProfileDetails, LogoutUser })(SettingsScreen);
