import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width - 190;
export const WIDTH = Dimensions.get('window').width;
export const SCREEN_WIDTH_VALUE = Dimensions.get('window').width - 250;

export default {
  mainContainer: {
    backgroundColor: Colors.white,
    // height: SCREEN_HEIGHT,
    // marginBottom: 55
  },
  mainView: {
    flexDirection: 'row',
    marginVertical: Metrics.margins.default,
  },
  tourImage: {
    width: WIDTH,
    height: 150,
    resizeMode: 'cover',
  },
  container: {
    marginHorizontal: Metrics.margins.large,
    marginVertical: Metrics.margins.large,
  },
  tourCategoryView: {
    flexDirection: 'row',
    marginBottom: Metrics.margins.default
  },
  tourCategoryStyle: {
    color: Colors.categoryText,
    fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
    fontSize: Font.sizes.medium
  },
  giveDetailstextStyle: {
    color: Colors.categoryText,
    fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
    fontSize: Font.sizes.medium,
    marginLeft: Metrics.margins.large,
  },
  supportTourdescStyle: {
    color: Colors.default,
    fontSize: Font.sizes.medium,
    marginLeft: Metrics.margins.large,
  },
  infoView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: Metrics.margins.small,
  },
  nameViewWrap: {
    width: SCREEN_WIDTH,
  },
  nameView: {
    display: 'flex',
    flexDirection: 'row',
  },
  tourName: {
    fontSize: Font.sizes.title,
    color: Colors.default,
    fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
  },
  earningAmount: {
    fontSize: Font.sizes.title,
    color: Colors.default,
  },
  guideMainView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.margins.default,
  },
  guideViewWrap: {
    width: SCREEN_WIDTH
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 50
  },
  nameSpacing: {
    marginLeft: Metrics.margins.small
  },
  guideView: {
    flexDirection: 'row',
    marginTop: Metrics.margins.small
  },
  nameStyling: {
    fontSize: Font.sizes.regular,
    color: Colors.default,
    marginRight: Metrics.margins.default,
    marginTop: Metrics.margins.default
  },
  countText: {
    fontSize: Font.sizes.regular,
    color: '#707070'
  },
  totalPriceView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: Font.sizes.title,
    color: Colors.default,
    marginTop: Metrics.margins.preMedium
  },
  starCountview: {
    marginLeft: Metrics.margins.default,
  },
  starCounttext: {
    fontSize: Font.sizes.regular,
    color: Colors.default,
    marginTop: Metrics.margins.small,
  },
  receiptStatusView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginVertical: Metrics.margins.default,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  rateSpacing: {
    marginRight: Metrics.margins.default
  },
  rateView: {
    flexDirection: 'row',
    marginBottom: Metrics.margins.default
  },
  startIcon: {
    width: 20,
    height: 18,
    marginTop: Metrics.margins.small
  },
  statusViewWrap: {
    width: SCREEN_WIDTH_VALUE,
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    width: '30%',
    alignSelf: 'center'
  },
  tourDescView: {
    marginTop: Metrics.margins.extraLarge,
    marginLeft: Metrics.margins.large,
    marginRight: Metrics.margins.large,
    marginBottom: Metrics.margins.large
    // padding: Metrics.paddings.default
  },
  tourDesc: {
    fontSize: Font.sizes.medium,
    color: Colors.darkGray,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 35
  },
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
  toastStyle: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white
  },
  tourCategoryStyle1: {
    color: Colors.timeText,
    fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
    fontSize: Font.sizes.small,
    marginTop: Metrics.margins.default
  },
  dotStyle: {
    color: Colors.default,
    fontWeight: 'bold',
    fontSize: Font.sizes.title,
    textAlign: 'center'
  },
  starSpacing: {
    paddingRight: Metrics.paddings.small,
    marginVertical: Metrics.margins.small
  },
  textinputStyle: {
    fontSize: Font.sizes.medium,
    paddingLeft: 5,
    marginLeft: Metrics.margins.medium,
    marginRight: Metrics.margins.medium,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.default,
    marginHorizontal: 0,
    marginLeft: Metrics.margins.medium,
    marginRight: Metrics.margins.medium
  },
  contractContainer: {
    marginHorizontal: Metrics.margins.preLarge,
    marginVertical: Metrics.margins.default,
  },
  cardViewStyle: {
    elevation: 0
  },
  scrollStyle: {
    backgroundColor: 'white'
  },
  backIconViewStyle: {
    width: 45,
    height: 25,
  }
};
