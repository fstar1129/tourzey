import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions ,Platform} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
export const SCREEN_HEIGHT = Dimensions.get('window').height;   
export const HEIGHT = Dimensions.get('window').height - 500; 
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
  nameView: {
    width: SCREEN_WIDTH,
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
  inputHeight: {
    lineHeight: Platform.OS === 'ios'?0:1,
    height: 27,
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.primary,
  },
  itemStyle: {
    borderColor: 'transparent'
  },
  licenseView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardView: {
    width: '48%',
    elevation: 0
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
  }
};
