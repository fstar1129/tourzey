import React from 'react';
import {
    Text, Form, Item, Label, Input, Button, Toast
} from 'native-base';
import { View, ScrollView, Image, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import CheckBox from 'react-native-check-box';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ValidationComponent from 'react-native-form-validator';
import Icons from 'react-native-vector-icons/MaterialIcons';
import LinearGradientView from '../common/gradient/linearGradient';
import {
    signup
} from '../../action/index';
import Theme from '../../themes/Theme';
import Colors from '../../themes/main/Theme.Main.Colors';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import { isBooleanEmpty } from '../../utils/checkEmptycondition';
import { TitleCase } from '../../utils/caseFormat';

class Register extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            resetPassword: '',
            name: '',
            checked: false,
            icEye: 'visibility-off',
            icEye2: 'visibility-off',
            passwordIcon: true,
            passwordIcon2: true,
            ageChecked: false
        };
    }


    componentWillMount() {
        AsyncStorage.removeItem('loginData');
        AsyncStorage.getItem('signupData').then(async res => {
            if (res !== null) {
                const details = JSON.parse(res);
                this.setState({
                    name: details.name,
                    email: details.email,
                    password: details.password,
                    resetPassword: details.resetPassword,
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        //cr-todo-si by Punitha @Boopathi: Check if the Nextprops has the data, then check the condition
        if (nextProps && isBooleanEmpty(nextProps.signedin)) {
            this.setState({
                visible: false
            });
            this.props.navigation.navigate('Jobs');
        }
    }

    onButtonPress() {
        this.state.email = this.state.email.trim();
        this.state.password = this.state.password.trim();
        // console.log(this.state.email, this.state.password, 'trim');
        const { name, email, password, resetPassword } = this.state;
        const details = { name, email, password, resetPassword };
        if (password === resetPassword) {
            AsyncStorage.setItem('signupData', JSON.stringify(details)).then(() => {
                this.setState({ visible: true });
                this.validate({
                    name: { name: true, required: true },
                    email: { email: true, required: true },
                    password: { minlength: 5, maxlength: 15, password: true, required: true },
                    resetPassword: { minlength: 5, maxlength: 15, resetPassword: true, required: true },

                }, () => {
                    this.setState({ visible: false });
                });

                if (this.getErrorMessages() === '') {
                    this.props.signup(name, email, password, 'Client');
                } else {
                    this.setState({ visible: false });
                }
            });
        } else {
            Toast.show({
                text: 'Passwords mismatching!',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            });
        }
    }

    onSignInPress() {
        this.props.navigation.navigate('Login');
    }

    onClick() {
        //todo-cr-mi by Punitha @Boopathi: Use Simple instead of multiple times checking
        //i.e, this.setState({ checked: !this.state.checked})
        if (this.state.checked === true) {
            this.setState({ checked: false });
        } else {
            this.setState({ checked: true });
        }
    }

    onAgeClick() {
        if (this.state.ageChecked === true) {
            this.setState({ ageChecked: false });
        } else {
            this.setState({ ageChecked: true });
        }
    }

    //TODO: Need to add terms and service
    termsAndConditions() {
        this.props.navigation.navigate('TermsAndConditions', { value: 'https://tourzey.com/terms-of-use/', name: 'Terms of service' });
    }
    privacy() {
        this.props.navigation.navigate('TermsAndConditions', { value: 'https://tourzey.com/privacy-policy/', name: 'Privacy policy' });
    }
    agreement() {
        this.props.navigation.navigate('TermsAndConditions', { value: 'https://tourzey.com/cookies-policy/', name: 'User agreement' });
    }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.props.signupData.loading} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    // todo:cr:si: change the function names and state names to meaningful
    changePwdType() {
        if (this.state.passwordIcon) {
            this.setState({ icEye: 'visibility', passwordIcon: false });
        } else {
            this.setState({ icEye: 'visibility-off', passwordIcon: true });
        }
    }

    changePwdType2() {
        if (this.state.passwordIcon2) {
            this.setState({ icEye2: 'visibility', passwordIcon2: false });
        } else {
            this.setState({ icEye2: 'visibility-off', passwordIcon2: true });
        }
    }

    render() {
        console.log('checked', !this.state.checked, !this.state.ageChecked);
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <Image
                    source={Theme.Images.logo.logo}
                    style={AppStyles.logoSizeNormal}
                />
                <View>
                    <View style={AppStyles.formContainer}>
                        <Text style={AppStyles.formHeading}>Register</Text>

                        <Form>
                            <Item stackedLabel style={styles.itemMargin}>
                                <Label>Your Name</Label>
                                <Input
                                    placeholder="Enter Your Name" placeholderTextColor="#8c8c8c"
                                    ref="name"
                                    onChangeText={value => this.setState({ name: value })}
                                    value={this.state.name}
                                    style={styles.inputPadding}
                                />
                            </Item>
                            {this.isFieldInError('name') && this.getErrorsInField('name') &&
                                <Text style={styles.errorMessage}>
                                    Name Is Required
                                    </Text>}
                            <Item stackedLabel style={styles.itemMargin}>
                                <Label>Email</Label>
                                <Input
                                    placeholder="Enter Email Address" placeholderTextColor="#8c8c8c"
                                    ref="email"
                                    autoCapitalize='none'
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
                                    autoCapitalize='none'
                                    onChangeText={value => this.setState({ password: value })}
                                    value={this.state.password}
                                    style={styles.inputPadding}
                                />
                            </Item>
                            <Item stackedLabel style={styles.itemMargin}>
                                <Label>Re-type Password</Label>
                                <Icons
                                    style={styles.eyeAndriodStyle}
                                    size={25}
                                    name={this.state.icEye2}
                                    onPress={() => this.changePwdType2()}
                                />
                                {/*    //todo:cr:si: jaga@boopathi: change placeholder to this input field */}
                                <Input
                                    placeholder="Retype Password" placeholderTextColor="#8c8c8c"
                                    secureTextEntry={this.state.passwordIcon2}
                                    ref="password"
                                    autoCapitalize='none'
                                    onChangeText={value => this.setState({ resetPassword: value })}
                                    value={this.state.resetPassword}
                                    style={styles.inputPadding}
                                />
                            </Item>
                            {this.isFieldInError('password') && this.getErrorsInField('password').map((errorMessage, key) =>
                                <Text key={key} style={styles.errorMessage}>
                                    {TitleCase(errorMessage)}
                                </Text>)}
                                <Text style={styles.ageLabel}>
                                                 You must be at least 18 years old to use this app/site.
                                            </Text>
                            <View style={styles.checkBox}>
                                <CheckBox
                                    style={styles.checkboxCheck}
                                    onClick={() => { this.onAgeClick(); }}
                                    isChecked={this.state.ageChecked}
                                    checkBoxColor={Colors.primary}
                                />
                                <Text>
                                    <Text style={styles.checkBoxLabel}>
                                        Please confirm you are at least 18 years old.
                                    </Text>
                                </Text>
                            </View>
                            {/* check box */}
                            <View style={styles.checkBox}>
                                <CheckBox
                                    style={styles.checkboxCheck}
                                    onClick={() => { this.onClick(); }}
                                    isChecked={this.state.checked}
                                    checkBoxColor={Colors.primary}
                                />
                                <Text>
                                    <Text style={styles.checkBoxLabel}>
                                        Yes, I understand and agree to the Tourzey
                                       </Text>
                                    <Text onPress={() => this.termsAndConditions()} style={styles.checkBoxLink}> TERMS OF SERVICE<Text>, </Text ><Text onPress={() => this.privacy()} style={styles.checkBoxLink}>PRIVACY POLICY</Text> <Text>,</Text></Text>
                                    <Text style={styles.checkBoxLabel}> and </Text>
                                    <Text onPress={() => this.agreement()} style={styles.checkBoxLink}> END USER AGREEMENT</Text>.
                                    </Text>
                            </View>
                            {/* modal containing terms and conditions */}

                            <View style={styles.signUp} >
                                {!this.state.checked || !this.state.ageChecked ?
                                    <Button disabled style={AppStyles.disabledButton}>
                                        <Text style={styles.buttonTextDisabled} uppercase={false}>Register</Text>
                                    </Button>
                                    :
                                    <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onButtonPress.bind(this)}>
                                        <LinearGradientView style={AppStyles.primaryButton} buttonStyle={'small'} name={'Register'} buttonColor={'blueToGreen'} />
                                    </TouchableOpacity>
                                }
                            </View>
                            {this.renderLoader()}
                            <View style={AppStyles.buttonSignIn}>
                                <Text>New to Tourzey ?</Text>
                                <TouchableOpacity>
                                    <Text onPress={this.onSignInPress.bind(this)} style={AppStyles.buttonTextLink}>{'Sign In'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </Form>
                    </View>
                </View>
                {
                    Platform.OS === 'ios' &&
                    <KeyboardSpacer />
                }

            </ScrollView>

        );
    }
}
Register.navigationOptions = {
    header: null
};

export const mapStateToProps = (status) => {
    const signupData = status.Signup;
    console.log(status, 'stta');
    return {
        signupData
    };
};

export default
    connect(mapStateToProps, {
        signup
    })(Register);

