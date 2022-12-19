
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, NetInfo, Alert } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, createBottomTabNavigator } from 'react-navigation';
// todo-cr-mi: janani @boopi - align import files properly
import { Thumbnail } from 'native-base';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-smart-splash-screen';
import Login from '../components/login/index';
import Register from '../components/register/index';
import TermsAndConditions from '../components/register/TermsAndConditions';
import SettingsScreen from '../components/settingsScreen/index';
import AgentProfile from '../components/agentProfile/index';
import PostJob from '../components/postJob/index';
import ListPrice from '../components/listPrice/index';
import Description from '../components/description/index';
import Location from '../components/location/index';
import SelectService from '../components/service/index';
import JobPostCompleted from '../components/jobPostCompleted/index';
import Jobs from '../components/jobs/index';
import ContractDetail from '../components/contractDetail/index';
import Offers from '../components/offers/index';
import { isSignedIn, fetchData } from '../action/index';
import MessageScreen from '../common/message/index';
import Message from '../components/message/index';
import Billing from '../components/billing/index';
import Logout from '../components/Logout';
import Progress from '../components/progress';
import styles from './styles';
import Theme from '../themes/Theme';
import Colors from '../themes/main/Theme.Main.Colors';
import Font from '../themes/main/Theme.Main.Font';
import FontWeight from '../themes/main/Theme.Main.FontWeight';
import About from '../components/about/index';
import CompletedJobs from '../components/completeJobs/index';
import ArchiveJobs from '../components/jobs/archiveJobs/index';
import ProfileEdit from '../components/profileEdit/index';
import ChangePassword from '../components/profileEdit/changePassword/index';
import RateAndReview from '../components/rateAndReview/index';
import Media from '../components/media/index';
import LaunchScreen from '../components/launch/index';
import Launch1 from '../components/launch1/index';
import Launch2 from '../components/launch2/index';
import Launch3 from '../components/launch3/index';
import Hire from '../components/hire/index';
import FAQ from '../components/faq/index';
import Payment from '../components/payment/index';
import PaymentFunded from '../components/paymentFunded/index';
import Guidance from '../components/supportClient/guidance/index';
import Questions from '../components/supportClient/questions/index';
import Details from '../components/supportClient/details/index';
import GuideProfile from '../components/guideProfile/index';
import Information from '../components/information/index';
import ReleaseFunds from '../components/releaseFunds/index';
import CompleteTour from '../components/completeTour/index';
import CompleteReview from '../components/completeReview/index';
import HireAgent from '../components/hireAgent/index';
import TourDetails from '../components/tourDetails/index';
import Mood from '../components/mood/index';
import JobComplete from '../components/jobComplete/index';
import Support from '../components/support/index';
import ContactUs from '../components/contactUs/index';
import Dispute from '../components/dispute/index';
import HomeScreen from '../components/home/index';
import SearchLocation from '../components/search/index';
import FindTours from '../components/findTours/index';
import TourConfirmation from '../components/tourConfirmation/index';
import ToursList from '../components/toursList/index';
import TourDesc from '../components/tourDesc/index';
import Tours from '../components/tours/index';
import SearchResults from '../components/searchResults/index';
import TourDetailScreen from '../components/tourDetailScreen/index';
import TourSupport from '../components/tourSupport/index';
import FavoriteTours from '../components/favorites/index';
import Notifications from '../components/notifications/index';


