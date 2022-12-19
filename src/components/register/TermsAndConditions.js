import React, { Component } from 'react';
import { Text, Container, Content } from 'native-base';
import { View, WebView, ActivityIndicator, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Theme from '../../themes/Theme';

export default class TermsAndConditions extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.name,
        headerLeft:
            navigation.state.params && navigation.state.params.headerLeft,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            // color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.medium,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8

        },
    });
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }
    onNavigationStateChange = (webViewState) => {
        try {
            console.log(webViewState, 'checkWebView');
            this.setState({ visible: webViewState.loading });
            if (webViewState.url.includes('http://wallpapersideas.com/tourzey/privacy-policy/')) {
                this.setState({
                    visible: false
                });
            }
        } catch (error) {
            console.log(error, 'Error');
        }
    }

    renderLoader() {
        return (
            <View >
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.props.navigation.state.params.value ?

                        <WebView
                            // style={{ height: 400, width: 300 }}
                            source={{ uri: this.props.navigation.state.params.value }}
                            onNavigationStateChange={this.onNavigationStateChange}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            // style={{ marginTop: 20 }}
                            onLoadStart={() => <ActivityIndicator />}
                        />
                        :
                        <ActivityIndicator />
                }
                {this.renderLoader()}

            </View>
        );
    }
}

