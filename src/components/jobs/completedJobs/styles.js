import { Dimensions } from 'react-native';
import Colors from '../../../themes/main/Theme.Main.Colors';
import Metrics from '../../../themes/main/Theme.Main.Metrics';
import Font from '../../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 130;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200;  
export default {
  cardViewStyle: {
    elevation: 0
  },
cardContainer: {
  margin: Metrics.margins.default, 
},
cardContainerView: {
  marginBottom: Metrics.margins.small,
},
cardDetailView: {
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'flex-start'     
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
  marginRight: Metrics.margins.default,
},  
earningAmount: {
  fontSize: Font.sizes.title,  
  color: Colors.primary,
  fontWeight: 'bold',
  marginTop: Metrics.margins.small,      
  position: 'absolute',
  top: 0,
  right: 0,  
},
starSpacing: { 
  paddingRight: Metrics.paddings.small,
  marginTop: Metrics.margins.small
},
priceDes: {
  fontSize: Font.sizes.default,       
},
description: { 
  fontSize: Font.sizes.default,   
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
 rateNowButton: {
  marginVertical: Metrics.margins.small
},
noRatings: {
  fontSize: Font.sizes.default,
  marginVertical: Metrics.margins.small
},
receivedRating: {
  marginVertical: Metrics.margins.small
}
};
