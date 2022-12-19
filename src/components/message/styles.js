import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200;
export default {
  CardContainer: {
    marginHorizontal: Metrics.margins.preLarge,
    marginVertical: Metrics.margins.large,
    backgroundColor: 'white'
  },
  cardViewStyle: {
    elevation: 0
  },
  toastStyle: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white
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
    overflow: 'hidden',
    borderRadius: Platform.OS === 'ios' ? 27 : 50
  },
  nameSpacing: {
    marginLeft: Metrics.margins.default,
    marginTop: Metrics.margins.small,
  },
  nameStyling: {
    // fontWeight: 'bold',
    fontSize: Font.sizes.medium,
    color: Colors.default,
  },
  dateView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateText: {
    fontSize: Font.sizes.default,
    color: Colors.default,
    marginTop: Metrics.margins.medium
  },
  messageTitle: {
    fontSize: Font.sizes.medium,
  },
  messageDescription: {
    fontSize: Font.sizes.default,
    lineHeight: 22,
  },
  nodataView: {
    display: 'flex',
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    alignItems: 'center',

  },
  nodataText: {
    fontSize: Font.sizes.title,
  },
  viewText: {
    color: Colors.primary,
    fontSize: Font.sizes.small,
  },
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
  messageContainer: {
    backgroundColor: Colors.allpageBg,
  },
  headerView: {
    flexDirection: 'row',
    marginHorizontal: Metrics.margins.preLarge,
    marginBottom: Metrics.margins.small,
  },
  searchItemStyle: {
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.default,
    marginLeft: Metrics.margins.medium
  },
  searchLineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.lineColor,
    marginHorizontal: Metrics.margins.large,
  },
  cardView: {
    marginVertical: Metrics.margins.large,
  },
  chatLineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.chatLineColor,
    marginHorizontal: Metrics.margins.large,
  },
  container: {
    backgroundColor: Colors.white
  },
  scrollViewStyle: {
    backgroundColor: 'white',
    height: '100%'
  },
  viewStyle: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  }
};
