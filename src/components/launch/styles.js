import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height - 30; 
export const SCREEN_FULLWIDTH = Dimensions.get('window').width - 100;  
const React = require('react-native');

const { StyleSheet } = React;
console.log(Dimensions.get('window').height, Dimensions.get('window').width, 'checkHeight');
export default {
  mainView: {
    flex: 1,
    display:'flex',
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    width:'100%',
    height:Dimensions.get('window').height, //To take full height
  },
  signIn: {
    marginVertical: Metrics.margins.medium, 
    marginHorizontal: Metrics.margins.large,
    flex: 1, 
  },
  lineStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom: Metrics.margins.pageSpace,
  },
  lineLeft:{
    marginLeft: '8%',
    marginRight: '5%',
    width: '18%',
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 1,
},
lineRight:{
    marginRight: '8%',
    marginLeft: '5%',
    width: '21%', 
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 1,

},
optionHeading: {
    color: Colors.default,    
    textAlign: 'center',
    fontSize:17,
    marginBottom: Metrics.margins.large,
  },
  headingStyle:{
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 30,
    marginVertical: Metrics.margins.default,
  },
  primaryFBButton: {
    paddingHorizontal: Metrics.paddings.medium,
    paddingVertical: Metrics.paddings.medium,  
    borderRadius: 5,
    marginHorizontal: Metrics.margins.pageSpace,
    marginBottom: Metrics.margins.pageSpace,
    height: 55,
    backgroundColor: '#4263A2',
    marginLeft:'6%',
    marginRight:'6%'
    
  }, 
  primaryButton: {
    height: 55,
    marginHorizontal: Metrics.margins.large,
    marginBottom: Metrics.margins.large,

  }, 
  // middleViewStyle: {
  //   paddingVertical: 50, 
  //   paddingBottom: 0
  // },
  formContainer: {
    paddingBottom: '10%',
    backgroundColor: 'white',
    flex: 1,
    marginBottom: Metrics.margins.extraLarge,
    marginHorizontal: Metrics.margins.medium,
    padding: Metrics.paddings.preMedium,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    
  },
  buttonIn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Metrics.margins.large,
  },
  buttonText: {
    fontSize: Font.sizes.regular,
    textAlign: 'center',
    justifyContent: 'center',
    color: Colors.white,
    flex: 1,
    fontWeight: 'bold',
  },
 launchScreen: {
        width: '100%', 
        height: '100%',
  },
  fbIcon: {
      color: Colors.white,
      left: 35,
      marginLeft: Metrics.margins.default
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',  
    justifyContent: 'flex-end',
    marginLeft:'5%',
    marginRight:'5%',
    paddingBottom:'10%',
  },
  signupText: {
    marginVertical: Metrics.margins.small,
  },
  leftLineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.buttonBorder,
    marginLeft: 40
  },
  rightLineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.buttonBorder,
    marginRight: 40
  },
  signupWithText: {
    color: Colors.darkGray
  },

};
