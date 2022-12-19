import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT_FULL = Dimensions.get('window').height;
export default {
agentContainer: {
  marginTop: Metrics.margins.default,
},
contractContainer: {
    marginHorizontal: Metrics.margins.preLarge, 
  marginVertical: Metrics.margins.default,
  },
cardViewStyle: {
    elevation: 0
  },
  scrollContainer: {
    backgroundColor: Colors.allpageBg,    
    height: SCREEN_HEIGHT_FULL,
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
  heading: {
    color: Colors.primary,
    marginVertical: Metrics.margins.default,
  },
  guideRequest: {
      color: Colors.default,
      alignSelf: 'center',
      marginVertical: Metrics.margins.medium,
      fontWeight: 'bold'
  },
  contractText: {
    color: Colors.primary,
    alignSelf: 'center',
    marginVertical: Metrics.paddings.large,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  mileStoneView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mileStoneAmount: {
    fontSize: Font.sizes.regular,  
    color: Colors.darkGray,
    alignSelf: 'flex-end'
  },
  mileStoneName: {
    fontWeight: 'bold',
    fontSize: Font.sizes.default,
    color: Colors.default,
  },
  mileStoneMessage: {
    fontSize: Font.sizes.default,
    color: Colors.darkGray,
    marginVertical: Metrics.margins.small
  },
  fundMesssage: {
    fontSize: Font.sizes.small,
    color: Colors.darkGray,
  },
  textCenter: {
    width: '100%',
    alignItems: 'center',
},
  
};
