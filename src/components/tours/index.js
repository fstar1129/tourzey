import React, { Component } from 'react';
import { TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Button, Segment, Text }
    from 'native-base';
import ToursList from '../toursList/index';
import styles from './styles';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import { isStringEmpty } from '../../utils/checkEmptycondition';

export default class Tours extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Tours',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.default,
            fontSize: Theme.Font.sizes.regular,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
    });

    constructor(props) {
        super(props);
        this.onDataChanged = this.onDataChanged.bind(this);
        this.state = {
            selectedPage: 'Current',
        };
    }

    componentDidMount() {
        console.log('componentDidMount', this.state.selectedPage, this.props.navigation.state.params.tourTab);
        this.setState({
            selectedPage: this.props.navigation.state.params &&
                this.props.navigation.state.params.tourTab &&
                this.props.navigation.state.params.tourTab === 'Pass' ? 'Pass' : 'Current'
        }, () => {
            console.log('componentDidMount11111', this.state.selectedPage, this.props.navigation.state.params.tourTab);
        });
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

    onDataChanged(page) {
        console.log('onDataChanged', page);
        this.setState({ selectedPage: page });
    }

    tabPress(page) {
        this.setState({
            selectedPage: page
        });
    }

    render() {
        console.log('selectedPage', this.state.selectedPage);
        return (
            <ImageBackground
                source={Theme.Images.form_bg.form_bg}
                style={AppStyles.backgroundImage}
            >
                <Segment style={styles.segmentView}>
                    <TouchableOpacity style={styles.tochableButton}>
                        <Button first style={styles.secondaryButtonWhite} onPress={() => this.tabPress('Current')}>
                            <Text uppercase={false} style={this.state.selectedPage === 'Current' ? styles.buttonTextPrimary : styles.buttonTextSecondary}>Current</Text>
                        </Button>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tochableButton}>
                        <Button last style={styles.secondaryButtonWhite} onPress={() => this.tabPress('Pass')}>
                            <Text uppercase={false} style={this.state.selectedPage === 'Pass' ? styles.buttonTextPrimary : styles.buttonTextSecondary}>Pass</Text>
                        </Button>
                    </TouchableOpacity>
                </Segment>
                {this.state.selectedPage === 'Current' &&
                    <ToursList navigation={this.props.navigation} tourCategory={'Current'} onDataChanged={this.onDataChanged} />
                }
                {this.state.selectedPage === 'Pass' &&
                    <ToursList navigation={this.props.navigation} tourCategory={'Pass'} onDataChanged={this.onDataChanged} />
                }
            </ImageBackground>
        );
    }
}
