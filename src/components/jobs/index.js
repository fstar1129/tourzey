import React, { Component } from 'react';
import { View, ListView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Button, Segment, Content, Text, Thumbnail }
    from 'native-base';
import CompletedJobs from './completedJobs/index';
import ArchiveJobs from './archiveJobs/index';
import OpenJobs from './openJobs/index';
import styles from './styles';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
/////////////////////////////////
// import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';

export default class Jobs extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Your Tours',
        headerLeft: null,
        headerRight: null,
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
        this.onDataChanged = this.onDataChanged.bind(this);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            selectedPage: 'Open',
            plusPressed: false
        };
    }

    //todo cr-mi: janani - Please follow life cycle
    componentWillMount() {
        // Initialize the Firebase SDK
        // firebase.initializeApp({
        //   // ...
        // });

        // // Create a Firestore reference
        // const firestore = firebase.firestore();

        // // Create a GeoFirestore reference
        // const geofirestore: GeoFirestore = new GeoFirestore(firestore);

        // // Create a GeoCollection reference
        // const geocollection: GeoCollectionReference = geofirestore.collection('restaurants');

        // // Create a GeoQuery based on a location
        // const query: GeoQuery = geocollection.near({ center: new firebase.firestore.GeoPoint(40.7589, -73.9851), radius: 1000 });

        // // Get query (as Promise)
        // query.get().then((value: GeoQuerySnapshot) => {
        //   console.log(value.docs); // All docs returned by GeoQuery
        // });
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
        if (this.props.navigation.state.params && 
            this.props.navigation.state.params.page &&
            this.props.navigation.state.params.page === 'Complete') {
            this.setState({
                selectedPage: 'Complete'
            }, () => {
                this.props.navigation.setParams({ page: ' ' });
            });
        }
    }

    //todo cr-si: janani - please use common state variable for display jobs
    
    // todo cr-si: naaziya - Dont duplicate the functions, instead get by type
  
    onPressPlus() {
        this.setState({
            plusPressed: true
        });
    }

    onDataChanged(newValue) {
        this.setState({ 
            data: newValue,
            plusPressed: false 
        });
      }
      
    tabPress(page) {
        this.setState({
            selectedPage: page
        });
    }

    render() {
        return (
            <ImageBackground
            source={Theme.Images.allarest_jobs.jobs_bg}
            style={AppStyles.backgroundImage} 
            >
                <Segment style={styles.segmentView}>
                    <TouchableOpacity style={styles.tochableButton}>
                        <Button first style={styles.secondaryButtonWhite} onPress={() => this.tabPress('Open')}>
                            <Text uppercase={false} style={this.state.selectedPage === 'Open' ? styles.buttonTextPrimary : styles.buttonTextSecondary}>Open</Text>
                        </Button>
                    </TouchableOpacity>
                    <View style={styles.lineStyle} />
                    <TouchableOpacity style={styles.tochableButton}>
                        <Button last style={styles.secondaryButtonWhite} onPress={() => this.tabPress('Archive')}>
                            <Text uppercase={false} style={this.state.selectedPage === 'Archive' ? styles.buttonTextPrimary : styles.buttonTextSecondary}>Archive</Text>
                        </Button>
                    </TouchableOpacity>
                    <View style={styles.lineStyle} />
                    <TouchableOpacity style={styles.tochableButton}>
                        <Button last style={styles.secondaryButtonWhite} onPress={() => this.tabPress('Complete')}>
                            <Text uppercase={false} style={this.state.selectedPage === 'Complete' ? styles.buttonTextPrimary : styles.buttonTextSecondary}>Complete</Text>
                        </Button>
                    </TouchableOpacity>
                </Segment>
                
                {/* todo cr-si: janani - Don't duplicate view */}
                    {this.state.selectedPage === 'Open' &&
                        <Content padder>
                            <OpenJobs navigation={this.props.navigation} onDataChanged={this.onDataChanged} plusPressed={this.state.plusPressed} /> 
                        </Content>
                    }
                    {this.state.selectedPage === 'Open' && this.state.data && this.state.data.length > 0 && !this.state.plusPressed &&
                    <Content style={styles.plusIconView}>
                        <TouchableOpacity onPress={() => this.onPressPlus()}>                                
                            <Thumbnail style={styles.addjobIcon} source={Theme.Images.icons.addjobIocn} />
                        </TouchableOpacity>
                    </Content>
                    }
                    {this.state.selectedPage === 'Archive' &&
                    <Content padder>
                        <ArchiveJobs navigation={this.props.navigation} /> 
                    </Content>
                    }
                    {this.state.selectedPage === 'Complete' &&
                        <Content padder>
                            <CompletedJobs navigation={this.props.navigation} />
                        </Content>
                    }
            </ImageBackground>    
        );
    }
}
