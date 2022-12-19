import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 130;
export const SCREEN_FULLWIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const React = require('react-native');

const { StyleSheet } = React;
export default {
  contractContainer: {
    marginHorizontal: Metrics.margins.preLarge, 
  marginVertical: Metrics.margins.default,
  },
  heading: {
    color: Colors.primary,
    marginBottom: Metrics.margins.default,
  },
  cardViewStyle: {
    elevation: 0
  },
  cardViewbudget: {
    width: '22%',
    elevation: 0
  },
  cardStyle: {
    paddingTop: 4,
    paddingBottom: Metrics.paddings.small,
    paddingLeft: Metrics.paddings.default,
    paddingRight: Metrics.paddings.default,
    width: '100%'
  },
  titleStyle: {
    color: Colors.default,
    fontSize: Font.sizes.default,
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    color: Colors.primary,
    fontSize: Font.sizes.medium,
  },
  textPrimary: {
    color: Colors.primary,
    fontSize: Font.sizes.medium,
  },
  fileNameText: {
    color: Colors.primary,
    fontSize: Font.sizes.medium,
    alignItems: 'center'
  },
  datecardView: {
    width: '36%',
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
  jobsContainer: {
    marginHorizontal: Metrics.margins.preLarge,
    marginTop: 50,
    marginBottom: Metrics.margins.default,
  },
  jobsViewContainer: {
    marginHorizontal: Metrics.margins.preLarge,
    marginTop: 20,
    marginBottom: Metrics.margins.default,
  },
  wrapper: {
    flex: 1,
  },
  back: {
    zIndex: 0
  },
  agentDetails: {
    width: '100%',
    alignItems: 'center',
    lineHeight: 22,
    marginTop: Metrics.margins.veryLarge,
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
  starSpacing: {
    paddingHorizontal: 3,
    marginVertical: Metrics.margins.small
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
  countryDes: {
    fontSize: Font.sizes.small,
    color: Colors.textDisabled
  },
  contentDes: {
    fontSize: Font.sizes.default,
  },
  earningAmount: {
    fontSize: Font.sizes.title,
    color: Colors.primary,
    fontWeight: 'bold',
    marginTop: Metrics.margins.small,
  },
  ViewText: {
    fontSize: Font.sizes.small,
    color: Colors.primary,
    textAlign: 'right'
  },
  faqBtn: {
    color: Colors.primary,
    fontSize: Font.sizes.default,
    textAlign: 'right',
    marginRight: Metrics.margins.medium
  },
  itemStyle: {
    borderColor: 'transparent'
  },
  textareaStyle: {
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.primary,
  },
  symbol: {
    color: Colors.primary
  },
  inputHeight: {
    lineHeight: Platform.OS === 'ios' ? 0 : 1,
    height: 22,
    fontSize: Font.sizes.medium,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.primary,
    paddingTop: Platform.OS === 'ios' ? 0 : 13
  },
  mandatoryStar: {
    color: Colors.red,
  },
budgetView: {
  flexDirection: 'row'
},
startDateView: {
  flexDirection: 'row'
},
endDateView: {
  flexDirection: 'row'
},
fileView: {
  flexDirection: 'row'
},
mandatoryView: {
  fontSize: Font.sizes.small,
  marginTop: Metrics.margins.default,
  textAlign: 'center',
  color: Colors.red
},
mandatoryStarView: {
  color: Colors.red
},
approveText: {
  textAlign: 'center',
  marginVertical: Metrics.margins.default
},
checkBoxItem: {
  color: '#fff'
},
checkBox: {
  flex: 1,
  flexDirection: 'row',
  paddingTop: Metrics.paddings.default,
  paddingRight: Metrics.paddings.medium,
  marginVertical: Metrics.margins.small,
  marginLeft: Metrics.margins.small,
  marginRight: Metrics.margins.medium,
},
checkboxCheck: {
  marginRight: Metrics.margins.default,
},
checkBoxLabel: {
  paddingHorizontal: Metrics.paddings.small,
  fontSize: Font.sizes.default,
  paddingTop: Metrics.paddings.noPadding,
  color: Colors.default,
  width: '100%'
},
checkBoxLink: {
  color: Colors.primary,
  fontSize: Font.sizes.default,
},
price: {
  justifyContent: 'flex-end',
  display: 'flex',
  marginRight: 10,
  color: Colors.primary,
  fontSize: Font.sizes.default,
},
textCenter: {
  width: '100%',
  alignItems: 'center',
},
hiredTag: {
  paddingTop: Metrics.paddings.default,
  paddingBottom: Metrics.paddings.preMedium,
  textAlign: 'center',
  marginVertical: Metrics.margins.default,
  marginHorizontal: Metrics.margins.preSmall,
  borderRadius: 20,
  backgroundColor: Colors.grey,
},
disabledButton: {
  paddingHorizontal: Metrics.paddings.default,
  paddingVertical: Metrics.paddings.default,
  borderRadius: 5,
  marginHorizontal: Metrics.margins.small,
  flex: 1,
},
buttonTextDisabled: {
  fontSize: Font.sizes.regular,
  textAlign: 'center',
  color: Colors.white,
  flex: 1,
  justifyContent: 'center',
  fontWeight: 'bold',
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
  color: Colors.default,
},
mileStoneView: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: Metrics.margins.default
},
mileStoneAmount: {
  fontSize: Font.sizes.regular,  
  color: Colors.darkGray,
  alignSelf: 'flex-end'
},
paymentTitle: {
  fontWeight: 'bold',
  fontSize: Font.sizes.default,
  color: Colors.default,
},
mileStoneName: {
  fontSize: Font.sizes.default,
  color: Colors.darkGray,
  marginVertical: Metrics.margins.small
},
};
