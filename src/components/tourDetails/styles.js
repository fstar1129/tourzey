import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions, Platform } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 130;
export const SCREEN_FULLWIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 130;
const React = require('react-native');

const { StyleSheet } = React;
export default {
  agentContainer: {
    marginTop: Metrics.margins.default,
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
  nameSpacing: {
    marginLeft: Metrics.margins.default,
  },
  nameStyling: {
    fontWeight: 'bold',
    fontSize: Font.sizes.regular,
    color: Colors.primary,
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
  nodataText: {
    color: Colors.default,
    fontSize: Font.sizes.medium,  
    textAlign: 'center',
    paddingTop: Metrics.paddings.extraLarge 
  },
  textColour: {
    color: Colors.darkGray
  },
  jobTitle: {
    height: 'auto',
    marginLeft: '-25%',
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 0,
    color: Colors.darkGray
  },
  buget: {
    height: 'auto',
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 0,
    color: Colors.darkGray
  },
  contractContainer: {
    margin: Metrics.margins.default,
  },
  heading: {
    marginTop: Metrics.margins.default,
    textAlign: 'center'
  },
  cardViewStyle: {
    elevation: 0
  },
  cardView: {
    width: SCREEN_WIDTH,
    elevation: 0
  },
  cardViewbudget: {
    width: 100,
    elevation: 0
  },
  cardStyle: {
    paddingTop: 4,
    paddingBottom: Metrics.paddings.small,
    paddingLeft: Metrics.paddings.default,
    paddingRight: Metrics.paddings.default,
    width: '100%'
  },
  cardBodyStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  titleStyle: {
    color: Colors.default,
    fontSize: 13,
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    color: Colors.primary,
    fontSize: 15,
  },
  datecardView: {
    width: '48%',
    elevation: 0
  },
  pickerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  pickerIcon: {
    color: Colors.primary,
  },
  userView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 55,
    height: 55,
    marginTop: Metrics.margins.small,
    marginRight: Metrics.margins.default
  },
  agentName: {
    color: Colors.primary,
    fontSize: Font.sizes.title
  },
  attachView: {
    display: 'flex',
    flexDirection: 'row',
  },
  attachIcon: {
    color: Colors.primary,
    fontSize: Font.sizes.h4,
    marginRight: Metrics.margins.default,
    transform: [{ rotate: '70deg' }]
  },
  noteText: {
    fontSize: Font.sizes.small,
    marginTop: Metrics.margins.default,
    marginHorizontal: Metrics.margins.small
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    marginTop: Metrics.margins.medium,
  },
  modelIcon: {
    width: 45,
    height: 45,
    borderRadius: 0,
    marginTop: Metrics.margins.large
  },
  textareaView: {
    width: SCREEN_FULLWIDTH,
    padding: 0,
  },
  modelContainer: {
    backgroundColor: Colors.white,
    padding: Metrics.margins.medium,
    borderRadius: 10,
    marginHorizontal: Metrics.margins.large,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  approveText: {
    textAlign: 'center',
    marginVertical: Metrics.margins.default
  },
  textareaStyle: {
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.darkGray,
    // height: SCREEN_HEIGHT,
  },
  itemStyle: {
    borderColor: 'transparent'
  },
  inputHeight: {
    // lineHeight: Platform.OS === 'ios' ? 0 : 1,
    // height: 22,
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.default,
    // paddingTop: Platform.OS === 'ios' ? 0 : 13
  },
  textCenter: {
    width: '100%',
    alignItems: 'center',
  },
  textPrimary: {
    color: Colors.primary,
    fontSize: Font.sizes.medium,
  },
  fileView: {
    flexDirection: 'row'
  },
  loaderStyle: { width: '100%', textAlign: 'center', color: '#FFF' },
  guidesView: {
    marginHorizontal: Metrics.margins.large
  }, 
  tourHeading: {
    margin: Metrics.margins.default,
    textAlign: 'center'
  }
};
