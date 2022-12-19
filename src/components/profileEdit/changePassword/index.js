import React from 'react';
import firebase from 'react-native-firebase';
import { TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import ValidationComponent from 'react-native-form-validator';
import {
    View, Text
} from 'native-base';
import styles from './styles';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../../common/gradient/linearGradient';
import Theme from '../../../themes/Theme';
import { isStringEmpty } from '../../../utils/checkEmptycondition';
import { alertMessage, toastMessagesuccess, toastMessagefailure } from '../../../utils/showMessage';


export default class ChangePassword extends ValidationComponent {
    static navigationOptions = ({ navigation }) => ({
        title: 'Change Password',
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
            oldPassword: '',
            newPassword: '',
            loader: false
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
    }

    reauthenticate(currentPassword) {
        if (isStringEmpty(currentPassword)) {
            const user = firebase.auth().currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(
                user.email, currentPassword);
            return user.reauthenticateAndRetrieveDataWithCredential(cred);
        }
    }
    validation() {
        this.validate({
            oldPassword: { minlength: 5, maxlength: 15, required: true },
            newPassword: { minlength: 5, maxlength: 15, required: true },

        }, () => {
            this.setState({ loader: false });
        });
    }
    // this function is used to save the user details 
    onSavePress() {
        const user = firebase.auth().currentUser;
        if (
            this.state.oldPassword &&
            this.state.newPassword 
        ) {
            try {
                this.setState({
                    loader: true
                }, () => {
                    this.validation();
                    if (this.getErrorMessages() === '')
                    {
                    // reauthenticating
                    this.reauthenticate(this.state.oldPassword).then(() => {
                        // updating password
                        user.updatePassword(this.state.newPassword);
                        this.setState({ loader: false }, () => {
                            toastMessagesuccess('Updated password Successfully!!!');
                            this.props.navigation.navigate('ProfileEdit');
                        });
                        console.log('Success');
                    })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // alertMessage('warning', errorMessage);
                            toastMessagefailure(errorMessage);
                            this.setState({ loader: false });
                            console.log('ddddddd', errorCode, errorMessage);
                        });
                    } else {
                        this.setState({ loader: false });
                    }
                });
            } catch (error) {
                this.setState({ loader: false });
                toastMessagefailure(error);
                console.log(error);
            }
        } else {
            alertMessage('warning', 'Please fill the All fields');
        }
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.loader} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.viewStyle}>
                    <View style={styles.profileContainer}>
                        <Text style={styles.textHeader}>Old Password</Text>
                        <TextInput
                            ref="oldPassword"
                            style={styles.textinputStyle}
                            underlineColorAndroid="gray"
                            placeholder='Enter old password'
                            value={this.state.oldPassword}
                            onChangeText={oldPassword => this.setState({ oldPassword })}
                        />
                    </View>
                    {this.isFieldInError('oldPassword') && this.getErrorsInField('oldPassword').map((errorMessage, key) =>
                        <Text key={key} style={styles.errorMessage}>
                            {this.Capitalize(errorMessage)}
                        </Text>)}
                    <View style={styles.profileContainer}>
                        <Text style={styles.textHeader}>New Password</Text>
                        <TextInput
                            ref="newPassword"
                            style={styles.textinputStyle}
                            underlineColorAndroid="gray"
                            placeholder='Enter new password'
                            value={this.state.newPassword}
                            onChangeText={newPassword => this.setState({ newPassword })}
                        />
                    </View>
                    {this.isFieldInError('newPassword') && this.getErrorsInField('newPassword').map((errorMessage, key) =>
                        <Text key={key} style={styles.errorMessage}>
                            {this.Capitalize(errorMessage)}
                        </Text>)}
                    {this.renderLoader()}
                    <View>
                        <TouchableOpacity style={[AppStyles.tochableButton, AppStyles.tochableView]} onPress={this.onSavePress.bind(this)} >
                            <LinearGradientView style={AppStyles.bottomButton} name={'Submit'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
