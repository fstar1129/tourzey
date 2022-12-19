import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const React = require('react-native');

const { StyleSheet } = React;
export default {
  scrollContainer: {
    backgroundColor: Colors.allpageBg,
    height: SCREEN_HEIGHT,
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
  },
  inputHeight: {
    // lineHeight: Platform.OS === 'ios' ? 0 : 1,
    height: 27,
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.primary,
  },
 
  
  symbol: {
    paddingTop: Platform.OS === 'ios' ? 3 : 5,      
    paddingRight: Metrics.paddings.small,
    color: Colors.primary
  }

};