let userdata = {
  fullName: '',
  email: '',
  role: ''
};
// todo-cr-mi: janani @ boopi - remove unwanted package,install flow/eslint
// const DrawerContent = (props) => (
//   <View>
//     <View style={styles.profileView}>
//       <Text style={{ color: '#0052d9' }} />
//       <TouchableOpacity
//         onPress={() => {
//           props.navigation.navigate('ProfileEdit');
//         }}
//         style={styles.wrapper}
//       >
//         <View style={styles.back}>
//           {userdata && userdata.imageData && userdata.imageData.uri ?
//             //todo cr-si: janani - Don't Duplicate view instead use ternary condition
//             <Thumbnail style={styles.profileImage} source={{ uri: userdata.imageData.uri }} />
//             :
//             <Thumbnail style={styles.profileImage} source={Theme.Images.profile_screen.default_avatar} />
//           }
//         </View>
//         <View style={styles.front}>
//           <Thumbnail style={styles.addIcon} source={Theme.Images.icons.addIcon} />
//         </View>
//       </TouchableOpacity>
//       <Text style={styles.userName}>
//         {userdata && userdata.fullName}
//       </Text>
//     </View>
//     <DrawerItems {...props} />
//   </View>
// );


// export const Sidebar = (navigateTo) => DrawerNavigator(
//   {

//     LaunchScreen: {
//       screen: LaunchScreen,
//       navigationOptions: {
//         header: null,
//         drawerLockMode: 'locked-closed',
//         drawerLabel: () => null
//       }
//     },
//     Register: {
//       screen: Register,
//       navigationOptions: {
//         header: null,
//         drawerLockMode: 'locked-closed',
//         drawerLabel: () => null
//       }
//     },
//     Login: {
//       screen: Login,
//       navigationOptions: {
//         header: null,
//         drawerLockMode: 'locked-closed',
//         drawerLabel: () => null
//       }
//     },
//     Home: {
//       screen: createRootNavigator,
//       navigationOptions: {
//         drawerLabel: () => null
//       },
//     },
//     Jobs: {
//       screen: Jobs,
//       navigationOptions: {
//         drawerIcon: () => (<Image source={Theme.Images.icons.jobsIcon} style={styles.navIcons} />),
//         drawerLabel: 'Jobs',
//       },
//     },
//     Favorites: {
//       screen: Offers,
//       navigationOptions: {
//         drawerIcon: () => (<Image source={Theme.Images.icons.favoritesIcon} style={styles.navIcons} />),
//         title: 'Offers / Favorites '
//       }
//     },
//     Messages: {
//       screen: MessageScreen,
//       navigationOptions: {
//         drawerIcon: () => (<Image source={Theme.Images.icons.messagesIcon} style={styles.navIcons} />),
//         title: 'Messages '
//       },
//     },
//     // Billing: {
//     //   screen: Billing,
//     //   navigationOptions: {
//     //     drawerIcon: () => (<Image source={Theme.Images.icons.billingIcon} style={styles.navIcons} />),
//     //     title: 'Billing '
//     //   }
//     // },.
//     Support: {
//       screen: Support,
//       navigationOptions: {
//         // drawerIcon: () => (<Image source={Theme.Images.icons.settingsIcon} style={styles.navIcons} />),
//         // title: 'Support '
//       }
//     },
//     Settings: {
//       screen: SettingsScreen,
//       navigationOptions: {
//         drawerIcon: () => (<Image source={Theme.Images.icons.settingsIcon} style={styles.navIcons} />),
//         title: 'Settings '
//       }
//     },
//     About: {
//       screen: About,
//       navigationOptions: {
//         drawerIcon: () => (<Image source={Theme.Images.icons.aboutIcon} style={styles.navIcons} />),
//         title: 'About '
//       }
//     },
//   },
//   {
//     contentComponent: DrawerContent,
//     initialRouteName: navigateTo,
//     contentOptions: {
//       activeTintColor: Colors.sidebarText,
//       activeBackgroundColor: 'transparent',
//       inactiveTintColor: Colors.sidebarText,
//       inactiveBackgroundColor: 'transparent',
//       labelStyle: {
//         fontSize: Font.sizes.default,
//         fontWeight: FontWeight.weight.sidebarText
//       },
//     }
//   }
// );

