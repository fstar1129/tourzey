import React from 'react';
import firebase from 'react-native-firebase';
import {
    Text, Form, Item, Label, Input, Button, Textarea, Toast
} from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { View, ScrollView, Image, TouchableOpacity, Modal, Alert, Dimensions, AsyncStorage } from 'react-native';
import ValidationComponent from 'react-native-form-validator';

import {
    loginUser
} from '../../action/index';
import Theme from '../../themes/Theme';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import { TitleCase } from '../../utils/caseFormat';


class Login extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            icEye: 'visibility-off',
            passwordIcon: true,
            selectForgotpassword: false,
            visible: false
        };
    }

    componentWillMount() {
        AsyncStorage.removeItem('signupData');
        AsyncStorage.getItem('loginData').then(async res => {
            if (res !== null) {
                const details = JSON.parse(res);
                this.setState({
                    name: details.name,
                    email: details.email,
                    password: details.password,
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: false
        });
        if (nextProps.userData && nextProps.loggedin === true) {
            if (nextProps.userData.role === 'Client') {
                this.setState({
                    visible: false,
                    email: '',
                    password: ''
                });
                this.props.navigation.navigate('Jobs');
            }
        }
    }
    onLoginPress() {
        this.setState({
            visible: true,
            email: this.state.email.trim(),   //Removed white spaces
            password: this.state.password.trim()
       }, () => {
        console.log(this.state.email, this.state.password, 'echecking email');
        const { email, password } = this.state;
        const details = { email, password };
        AsyncStorage.setItem('loginData', JSON.stringify(details)).then(() => {
            this.validate({
                email: { email: true, required: true },
                password: { minlength: 5, maxlength: 15, password: true, required: true },
            }, () => {
            });

            if (this.getErrorMessages() === '') {
                this.props.loginUser({ email, password });
            } else {
                this.setState({ visible: false });
            }
        });
       });
    }
    onSignUpPress() {
        this.props.navigation.navigate('LaunchScreen');
    }
    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    changePwdType() {
        if (this.state.passwordIcon) {
            this.setState({ icEye: 'visibility', passwordIcon: false });
        } else {
            this.setState({ icEye: 'visibility-off', passwordIcon: true });
        }
    }

    openModal() {
        this.setState({
            selectForgotpassword: true
        });
    }
    forgotPassword() {
        if (this.state.email !== '' && this.state.email !== undefined) {
            firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(() => {
                    Alert.alert(
                        'Mail sent',
                        'Reset password link has been sent to your mail',
                        [
                            { text: 'Cancel', onPress: () => this.setState({ selectForgotpassword: false }), style: 'cancel' },
                            { text: 'OK', onPress: () => this.setState({ selectForgotpassword: false }) },
                        ],
                        { cancelable: false }
                    );
                })
                .catch((error) => {
                    const errorCode = error.code;
                    Alert.alert(
                        'Error',
                        errorCode,
                        [
                            { text: 'Cancel', onPress: () => this.setState({ selectForgotpassword: false }), style: 'cancel' },
                            { text: 'OK', onPress: () => this.setState({ selectForgotpassword: false }) },
                        ],
                        { cancelable: false }
                    );
                });
        } else {
            Toast.show({
                text: 'Please enter the email address',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            });
        }
    }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
        }
    render() {
        const SCREEN_HEIGHT = Dimensions.get('window').height;
        let bigScreen = { position: 'relative', top: '5%' };
        let bigLogo = { position: 'relative', top: '1%' };
        if (SCREEN_HEIGHT >= 790) {
            bigScreen = { position: 'relative', top: '25%' };
            bigLogo = { position: 'relative', top: '10%' };
        }
        return (
            <ScrollView
            keyboardShouldPersistTaps='handled'
            style={{ paddingBottom: 150 }}
            >
            <Modal
                animationType="slide"
                transparent
                visible={this.state.selectForgotpassword}
                onRequestClose={() => {
                    this.setState({ selectForgotpassword: false });
                }}
            >
                <View style={AppStyles.modelView}>
                    <View style={styles.modelContainer}>
                        <Text>Reset Password</Text>
                        <TouchableOpacity>
                            <Textarea
                                value={this.state.email}
                                autoFocus
                                onChangeText={(value) => this.setState({ email: value })}
                                style={styles.textareaView}
                                rowSpan={5}
                                placeholder="Enter Email Address"
                                placeholderTextColor="#8c8c8c"
                            />
                        </TouchableOpacity>
                        {/* todo-cr-si: janani: remove inline styles */}
                        <View style={styles.modalStyle}>
                            <TouchableOpacity onPress={() => this.setState({ selectForgotpassword: false })}>
                                <Text style={AppStyles.buttonTextLink}>{'Cancel'.toUpperCase()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.forgotPassword.bind(this)}>
                                <Text style={AppStyles.buttonTextLink}>{'Submit'.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <Image
                source={Theme.Images.logo.logo}
                style={[AppStyles.logoSizeMedium, bigLogo]}
            />
            <View style={[styles.mainView, { position: 'relative' }]}>
                {/* <View style={styles.formView}> */}

                    <View style={[styles.formContainer, bigScreen]}>
                        <Text style={AppStyles.formHeading}>Sign In</Text>
                        <Form>
                            <Item stackedLabel style={styles.itemMargin}>
                                <Label>Email</Label>
                                <Input
                                    placeholder="Enter Email Address" placeholderTextColor="#8c8c8c"
                                    ref="email"
                                    onChangeText={value => this.setState({ email: value })}
                                    value={this.state.email}
                                    style={styles.inputPadding}
                                />
                            </Item>
                            {this.isFieldInError('email') && this.getErrorsInField('email').map((errorMessage, key) =>
                                <Text key={key} style={styles.errorMessage}>
                                    {TitleCase(errorMessage)}
                                </Text>)}
                            <Item stackedLabel style={styles.itemMargin}>
                                <Label>Password</Label>
                                <Icons
                                    style={styles.eyeAndriodStyle}
                                    size={25}
                                    name={this.state.icEye}
                                    onPress={() => this.changePwdType()}
                                />
                                <Input
                                    placeholder="Enter Password" placeholderTextColor="#8c8c8c"
                                    secureTextEntry={this.state.passwordIcon}
                                    ref="password"
                                    onChangeText={value => this.setState({ password: value })}
                                    value={this.state.password}
                                    style={styles.inputPadding}
                                />
                            </Item>
                            {this.isFieldInError('password') && this.getErrorsInField('password').map((errorMessage, key) =>
                                <Text key={key} style={styles.errorMessage}>
                                    {TitleCase(errorMessage)}
                                </Text>)}
                            <View style={styles.buttonSignIn}>
                                <Text >Forgot password?</Text>
                                <TouchableOpacity onPress={this.openModal.bind(this)}>
                                    <Text style={styles.buttonTextLink}> SEND NEW</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <TouchableOpacity style={styles.primaryButton} onPress={this.onLoginPress.bind(this)}>
                                    <LinearGradientView style={AppStyles.primaryButton} buttonColor={'blueToGreen'} name={'Sign In'} />
                                </TouchableOpacity>
                            </View>

                            {this.renderLoader()}
                            <View style={styles.buttonSignIn1}>
                                <Text>New to Tourzey ?</Text>
                                <TouchableOpacity onPress={this.onSignUpPress.bind(this)}>
                                    <Text style={AppStyles.buttonTextLink}>{'Sign Up'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>

                        </Form>
                    </View>
            </View>
        </ScrollView>
        );
    }
}
Login.navigationOptions = {
    header: null
};


export const mapStateToProps = ({ Login }) => {
    const { userData, loading, loggedin, error } = Login;
    return {
        userData,
        loading,
        loggedin,
        error
    };
};

export default
    connect(mapStateToProps, { loginUser })(Login);

