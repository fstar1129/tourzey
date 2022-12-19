import { Dimensions } from 'react-native';
import Colors from '../main/Theme.Main.Colors';
import Metrics from '../main/Theme.Main.Metrics';
import Font from '../main/Theme.Main.Font';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default {
  bottomButton: {
    flex: 1,
    paddingVertical: Metrics.paddings.medium,
    height: 55,
    width: '100%'
  },
  tochableView: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  /* Common Styles */
  textPrimary: {
    color: Colors.primary,
  },
  /* Background and Logo */
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  logoSizeNormal: {
    marginVertical: Metrics.margins.veryLarge,
    width: 150,
    height: 160,
    overflow: 'visible',
    alignSelf: 'center'
  },
  logoSizeMedium: {
    marginTop: Metrics.margins.large,
    width: 170,
    height: 180,
    overflow: 'visible',
    alignSelf: 'center'
  },
  fullBackground: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    top: 0,
    left: 0
  },

  /* Form Style */
  formHeading: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: Font.sizes.title,
    marginTop: Metrics.margins.small,
    marginBottom: Metrics.margins.default,
  },
  formContainer: {
    backgroundColor: 'white',
    flex: 1,
    marginBottom: Metrics.margins.large,
    marginHorizontal: Metrics.margins.preMedium,
    padding: Metrics.paddings.preMedium,
    borderRadius: 8,
    position: 'relative',
  },
  formContainerLogin: {
    backgroundColor: 'white',
    flex: 1,
    marginBottom: Metrics.margins.large,
    marginHorizontal: Metrics.margins.preMedium,
    padding: Metrics.paddings.preMedium,
    borderRadius: 8,
    position: 'relative',
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  /* Button Style */
  tochableButton: {
    flex: 1,
  },
  primaryButton: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.medium,
    paddingVertical: Metrics.paddings.medium,
    borderRadius: 5,
    marginHorizontal: Metrics.margins.small,
    height: 55,
  },
  primaryBtn: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.medium,
    paddingVertical: Metrics.paddings.medium,
    height: 55,
  },
  disabledButton: {
    paddingHorizontal: Metrics.paddings.preMedium,
    paddingVertical: Metrics.paddings.preMedium,
    borderRadius: 5,
    marginHorizontal: Metrics.margins.small,
    height: 55,
  },
  primaryButtonMain: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.default,
    paddingVertical: Metrics.paddings.medium,
    borderRadius: 5,
    marginHorizontal: Metrics.margins.small,
  },
  buttonText: {
    fontSize: Font.sizes.regular,
    textAlign: 'center',
    justifyContent: 'center',
    color: Colors.white,
    // flex: 1,
    // fontWeight: 'bold'
  },
  buttonTextStyle: {
    fontSize: Font.sizes.medium,
    textAlign: 'center',
    justifyContent: 'center',
    color: Colors.white,
    flex: 1,
    // fontWeight: 'bold'
  },
  secondaryButton: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.default,
    paddingVertical: Metrics.paddings.default,
    borderRadius: 5,
    marginHorizontal: Metrics.margins.small,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    elevation: 0,
  },
  secondaryButtonWhite: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.default,
    paddingVertical: Metrics.paddings.default,
    borderRadius: 5,
    marginHorizontal: Metrics.margins.small,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    elevation: 0,
  },
  buttonTextSecondary: {
    fontSize: Font.sizes.regular,
    textAlign: 'center',
    color: Colors.primary,
    flex: 1,
    justifyContent: 'center',
  },
  buttonTextLink: {
    fontSize: Font.sizes.regular,
    color: Colors.primary,
    paddingHorizontal: Metrics.paddings.default,
  },
  buttonSignIn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  autoHeight: {
    height: 'auto'
  },
  buttonTextDisabled: {
    fontSize: Font.sizes.regular,
    textAlign: 'center',
    color: Colors.white,
    flex: 1,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  nextBtn: {
    color: Colors.primary,
    fontSize: Font.sizes.default,
    textAlign: 'right',
    marginRight: Metrics.margins.preMedium,
    fontWeight: 'bold',
  },
  /* Horizontal Line */
  lineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.buttonBorder,
    marginHorizontal: Metrics.margins.veryLarge,
  },

  /* Model View */
  modelContainer: {
    backgroundColor: Colors.white,
    padding: Metrics.margins.veryLarge,
    borderRadius: 10,
    marginHorizontal: Metrics.margins.large,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconViewStyle: {
    right: 0,
    paddingLeft: 220,
  },
  modelContainerView: {
    backgroundColor: Colors.white,
    padding: Metrics.margins.default,
    borderRadius: 10,
    marginHorizontal: Metrics.margins.large,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modelContainerStyle: {
    backgroundColor: Colors.white,
    padding: Metrics.margins.default,
    borderRadius: 10,
    marginHorizontal: Metrics.margins.veryLarge,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  model: {
    paddingHorizontal: Metrics.margins.veryLarge,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modelContainerLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  modelContainerLeftbg: {
    backgroundColor: Colors.white,
    padding: Metrics.margins.veryLarge,
    borderRadius: 10,
    marginHorizontal: Metrics.margins.large,
  },
  modelView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(163,175,183, 0.5)',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    // backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: Font.sizes.regular
  },
  modalButton: {
    paddingHorizontal: Metrics.paddings.veryLarge,
    paddingVertical: Metrics.paddings.medium,
    borderRadius: 5,
    // marginTop: Metrics.margins.large,
  },
  modalButtonText: {
    fontSize: Font.sizes.regular,
    textAlign: 'center',
    color: Colors.white,
    fontWeight: 'bold'
  },
  ModalButtonWhite: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.large,
    paddingVertical: Metrics.paddings.medium,
    borderRadius: 5,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    elevation: 0
  },
  ModalButtonText: {
    fontSize: Font.sizes.regular,
    textAlign: 'center',
    color: Colors.primary,
    justifyContent: 'center',
  },
  labelStyle: {
    textAlign: 'center',
    fontSize: Font.sizes.regular,
    padding: Metrics.paddings.default
  },
  chatText: {
    fontSize: Font.sizes.default,
    color: Colors.white,
    alignSelf: 'flex-start',
    textAlign: 'left',
    flex: 1,
  },
  chatText1: {
    fontSize: Font.sizes.default,
    color: Colors.default,
    alignSelf: 'flex-start',
    textAlign: 'left',
    flex: 1,
  },
  backIcon: {
    width: 22,
    height: 22,
    marginLeft: Metrics.margins.medium
  },
  warningIcon: {
    marginRight: 10,
    width: 22,
    height: 22,
  },
  progress: {
    height: 4,
    borderRadius: 1,
    // width: '100%',
    backgroundColor: Colors.progressBar
  },
  progressActive: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
    width: '15%',
    backgroundColor: Colors.primary,
    top: -1,
    left: 0
  },
  categoryButtonText: {
    fontSize: Font.sizes.tiny,
    textAlign: 'center',
    color: Colors.white,
  },
  categoryButton: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.small,
    paddingVertical: Metrics.paddings.small,
    borderRadius: 20,
    marginHorizontal: Metrics.margins.small,
    marginVertical: Metrics.margins.small,
    height: 20,
  },
  mainCategoryButton: {
    paddingHorizontal: Metrics.paddings.medium,
    paddingVertical: Metrics.paddings.small,
    borderRadius: 20,
    marginHorizontal: Metrics.margins.small,
    marginVertical: Metrics.margins.small,
    height: 25,
  },
  pendingButton: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.medium,
    paddingVertical: Metrics.paddings.small,
    borderRadius: 30,
    marginHorizontal: Metrics.margins.default,
    height: 25,
    backgroundColor: Colors.contractPending
  },
  ApprovedButton: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.medium,
    paddingVertical: Metrics.paddings.small,
    borderRadius: 30,
    marginHorizontal: Metrics.margins.default,
    height: 25,
    backgroundColor: Colors.contractApproved
  },
  rejectedButton: {
    flex: 1,
    paddingHorizontal: Metrics.paddings.medium,
    paddingVertical: Metrics.paddings.small,
    borderRadius: 30,
    marginHorizontal: Metrics.margins.default,
    height: 25,
    backgroundColor: Colors.contractRejected
  },
  statusText: {
    fontSize: Font.sizes.small,
    textAlign: 'center',
    color: Colors.white,
  },
  submitBtn: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    bottom: 0
  },
};
