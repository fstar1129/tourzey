import { Dimensions } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 130;
export const SCREEN_FULLWIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 100;
const React = require('react-native');

const { StyleSheet } = React;
export default {
  cardViewStyle: {
    elevation: 0
  },
  scrollContainer: {    
    backgroundColor: Colors.allpageBg,
  },
  contractContainer: {
    margin: Metrics.margins.default, 
    height: SCREEN_HEIGHT,
  },
  heading: {
    color: Colors.default,
    marginVertical: Metrics.margins.default,
    textAlign: 'center',
    fontSize: Font.sizes.default
  },
  cardViewbudget: {
    width: '23%',
    elevation: 0
  },
//   cardStyle: {
//     paddingTop: 4,
//     paddingBottom: Metrics.paddings.small,
//     paddingLeft: Metrics.paddings.default,
//     paddingRight: Metrics.paddings.default,
//     width: '100%'
//   },
  titleStyle: {   
    color: Colors.default,
    fontSize: 15,
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  des: {
    color: Colors.primary,
    fontSize: 15,
  },
  datecardView: {
    width: '37%',
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
  pickerItem: {
    borderBottomColor: '#fff',
  },
  pickerStyle: {
    height: 30,
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
    marginTop: Metrics.margins.large

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
    marginHorizontal: Metrics.margins.default, 
    marginTop: 50,
    marginBottom: Metrics.margins.default,
  },
  jobsViewContainer: {
    marginHorizontal: Metrics.margins.default, 
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
    paddingLeft: Metrics.paddings.small,
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
  nameStyling: {
    fontSize: Font.sizes.input,
    color: Colors.primary,  
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
  viewLess: {
    fontSize: Font.sizes.small,  
    color: Colors.primary,
    marginTop: Metrics.margins.extraLarge, 
  },
  viewMore: {
    fontSize: Font.sizes.small,  
    color: Colors.primary,
    marginTop: Metrics.margins.small, 
  },
  faqBtn: {
    color: Colors.primary,
    fontSize: Font.sizes.default,
    textAlign: 'right',
    marginRight: Metrics.margins.medium
  },
  cardStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: Metrics.paddings.default,
    paddingRight: Metrics.paddings.default,
  },
  labelStyle: {
    color: Colors.default,
    fontSize: 15,
  },
  inputHeight: {
    lineHeight: 1,
    height: 30,
    fontSize: Font.sizes.regular,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.primary,
  },
  itemStyle: {
    borderColor: 'transparent'
  },
  plusIcon: {     
    fontSize: Font.sizes.h2,
     color: Colors.white,
     textAlign: 'center',
     marginTop: Metrics.margins.preMedium,
    //  alignSelf: 'right',
     justifyContent: 'flex-end',
   }, 
   buttonTextSecondary: {
    fontSize: Font.sizes.default,
    textAlign: 'center',
    color: Colors.primary,
    flex: 1,
    justifyContent: 'center',
  },
  tochableButton: {
    flex: 1,
    height: 45,
  },
  secondaryButtonWhite: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.noPadding,
    paddingVertical: Metrics.paddings.medium,
    marginHorizontal: Metrics.margins.small,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    elevation: 0,
  },
secondaryButton: {
  flex: 1,
  paddingHorizontal: Metrics.paddings.noPadding,     
  paddingVertical: Metrics.paddings.medium,
  marginHorizontal: Metrics.margins.small,
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.primary,
  elevation: 0,        
},
  primaryButton: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.default,
    paddingVertical: Metrics.paddings.default,
    borderRadius: 5,
    marginHorizontal: Metrics.margins.small,
  },
  selectButtonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    marginTop: Metrics.margins.medium,
    marginBottom: Metrics.margins.extraLarge,
  },
  billingIcon: {
    width: 40,
    height: 40,
    marginLeft: Metrics.margins.small,            
  },
  billingPaypal: {
    width: 100, 
    marginHorizontal: Metrics.margins.veryLarge,       
  },
  cardnumView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardinfo: {
    width: '80%',
  },
  plusIconView: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  addIcon: {
    width: 55,
    height: 55,
  },      
  continueBtn: {
    marginTop: Metrics.margins.veryLarge,        
    width: '50%',
    margin: 'auto',  
    alignSelf: 'center', 
    height: 55,
  },
};
