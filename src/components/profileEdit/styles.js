import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
const React = require('react-native');

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 100;

const { StyleSheet } = React;
export default {
  textcountView: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    color: '#dcdcdc',
    fontSize: 15
},
  galleryStyle: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: Platform.OS === 'ios' ? 45 : 50,
    marginRight: Metrics.margins.default,
},
galleryStyle1: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 35,
    // top: -15,
    bottom: 30,
    overflow: 'hidden',
},
  viewStyle: {
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  ScrollViewStyle: {
    top: Metrics.margins.large,
    margin: Metrics.margins.preLarge,
    marginBottom: '16%',
    backgroundColor: Colors.white
  },
  iconViewStyle: {
    flexDirection: 'row',
  },
  profileContainer: {
    marginTop: Metrics.margins.default,
    marginLeft: Metrics.margins.medium,
    marginRight: Metrics.margins.medium,
  },
  imageView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinputStyle: {
    fontSize: Font.sizes.regular,
    paddingRight: 0,
  },
  textinputStyle1: {
    height: 80,
    fontSize: Font.sizes.regular,
    paddingLeft: 5,
    // paddingRight: 0,
    fontStyle: Platform.OS === 'ios' ? 'normal' : 'Sans-serif'

  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.default,
    marginHorizontal: 0,
    marginLeft: Metrics.margins.small,
    marginRight: Metrics.margins.small
    // paddingLeft: Metrics.paddings.large,
},
  textareaStyle: {
    borderBottomWidth: 1,
    fontSize: Font.sizes.default,
    color: Colors.default,
    paddingTop: 5,
    paddingLeft: 5,
  },
  textHeader: {
    fontSize: Font.sizes.medium,
    color: Colors.darkGray,
    paddingLeft: 5,
    marginTop: 5
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: Metrics.margins.default,
  },
  editIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 15,
    right: 0,
    overflow: 'hidden',
    borderRadius: Platform.OS === 'ios' ? 15 : 30,
  },
  textView: {
    padding: Metrics.margins.default,
  },
  closeIconView: {
    bottom: 15,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
};
