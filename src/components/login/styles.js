import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height - 30;
export const SCREEN_FULLWIDTH = Dimensions.get('window').width - 100;
const React = require('react-native');

const { StyleSheet } = React;

export default {
  mainView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height //To take full height
  },
  logoView: {
    display: 'flex',
    flex: 1,
    height: SCREEN_HEIGHT * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    height: 55,
    marginHorizontal: Metrics.margins.large,
  },
  headingStyle: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 30,
    marginVertical: Metrics.margins.default,
  },
  formView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 0
  },
  buttonSignIn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '5%',
    marginRight: Metrics.margins.large,
  },
  itemMargin: {
    marginLeft: Metrics.margins.large,
    marginRight: Metrics.margins.large,
    fontSize: Font.sizes.default,
  },
  inputPadding: {
    paddingRight: Metrics.paddings.default,
    fontSize: Font.sizes.medium,
    padding: 0,
    margin: 0,
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    marginTop: Metrics.margins.large
  },
  checkBoxItem: {
    color: '#fff'
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.paddings.default,
    paddingRight: Metrics.paddings.default,
  },
  checkBoxLabel: {
    paddingHorizontal: Metrics.paddings.small,
    fontSize: Font.sizes.default,
    paddingTop: Metrics.paddings.noPadding,
    color: Colors.default,
    width: '100%'
  },
  checkBoxLink: {
    color: Colors.primary,
    fontSize: Font.sizes.default,
  },
 
  signIn: {
    marginVertical: Metrics.margins.medium,
    marginHorizontal: Metrics.margins.large,
    // height: 55,
    // marginHorizontal: Metrics.margins.large,
    // flex: 1, 
  },
  formContainer: {
    backgroundColor: 'white',
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 10,
    padding: Metrics.paddings.preMedium,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    
  },
  buttonSignIn1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '5%'
  },
  errorMessage: {
    color: Colors.red,
    fontSize: Font.sizes.default,
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: Metrics.margins.small,
  },
  eyeAndriodStyle: {
    right: 5,
    top: 35,
    position: 'absolute',
    zIndex: 2
  },
  modelContainer: {
    backgroundColor: Colors.white,
    padding: Metrics.margins.medium,
    borderRadius: 10,
    marginHorizontal: Metrics.margins.large,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textareaView: {
    width: SCREEN_FULLWIDTH,
    padding: 0,
    height: 50,
    top: 20,
    paddingBottom: 20,
  },
  modalStyle: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  buttonTextLink: {
    fontSize: Font.sizes.medium,
    color: Colors.primary,
    paddingVertical: Metrics.paddings.default,
  },
};
