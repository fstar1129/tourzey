//Todo reviewed by jaga @suren
//si removed unused import
//si remove unused codes 
 

import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import { HeaderBackButton } from 'react-navigation';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';

class Media extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Media ',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        }
    });
    
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: '',
            imageUrl: ''
        };
    }
    componentWillMount() {
        if (this.props.navigation.state.params.videoUrl) {
            const vUrl = `${this.props.navigation.state.params.videoUrl}.m3u8`;
            this.setState({ videoUrl: vUrl });
        }      
        if (this.props.navigation.state.params.imageUrl) {
            this.setState({ imageUrl: this.props.navigation.state.params.imageUrl });
        }   
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.backIcon}
                        style={AppStyles.backIcon}
                    />
                </TouchableOpacity>,
        });
    }

    //mi remove function
    onback() {
        this.props.navigation.goBack();
    }

    render() {
        if (this.state.videoUrl !== '') {
            return (
                    <VideoPlayer
                        source={{ uri: this.state.videoUrl }}
                        onBack={() => this.onback()}
                        controlTimeout={10000000}
                        disableVolume
                        disableFullscreen
                        disableBack
                        // 'https://stream.mux.com/PGxrkO1Hw200l9q021Svx4uhP5X6rZ00nUf.m3u8'
                    />
            );
        }
        if (this.state.imageUrl !== '') {
            return (
                <Image 
                source={{ uri: this.state.imageUrl }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
                />
            );
        }
    }
}
export default Media;
