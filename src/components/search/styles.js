import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 480;
export const SCREEN_HEIGHT_FULL = Dimensions.get('window').height;
const React = require('react-native');

const { StyleSheet } = React;
export default {
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
  viewStyle: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: Colors.white
  },
  profileContainer: {
    marginHorizontal: Metrics.margins.extraLarge,
    marginTop: Metrics.margins.extraLarge
  },
  headerView: {
    flexDirection: 'column',
    marginVertical: Metrics.margins.default
  },
  labelStyle: {
    color: Colors.labelColor,
    fontSize: Font.sizes.default,
    marginVertical: Metrics.margins.small
  },
  textStyle: {
    fontSize: Font.sizes.medium,
    color: Colors.default
  },
  searchLineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.lineColor,
  },
  cityView: {
    marginVertical: Metrics.margins.large
  },
  selectLabelStyle: {
    color: Colors.labelColor,
    fontSize: Font.sizes.default,
    marginVertical: Metrics.margins.default
  },
  inputView: {
    borderWidth: 0.5, 
    borderColor: Colors.lineColor,
    borderRadius: 5,
  },
  searchItemStyle: {
    fontSize: Font.sizes.medium,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.default,
    marginLeft: Metrics.margins.medium,
  },
  searchAddressStyle: {
    height: 250,
  },
};
