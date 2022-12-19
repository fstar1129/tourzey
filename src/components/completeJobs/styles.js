import { Dimensions } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 130;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200;

export default {
jobsContainer: {
  marginHorizontal: Metrics.margins.small, 
  marginTop: 50,
  marginBottom: Metrics.margins.default,
},
cardViewStyle: {
  elevation: 0
},
cardContainer: {
  // margin: Metrics.margins.default, 
  marginHorizontal: Metrics.margins.small, 
  marginBottom: Metrics.margins.small,
},
wrapper: {
  flex: 1,
},
back: {
  zIndex: 0
},
front: {
  position: 'absolute',
  top: -40,
  left: 0,
  right: 0,
  alignSelf: 'center',
  zIndex: 1,
  marginHorizontal: Metrics.margins.extraLarge,
},
profileImage: {
  alignSelf: 'center',
  width: 80,
  height: 80,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: Colors.primary,  
},
agentName: {
  fontSize: Font.sizes.regular, 
  color: Colors.primary,  
},
agentOffice: {
  fontSize: Font.sizes.default,
  color: Colors.textDisabled,
  marginVertical: Metrics.margins.small,
},
infoView: {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between', 
},
agentDetails: {
  width: '100%',
  alignItems: 'center',
  lineHeight: 22,
  marginTop: Metrics.margins.veryLarge,
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
nameStyling: {
  fontSize: Font.sizes.input,
  color: Colors.primary,  
  marginBottom: Metrics.margins.small,  
},  
earningsView: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', 
  justifyContent: 'center'   
},
earningAmount: {
  fontSize: Font.sizes.title,  
  color: Colors.primary,
  fontWeight: 'bold',
  marginTop: Metrics.margins.medium, 
},
starSpacing: { 
  paddingRight: Metrics.paddings.small,
  marginVertical: Metrics.margins.small  
},
profileStarSpacing: {
  paddingHorizontal: 3,
  marginVertical: Metrics.margins.small  
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
};
