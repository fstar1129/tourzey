import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions, Platform } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 500;
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
    margin: Metrics.margins.default,
  },
  cardStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: Metrics.paddings.default,
    paddingRight: Metrics.paddings.default,
  },
  labelStyle: {
    fontSize: Font.sizes.medium,
    color: Colors.default,
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
  priceStyle: {
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.primary,
  },
  symbol: {
    paddingTop: 9,      
    paddingRight: Metrics.paddings.small,
    color: Colors.primary
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    marginTop: Metrics.margins.medium,
},
};
