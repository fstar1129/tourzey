
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { LogoutUser } from '../action/index';


class logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // visible: true
        };
    }
    componentDidMount() {
        this.props.LogoutUser();
    }
    renderLoader() {
        if (this.props.navigation && this.props.navigation.state.params && this.props.navigation.state.params.loading) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Logging out...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
        } else {
            this.state.visible = false;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Logging out...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {this.renderLoader()}
            </View>
        );
    }
}

export const mapStateToProps = (status) => {
    const navigateTo = status.isSignedin.navigateTo;
    const userData = status.getuserData.userData;

    return {
        navigateTo,
        userData
    };
};
export default connect(mapStateToProps, {
    LogoutUser
})(logout);
