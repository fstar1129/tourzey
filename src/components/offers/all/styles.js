import { Dimensions } from 'react-native';
import Colors from '../../../themes/main/Theme.Main.Colors';
import Metrics from '../../../themes/main/Theme.Main.Metrics';
import Font from '../../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200; 
export default {
cardContainer: {
  marginHorizontal: Metrics.margins.default,
  marginBottom: Metrics.margins.small,
},
cardViewStyle: {
  elevation: 0
},
infoView: {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between', 
},
nameViewWrap: {
 width: SCREEN_WIDTH,
},
nameView: {
  display: 'flex',
  flexDirection: 'row',
},
userImage: {
  width: 55,
  height: 55,
  borderRadius: 50
},
nameSpacing: {
  marginLeft: Metrics.margins.default,
},
nameStyling: {
  fontWeight: 'bold',
  fontSize: Font.sizes.regular,
  color: Colors.primary,
},
earningsView: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
},
earningAmount: {
  fontSize: Font.sizes.regular,  
  color: Colors.primary,
  fontWeight: 'bold',
  marginTop: Metrics.margins.large
},
jobTitle: {
  fontSize: Font.sizes.medium,  
},
jobDescription: {
  fontSize: Font.sizes.default,
  lineHeight: 22,
},
jobsView: {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: Metrics.paddings.default,
},
jobCount: {
  fontWeight: 'bold',
},
starSpacing: { 
  paddingLeft: Metrics.paddings.small,   
},
heartIcon: {
    color: Colors.grey,
    fontSize: Font.sizes.regular,
},
heartIconFilled: {
  color: Colors.red,
  fontSize: Font.sizes.regular,
},
heartIconView: {
    paddingHorizontal: Metrics.paddings.default,
    paddingVertical: Metrics.paddings.small,
    position: 'absolute',
    right: 5, 
    top: 5,
},
icon: {
    color: Colors.grey,
    fontSize: Font.sizes.regular,
},
iconView: {
    paddingVertical: Metrics.margins.small,
    paddingHorizontal: Metrics.margins.default,
    left: 5, 
    top: 5,
},
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
readText: {
  color: Colors.primary,
  fontSize: Font.sizes.small,
},
jobTitleStyle: {
  fontSize: Font.sizes.regular,
},
jobTitleView: {
  paddingLeft: Metrics.paddings.extraLarge,
}
};
