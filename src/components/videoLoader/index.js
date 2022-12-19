import React, { Component } from 'react';
import Video from 'react-native-video';
import _ from 'lodash';
import commonVideos from '../../themes/Theme';
import styles from './styles';


export default class VideoLoader extends Component {

    render() {
        const videoUrl = _.find(commonVideos.Videos.video, { name: this.props.tourType });
        return (
            <Video
                source={videoUrl.uri}
                repeat
                hideShutterView
                resizeMode="contain"
                style={this.props.screen === 'Category' ? styles.backgroundVideo : styles.background}
            />
        );
    }
}

