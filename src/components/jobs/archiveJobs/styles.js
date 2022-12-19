import { Dimensions } from 'react-native';
import Metrics from '../../../themes/main/Theme.Main.Metrics';
import Font from '../../../themes/main/Theme.Main.Font';
import Colors from '../../../themes/main/Theme.Main.Colors';


export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200;  
const React = require('react-native');

const { StyleSheet } = React;

export default {
  nodataView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',  
    justifyContent: 'center',
    height: SCREEN_HEIGHT,   
    alignItems: 'center',   
  },
  nodataText: {
    fontSize: Font.sizes.title,   
  },
   nodataInfo: {
    height: SCREEN_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   },
   cardContainer: {
    marginHorizontal: Metrics.margins.default, 
    marginBottom: Metrics.margins.small,
  },
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardDetail: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start' 
  },
  detailView: {
    width: SCREEN_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    lineHeight: 23,
  },
  title: {
    fontSize: Font.sizes.input,
    color: Colors.primary,  
    marginBottom: Metrics.margins.small,  
  },  
  priceDes: {
    fontSize: Font.sizes.default,   
    marginBottom: Metrics.margins.default    
  },
  description: { 
    fontSize: Font.sizes.default,   
  },
  count: {   
      fontSize: Font.sizes.regular,   
      color: Colors.primary
  },
  iconView: {
    position: 'absolute',
    top: 15,   
    right: 15,
  },
  icon: {
      color: Colors.grey,
      fontSize: Font.sizes.regular,   
  },
  lineStyle: {
      borderWidth: 0.5,
      borderColor: Colors.buttonBorder,
      marginHorizontal: Metrics.margins.small,
    },
    wholeView: {
      flexDirection: 'row',
      marginTop: 10
    },
    contentView: {
      flexDirection: 'column',
      paddingTop: Metrics.paddings.noPadding,
      paddingBottom: Metrics.paddings.noPadding,
    },
};
