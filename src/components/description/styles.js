import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 480;
export const SCREEN_HEIGHT_FULL = Dimensions.get('window').height;
const React = require('react-native');

const { StyleSheet } = React;
export default {
  scrollContainer: {
    backgroundColor: Colors.allpageBg,
    height: SCREEN_HEIGHT_FULL,
  },
  cardViewStyle: {
    elevation: 0
  },
  profileContainer: {
    marginHorizontal: Metrics.margins.large,
    marginVertical: Metrics.margins.medium
  },
  cardStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: Metrics.paddings.default,
    paddingRight: Metrics.paddings.default,
  },
  labelStyle: {
    textAlign: 'center',
    fontSize: Font.sizes.medium,
    padding: Metrics.paddings.default,
  },
  itemStyle: {
    borderColor: 'transparent'
  },
  textareaStyle: {
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.primary,
    height: SCREEN_HEIGHT,
  },
  removeVideoStyle: {
    color: Colors.primary,
    fontSize: Font.sizes.medium,
    // top: 5,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  textcountView: {
      justifyContent: 'flex-end',
      textAlign: 'right',
      color: '#dcdcdc',
      fontSize: 15
  },
  textStyle: {
      padding: Metrics.paddings.default
  },
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.red,
    fontSize: Font.default
  },
  alertView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: Metrics.margins.default
  },
  uploadVideoStyle: {
    alignSelf: 'center'
  },
  buttonTextLink: {
    fontSize: 15,
    color: Colors.primary,
    left: 150
  },
  postBtn: {
    color: Colors.primary,
    fontSize: Font.sizes.regular,
    textAlign: 'right',
    marginRight: Metrics.margins.preMedium,
    fontWeight: 'bold',   
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  fromDatecardView: {
    width: '40%',
    elevation: 0
  },
  toDatecardView: {
    width: '40%',
    elevation: 0,
    marginLeft: 10
  },
  dateCardStyle: {
    paddingTop: 4,
    paddingBottom: Metrics.paddings.small,
    paddingLeft: Metrics.paddings.default,
    paddingRight: Metrics.paddings.default,
    width: '100%'
  },
  titleStyle: {   
    color: Colors.default,
    fontSize: 13,
  },
  pickerView: {      
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  pickerIcon: {
    color: Colors.primary,
    marginLeft: 7
  },
};
