import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions, Platform } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const React = require('react-native');

const { StyleSheet } = React;

export default {
  cardViewStyle: {
    elevation: 0
  },
  containerView: {
    backgroundColor: Colors.allpageBg,  
    height: SCREEN_HEIGHT,      
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
    color: Colors.default,
    fontSize: 15,
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
    height: 70,
  },
  inputHeight: {
    height: 70,
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.primary,
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
  loading: {
    width: '100%', 
    textAlign: 'center', 
    color: '#FFF'
  }
};
