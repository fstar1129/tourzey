import { Dimensions, Platform } from 'react-native';
import Colors from '../../../themes/main/Theme.Main.Colors';
import Metrics from '../../../themes/main/Theme.Main.Metrics';
import Font from '../../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200;
export default {
  CardContainer: {
    marginHorizontal: Metrics.margins.default,
    marginBottom: Metrics.margins.small,
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
    borderRadius: Platform.OS === 'ios' ? 20 : 50
  },
  nameSpacing: {
    marginLeft: Metrics.margins.default,
  },
  nameStyling: {
    fontWeight: 'bold',
    fontSize: Font.sizes.regular,
    color: Colors.primary,
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: SCREEN_HEIGHT,
    alignItems: 'center',
  },
  nodataText: {
    fontSize: Font.sizes.title,
  },
  viewText: {
    color: Colors.primary,
    fontSize: Font.sizes.small,
  },
};