const Tabs = createBottomTabNavigator({
  Jobs: {
    screen: HomeScreen,
    //Todo cr by suren @jaga mi- remove unused params
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon
        name="home" size={25} color={tintColor}
      />
    },
  },
  Favorites: {
    // screen: SettingsScreen,
    screen: FindTours,
    //screen: Tours,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon
        name="search" size={25} color={tintColor}
      />,
    },
  },
  Profile: {
    // screen: ProfileEdit,
    screen: SettingsScreen,

    // screen: Tours,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon
        name="user" size={25} color={tintColor}
      />,
    },
  },
},
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#04A4B5'
    },
  });


export const createRootNavigator = (navigateTo) =>
  StackNavigator({
    Launch1: {
      screen: Launch1,
      navigationOptions: {
        header: null,
      }
    },
    Launch2: {
      screen: Launch2,
      navigationOptions: {
        header: null,
      }
    },
    Launch3: {
      screen: Launch3,
      navigationOptions: {
        header: null,
      }
    },
    LaunchScreen: {
      screen: LaunchScreen,
      navigationOptions: {
        header: null,
        drawerLockMode: 'locked-closed',
        drawerLabel: () => null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => {
        const key = navigation.state.index;
        console.log('App navigator', key, navigation.state.routes[key].params);
        return {
          title: (navigation.state.routes[key].params && navigation.state.routes[key].params.title ? navigation.state.routes[key].params.title : null),
          header: key === 0 && null,
          headerStyle: { justifyContent: 'center' },
          headerTitleStyle: {
            flex: 3,
            flexDirection: 'row'

          }
        };
      }
    },
    Guidance: {
      screen: Guidance,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => <Icon
          name="user" size={25} color={tintColor}
        />
      }),
    },

    Favorites: {
      screen: Offers,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
      }),
    },
    Search: {
      screen: SearchLocation,
    },
    Media: {
      screen: Media,
      // navigationOptions: ({ navigation }) => ({
      //   headerLeft: <DrawerButton navigation={navigation} />,
      // }),
    },
    Messages: {
      screen: Message
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        //  headerLeft: <DrawerButton navigation={navigation} />,
      }),
    },
    Offers: {
      screen: Offers,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
      }),
    },
    Support: {
      screen: Support,
    },
    TourSupport: {
      screen: TourSupport
    },

    CompleteReview: {
      screen: CompleteReview,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
      }),
    },
    Hire: {
      screen: Hire,
    },
    Payment: {
      screen: Payment,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
      })
    },
    PaymentFunded: {
      screen: PaymentFunded,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
      })
    },
    ReleaseFunds: {
      screen: ReleaseFunds,
    },
    CompleteTour: {
      screen: CompleteTour,
    },
    JobComplete: {
      screen: JobComplete
    },
    Mood: {
      screen: Mood
    },
    FAQ: {
      screen: FAQ,
    },
    Billing: {
      screen: Billing
    },
    CompletedJobs: {
      screen: CompletedJobs,
    },
    AgentProfile: {
      screen: AgentProfile,
    },
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
      }),
    },
    HireAgent: {
      screen: HireAgent,
    },
    ContractDetail: {
      screen: ContractDetail,
    },
    TermsAndConditions: {
      screen: TermsAndConditions,
    },
    PostJob: {
      screen: PostJob
    },
    SelectService: {
      screen: SelectService
    },
    ListPrice: {
      screen: ListPrice
    },
    Description: {
      screen: Description
    },
    Location: {
      screen: Location
    },
    JobPostCompleted: {
      screen: JobPostCompleted,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
      }),
    },
    SettingsScreen: {
      screen: SettingsScreen
    },
    FindTours: {
      screen: FindTours
    },
    MessageScreen: {
      screen: MessageScreen
    },
    Message: {
      screen: Message
    },
    Logout: {
      screen: Logout,
      navigationOptions: () => ({
        header: null
      }),
    },
    ProfileEdit: {
      screen: ProfileEdit,
      // navigationOptions: ({ navigation }) => ({
      //   headerLeft: <DrawerButton navigation={navigation} />
      // }),
    },
    ChangePassword: {
      screen: ChangePassword,
    },
    Progress: {
      screen: Progress
    },
    ArchiveJobs: {
      screen: ArchiveJobs
    },
    RateAndReview: {
      screen: RateAndReview
    },
    TourDetails: {
      screen: TourDetails
    },
    ContactUs: {
      screen: ContactUs
    },
    Dispute: {
      screen: Dispute
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      }
    },
    GuideProfile: {
      screen: GuideProfile
    },
    TourConfirmation: {
      screen: TourConfirmation,
    },
    ToursList: {
      screen: ToursList,
    },
    TourDesc: {
      screen: TourDesc,
      navigationOptions: {
        header: null,
      }
    },
    Questions: {
      screen: Questions,
    },
    Details: {
      screen: Details,
    },
    Tours: {
      screen: Tours
    },
    SearchResults: {
      screen: SearchResults
    },
    FavoriteTours: {
      screen: FavoriteTours
    },
    TourDetailScreen: {
      screen: TourDetailScreen
    },
    Information: {
      screen: Information
    },
    Notifications: {
      screen: Notifications,
    },
  }, {
      initialRouteName: navigateTo,
      headerLayoutPreset: 'center'
    }
  );

