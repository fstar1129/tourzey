import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export default {
agentContainer: {
  margin: Metrics.margins.default,
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
  borderRadius: 50,
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
month: {
  paddingHorizontal: Metrics.paddings.default,
  paddingBottom: 1,
  borderRadius: 20,
  backgroundColor: Colors.lightBg,
  fontSize: Font.sizes.small,  
  color: Colors.primary, 
},
eranings: {
  fontSize: Font.sizes.small, 
},
earningAmount: {
  fontSize: Font.sizes.regular,  
  color: Colors.primary,
  fontWeight: 'bold' 
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
};
