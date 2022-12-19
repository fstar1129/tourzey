import React, { Component } from 'react';
import {
    Text, Form, Button
} from 'native-base';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
import { View, ScrollView, Image, TouchableOpacity, Dimensions, Platform} from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import {
    fbLogin
} from '../../action/index';
import Theme from '../../themes/Theme';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';

class LaunchScreen extends Component {
    static contextTypes = {
        isLoggedIn: PropTypes.bool,
        login: PropTypes.func,
        logout: PropTypes.func,
        props: PropTypes.shape({})
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    onEmailPress() {
        this.props.navigation.navigate('Register');
    }
    onSignInPress() {
        this.props.navigation.navigate('Login');
    }

    componentWillReceiveProps(nextProps) {
        console.log('nprops', nextProps);
        this.setState({ visible: false });
    }

    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    // todo:pavi @ jana cr-mi: use styles for line
    // todo:pavi @ jana cr-mi: remove unused codes

    render() {
        const _this = this;
        const SCREEN_HEIGHT = Dimensions.get('window').height;
        let bigScreen ={position:'absolute',top:'37%'}
        let bigLogo ={position:'absolute',top:'3%'}
        if(SCREEN_HEIGHT >= 790){
            bigScreen = {position:'absolute',top:'47%'}
            bigLogo = {position:'absolute' ,top:'13%'}
        }
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
            {/* <View style={styles.mainView}> */}
            {
                SCREEN_HEIGHT >= 790 ?
                <Image
                source={Theme.Images.logo.logo}
               
                style={[AppStyles.logoSizeMedium, bigLogo]}
                />
            :
            <Image
            source={Theme.Images.logo.logo}
           
            style={[AppStyles.logoSizeMedium, bigLogo]}
            />
            }
          
               <View style={[styles.mainView, { position: 'relative' }]}>
                <View style={[styles.formContainer, bigScreen]}>
                    <Text style={styles.headingStyle}>Sign Up</Text>
                    <Text style={styles.optionHeading}>Choose an option an below</Text>
                        <TouchableOpacity style={styles.primaryButton} onPress={this.onEmailPress.bind(this)}>
                            <LinearGradientView style={AppStyles.primaryButton} buttonStyle={'small'} name={"I'll use my email"} />
                        </TouchableOpacity>
                        <View style={styles.lineStyle}>
                            <View
                                style={styles.lineLeft}
                            />
                            <View style={styles.signupText}>
                                <Text style={styles.signupWithText}>or sign up with</Text>
                            </View>
                            <View
                                style={styles.lineRight}
                            />
                        </View>
                        { 
                                  Platform.OS === 'ios' ?       
                                  <Button
                                  style={styles.primaryFBButton} onPress={() => {
                                      FBLoginManager.loginWithPermissions(['email'], (error, data) => {
                                          if (!error) {
                                              console.log('Login data: ', data);
                                              this.setState({ visible: true });
                                              // todo-cr-mi : pavi @ boopi remove console
                                              console.log(data);
                                              const provider = firebase.auth.FacebookAuthProvider;

                                              const credential = provider.credential(data.credentials.token);
                                              console.log('cre', credential);
                                              this.props.fbLogin(credential);
                                          } else {
                                              console.log('Error: ', data);
                                          }
                                      });
                                  }}
                                  >
                                  <Icon name="facebook-f" style={styles.fbIcon} size={30} />
                                  <Text style={styles.buttonText} uppercase={false}>Facebook</Text>
                              </Button> 
                              : 
                              <FBLogin
                                        buttonView={
                                            <Button
                                            style={styles.primaryFBButton} onPress={() => {
                                                FBLoginManager.loginWithPermissions(['email'], (error, data) => {
                                                    if (!error) {
                                                        console.log('Login data: ', data);
                                                        this.setState({ visible: true });
                                                        // todo-cr-mi : pavi @ boopi remove console
                                                        console.log(data);
                                                        const provider = firebase.auth.FacebookAuthProvider;

                                                        const credential = provider.credential(data.credentials.token);
                                                        console.log('cre', credential);
                                                        this.props.fbLogin(credential);
                                                    } else {
                                                        console.log('Error: ', data);
                                                    }
                                                });
                                            }}
                                            >
                                            <Icon name="facebook-f" style={styles.fbIcon} size={30} />
                                            <Text style={styles.buttonText} uppercase={false}>Facebook</Text>
                                        </Button>}
                                        ref={(FbLogin) => { console.log('lggg'); this.fbLogin = FbLogin; }}
                                        permissions={['email', 'public_profile']}
                                        loginBehavior={FBLoginManager.LoginBehaviors.Web}
                              />
                                }
                        {this.renderLoader()}
                        <View style={AppStyles.buttonSignIn}>
                            <Text>Already on Tourzey?</Text>
                            <TouchableOpacity onPress={this.onSignInPress.bind(this)}>
                                <Text style={AppStyles.buttonTextLink}>{'Sign In'.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


export const mapStateToProps = ({ Login, Signup }) => {
    const { userData, loading, loggedin, error } = Login;
    const { user, signedin } = Signup;

    return {
        userData,
        user,
        loading,
        loggedin,
        error,
        signedin
    };
};

export default
    connect(mapStateToProps, { fbLogin })(LaunchScreen);
