import React, { Component } from 'react';
import { View, ListView, TouchableOpacity } from 'react-native';
import { Button, Segment, Content, Text, Container }
    from 'native-base';
import { data } from './mock';
import AllOffers from './all/index';
import Favorites from './favorites/index';
import styles from './styles';
import Theme from '../../themes/Theme';


export default class Offers extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Offers',
        headerLeft: null,
        headerRight:
        null,
        headerStyle: {
          backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
          color: Theme.Colors.primary,
          fontSize: Theme.Font.sizes.title,
          fontWeight: 'normal',
          textAlign: 'center', 
          flex: 0.8,
        },
      });

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            all: false,
        };
    }

    onFavoritesPress() {
        this.setState({
            all: true
        });
    }
    allPress() {
        this.setState({
            all: false
        });
    }

   capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
      }
      

    render() {
        return (
            <Container style={styles.container}>
                <Segment style={styles.segmentView}>
                    <TouchableOpacity style={styles.tochableButton}>
                        <Button first style={styles.secondaryButtonWhite} onPress={this.allPress.bind(this)}>
                            <Text uppercase={false} style={this.state.all === false ? styles.buttonTextPrimary : styles.buttonTextSecondary}>{this.capitalize('all')}</Text>
                        </Button>
                    </TouchableOpacity>
                    <View style={styles.lineStyle} />
                    <TouchableOpacity style={styles.tochableButton}>
                        <Button last style={styles.secondaryButtonWhite} onPress={this.onFavoritesPress.bind(this)}>
                            <Text uppercase={false} style={this.state.all === true ? styles.buttonTextPrimary : styles.buttonTextSecondary}>Favorites</Text>
                        </Button>
                    </TouchableOpacity>
                </Segment>
                {this.state.all === false &&
                    <Content padder>
                        <AllOffers navigation={this.props.navigation} />
                    </Content>
                }
                {this.state.all === true &&
                    <Content padder>
                        <Favorites navigation={this.props.navigation} />
                    </Content>
                }
            </Container>

        );
    }
}
