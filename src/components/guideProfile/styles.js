import { Dimensions, Platform } from 'react-native';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import Colors from '../../themes/main/Theme.Main.Colors';

export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 400;
export default {
  userImagestyle: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 30,
    // top: -15,
    bottom: 25,
    overflow: 'hidden',
  },
  viewStyle: {
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  ScrollViewStyle: {
    height: Dimensions.get('window').height,
    display: 'flex',
    width: Dimensions.get('window').width,
    // bottom: Metrics.margins.large,
    paddingBottom: 40,
    marginTop: 20,
    marginBottom: 55
  },
  userImage: {
    width: 90,
    height: 90,
    overflow: 'hidden',
    borderRadius: Platform.OS === 'ios' ? 45 : 50,
    marginRight: Metrics.margins.default,
  },
  galleryStyle: {
    height: 72,
    width: 72,
    marginLeft: 7,
    borderRadius: 35
  },
  loaderStyle: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 20,
    bottom: 25,
    overflow: 'hidden',
  },
  tagView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: 30
  },
  tagButton: {
    margin: 5,
    backgroundColor: '#F3F3F3',
    // todo-cr-mi - janani @mahesh : use padding value from themes
    paddingRight: 20,
    paddingLeft: 20,
    height: Platform.OS === 'ios' ? 35 : 25
    // width: 100
  },
  profileContainer: {
    marginTop: Metrics.margins.default,
    marginLeft: Metrics.margins.medium,
    marginRight: Metrics.margins.large,
  },
  textHeader: {
    fontSize: Font.sizes.medium,
    color: Colors.darkGray,
    paddingLeft: 5,
    marginTop: 5
  },
  textinputStyle: {
    // height: 40,
    fontSize: Font.sizes.regular,
    paddingRight: 0,
    // fontFamily: 'Sans-serif'
  },
  nodataView: {
    display: 'flex',
    flex: 1,
    // flexDirection: 'column',  
    justifyContent: 'center',
    margin: 'auto',
    // height: SCREEN_HEIGHT,      
  },
  postJob: {
    marginVertical: Metrics.margins.default,
    margin: 'auto',
    height: 55,
  },
  Thumbnail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 20,
  },
  lanStyle: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 30,
  },
  imageStylewithinput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 30
  },
  socialIconinput: {
    marginBottom: 50
  },
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
  imageStyle1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: 30,
  },
  imageStyle: {
    height: 15,
    width: 20,
    marginLeft: 10,
    borderRadius: 10
  },
  qualityStyle: {
    height: 20,
    width: 20,
    marginLeft: 10,
    marginTop: 2
  },
  imageStyle2: {
    height: 15,
    width: 15,
    marginLeft: 10,

  },
  Thumbnail2: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: 30,
  },
  iconStyle: {
    backgroundColor: '#F3F3F3',
    height: 50,
    width: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 5
  },
  disableIconStyle: {
    backgroundColor: '#C4C6C6',
    height: 50,
    width: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 5
  },
  iconStyle2: {
    backgroundColor: '#F3F3F3',
    height: 50,
    width: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 7,
    marginLeft: 10
  },
  disableIconStyle2: {
    backgroundColor: '#C4C6C6',
    height: 50,
    width: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 7,
    marginLeft: 10
  },
  textArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 5,
  },
  textStyle: {
    display: 'flex',
    fontSize: Font.sizes.title,
    color: '#000000',
  },
  buttonStyle: {
    marginTop: 75
  },
  textStyle2: {
    display: 'flex',
    fontSize: Font.sizes.medium,
    color: '#707070',
    // marginBottom: 30,
    alignItem: 'center',
    paddingRight: 10
  },
  desStyle: {
    display: 'flex',
    fontSize: Font.sizes.title,
    color: '#000000',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: Metrics.margins.medium,
    marginRight: Metrics.margins.large,

  },
  lanText: {
    height: 40,
    width: 100,
    display: 'flex',
    textAlign: 'center',
    marginLeft: 10,
    fontSize: Font.sizes.medium,
    color: '#000000',
    backgroundColor: '#F3F3F3'
  },
  lanText1: {
    height: 40,
    width: 100,
    flex: 1,
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#F3F3F3',
    marginLeft: 10,
    marginRight: 10,
    flexWrap: 'wrap'
  },
  lanText3: {
    textAlign: 'center',
    fontSize: Font.sizes.medium,
    color: '#000000',
  },
  desStyle2: {
    display: 'flex',
    fontSize: Font.sizes.title,
    color: '#000000',
    justifyContent: 'flex-start',
    // marginTop: 10,
    marginLeft: 30,
    marginRight: 20,
  },
  icon: {
    color: Colors.grey,
    fontSize: Font.sizes.regular,
  },
  contractContainer: {
    marginHorizontal: Metrics.margins.preLarge,
    marginVertical: Metrics.margins.default,
  },
  cardViewStyle: {
    elevation: 0
  },
  tourDescView: {
    marginVertical: Metrics.margins.default,
    flexDirection: 'column'
  },
  dropDownStyle: {
    alignSelf: 'center',
    top: 5,
    bottom: 5,
    height: 15,
    width: 15,
  },
};
