import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const React = require('react-native');

const { StyleSheet } = React;

export default {
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
  mainContainer: {
    backgroundColor: Colors.white,
    height: SCREEN_HEIGHT,
    marginBottom: 55,
    marginLeft:  Metrics.margins.default,
    marginRight: Metrics.margins.default
  },
  starSpacing: { 
    paddingRight: Metrics.paddings.small,
    marginVertical: Metrics.margins.small  
  },
  cardViewStyle: {
    elevation: 0
  },
  containerView: {
    backgroundColor: Colors.allpageBg,  
  },
  profileContainer: {
    margin: Metrics.margins.default,
  },
  cardStyle: {
    paddingTop: 4,
    paddingBottom: Metrics.paddings.small,
    paddingLeft: Metrics.paddings.default,
    paddingRight: Metrics.paddings.default,
    width: '100%'
  },
  titleStyle: {
    color: Colors.darkGray,
    fontSize: Font.sizes.medium,
  },
  reviewHeading: {
    margin: Metrics.margins.default,
    textAlign: 'center'
  },
  cardBodyStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  itemStyle: {
    borderColor: 'transparent'
  },
  textStyle: {
    height: 'auto',
    // marginLeft: '-20%',
    paddingRight: 0,
    paddingLeft: 0,
    marginTop: -5,
    paddingBottom: 0,
    // marginBottom: 10,
    color: Colors.default,
    fontSize: Font.sizes.medium,
  },
  textareaStyle: {
    height: 100,
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.default,      
  },
  textcountView: {
      justifyContent: 'flex-end',
      textAlign: 'right',
      color: '#dcdcdc',
      fontSize: 15
  },
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.red,
    fontSize: Font.default
  },
  alertView: {
    alignSelf: 'center',
    flexDirection: 'row'
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: Metrics.margins.medium,
    width: '45%',
    alignSelf: 'center'
  },
};