const DrawerButton = (props) => (
  <View>
    <TouchableOpacity onPress={() => { props.navigation.navigate('DrawerOpen'); }}>
      <Icon name='bars' size={25} style={styles.menuIcon} />
    </TouchableOpacity>
  </View>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: {
        fullName: '',
        role: ''
      }
    };
  }

  async componentWillMount() {
    await this.props.isSignedIn();
    //todo-cr-si: suren @ janani - remove unwanted function 
    NetInfo.addEventListener(
      'connectionChange',
      (connectionInfo) => {
        if (connectionInfo.type === 'none') {
          this.showNetworkAlert();
        }
      }
    );
  }

  componentDidMount() {
    //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextp', nextProps);
    if (this.props.loginData.loggedin !== nextProps.loginData.loggedin ||
      nextProps.signupData.signedin !== this.props.signupData.signedin) {
      this.props.fetchData();
    }
    this.setState({ navigateTo: nextProps.navigateTo });
    if (nextProps.userData !== this.props.userData) {
      //todo-cr-si: janani : Don't unneccessary setState if not used
      this.setState({ userData: nextProps.userData });
      userdata = nextProps.userData;
    }
    if (nextProps.loginData) {
      if (nextProps.loginData.loggedin) {
        this.setState({ navigateTo: 'Home' });
        if (nextProps.loginData.userData !== this.props.loginData.userData) {
          //todo-cr-si: janani : Don't unneccessary setState if not used
          this.setState({ userData: nextProps.loginData.userData });
          userdata = nextProps.loginData.userData;
        }
      }
    }
    if (nextProps.signupData) {
      if (nextProps.signupData.signedin) {
        this.setState({ navigateTo: 'Home' });
        if (nextProps.signupData.userData !== this.props.signupData.userData) {
          //todo-cr-si: janani : Don't unneccessary setState if not used
          this.setState({ userData: nextProps.signupData.userData });
          userdata = nextProps.signupData.userData;
        }
      }
    }
  }
 
  showNetworkAlert = () => {
    Alert.alert(
      'No Network Connection',
      'Please make sure you are connected to the internet.',
      [
        { text: 'OK' }
      ],
      { cancelable: false }
    );
  }


  render() {
    console.log('ngto', this.state.navigateTo, this.props.navigateTo);
    //todo cr-mi: janani - remove console log.once functionality is completed
    const Layout = createRootNavigator(this.state.navigateTo);
    return <Layout />;
  }
}

export const mapStateToProps = (status) => {
  console.log('status', status);
  const navigateTo = status.isSignedin.navigateTo;
  const userData = status.getuserData.userData;
  const loginData = status.Login;
  const signupData = status.Signup;

  return {
    navigateTo,
    userData,
    loginData,
    signupData
  };
};


export default connect(mapStateToProps, { isSignedIn, fetchData })(App);
