import { Dimensions } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const WIDTH = Dimensions.get('window').width - 200;
export const WIDTH_VALUE = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200;

export default {
  container: {
    backgroundColor: Colors.white
  },
  tourImageView: {
    marginTop: Metrics.margins.default
  },
  tourImageStyle: {
    width: WIDTH_VALUE,
    height: 100,
    resizeMode: 'cover',
  },
  starCounttext: {
    fontSize: Font.sizes.regular,
    color: Colors.default,
    // marginTop: 1,
    marginLeft: 5,
    marginTop: Metrics.margins.noMargin
  },
  mainContainer: {
    marginHorizontal: Metrics.margins.large,
    marginVertical: Metrics.margins.large,
  },
  tourDescView: {
    flexDirection: 'column'
  },
  tourName: {
    fontSize: Font.sizes.title,
    marginVertical: Metrics.margins.small,
  },
  descLabel: {
    fontSize: Font.sizes.default,
    color: '#ABABAB',
    marginVertical: Metrics.margins.small,
  },
  tourDescStyle: {
    fontSize: Font.sizes.small,
    color: '#707070',
    marginVertical: Metrics.margins.small,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.buttonBorder,
    marginHorizontal: Metrics.margins.veryLarge,
    marginVertical: Metrics.margins.large,
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
  desc: {
    color: '#03ABAD',
    textDecorationLine: 'underline',
    width: Dimensions.get('window').width - 160
  },
  nameView: {
    display: 'flex',
    flexDirection: 'row',
  },
  userImage: {
    width: 65,
    height: 65,
    borderRadius: 50
  },
  nameSpacing: {
    marginLeft: Metrics.margins.default,
    flexDirection: 'column',
    width: Dimensions.get('window').width - 250,
    WordBreak: 'break-word',
    whiteSpace: 'inherit'
  },
  nameStyling: {
    fontSize: Font.sizes.regular,
    color: Colors.default,
    textDecorationLine: 'underline',
    marginRight: Metrics.margins.default,
  },
  dateAndTimeView: {
    flexDirection: 'row',
    marginTop: Metrics.margins.default,
  
  },
  calendarView: {
    flexDirection: 'row',
    marginRight: Metrics.margins.large,
    
  },
  calendarIcon: {
    width: 25,
    height: 25,
    
  },
  clockIcon: {
    width: 25,
    height: 25,
  
  },
  clockView: {
    flexDirection: 'row',
    

  },
  dateTextStyle: {
    fontSize: Font.sizes.regular,
    color: Colors.default,
    marginRight: Metrics.margins.default
  },
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
  categoryView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // alignItems: 'center',
    // marginTop: Metrics.margins.small
  },
  earningAmount: {
    fontSize: Font.sizes.regular,
    color: Colors.primary,
    fontWeight: 'bold',
    marginTop: Metrics.margins.large
  },
  mapView: {
    width: 78,
    height: 78
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  priceStyle: {
    fontSize: Font.sizes.large,
  },
  qualityHighIcon: {
    width: 18,
    height: 18,
    marginTop: 3
  },
  startIcon: {
    width: 12,
    height: 11,
    marginTop: Metrics.margins.small
  },
  locationStyle: {
    color: Colors.categoryText,
    fontSize: Font.sizes.default,
    marginTop: Metrics.margins.small,
  },
  guideView: {
    flexDirection: 'row',
    // marginTop: Metrics.margins.small
  },
  guideViewWrap: {
    width: WIDTH
  },
  ratingView: {
    flexDirection: 'row'
  },
  ratingPoint: {
    fontSize: Font.sizes.default,
    color: Colors.default,
    alignItems: 'center',
    textAlign: 'center'
  },
  toastStyle: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white
  },
  textCenter: {
    width: '100%',
    alignItems: 'center',
    marginVertical: Metrics.margins.medium,
  },
  tagView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  categoryButton: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.small,
    paddingVertical: Metrics.paddings.small,
    borderRadius: 20,
    marginLeft: Metrics.margins.veryLarge,
    marginVertical: Metrics.margins.small,
    height: 25,
  },
  starCountview: {
    marginLeft: Metrics.margins.default,
    marginTop: 2
},
heartIcons: {
  width: 25,
  height: 22,
},
heartIconView: {
  position: 'absolute',
  top: 20,
  right: 30
},
heartIconFilled: {
  color: Colors.red,
  // fontSize: Font.sizes.regular,
},
tagButton: {
  backgroundColor: Colors.default, //F3F3F3
  height: 35,
  // borderRadius: 25,
  marginVertical: 5
},
lanText3: {
  textAlign: 'center',
  fontSize: Font.sizes.medium,
  color: Colors.white, //000000
},
};
