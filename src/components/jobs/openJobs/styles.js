import { Dimensions } from 'react-native';
import Colors from '../../../themes/main/Theme.Main.Colors';
import Metrics from '../../../themes/main/Theme.Main.Metrics';
import Font from '../../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200;
export default {
  cardViewStyle: {
    elevation: 0
  },
  cardContainer: {
    marginHorizontal: Metrics.margins.default,
    marginBottom: Metrics.margins.small,
  },
  optionalStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  tag: {
    paddingTop: Metrics.paddings.default,
    paddingBottom: Metrics.paddings.preMedium,
    textAlign: 'center',
    marginVertical: Metrics.margins.default,
    marginHorizontal: Metrics.margins.preSmall,
    borderRadius: 20,
    backgroundColor: Colors.grey,
  },
  toastStyle: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white
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
  title: {
    fontSize: Font.sizes.input,
    color: Colors.primary,
    marginBottom: Metrics.margins.small,
  },
  earningAmount: {
    fontSize: Font.sizes.title,
    color: Colors.primary,
    fontWeight: 'bold',
    marginTop: Metrics.margins.medium,
  },
  starSpacing: {
    paddingLeft: Metrics.paddings.small,
    marginVertical: Metrics.margins.small
  },
  priceDes: {
    fontSize: Font.sizes.default,
    marginBottom: Metrics.margins.default
  },
  description: {
    fontSize: Font.sizes.default,
  },
  count: {
    fontSize: Font.sizes.regular,
    color: Colors.primary
  },
  iconView: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  icon: {
    color: Colors.grey,
    fontSize: Font.sizes.regular,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.buttonBorder,
    marginHorizontal: Metrics.margins.small,
  },
  wholeView: {
    flexDirection: 'row',
    marginHorizontal: Metrics.margins.small,
    // marginVertical: 10
  },
  contentView: {
    flexDirection: 'column',
    paddingTop: Metrics.paddings.noPadding,
    paddingBottom: Metrics.paddings.noPadding,
  },
  nodataView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: SCREEN_HEIGHT,
    alignItems: 'center',
  },
  postJob: {
    marginVertical: Metrics.margins.large,
    width: '45%',
    margin: 'auto',
    height: 55,
  },
  nodataText: {
    fontSize: Font.sizes.title,
  },
  nodataTextPost: {
    fontSize: Font.sizes.medium,
  },
  plusIconView: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  addjobIcon: {
    width: 55,
    height: 55,
  },
  buttonTextLink: {
    fontSize: Font.sizes.default,
    color: Colors.primary,
    paddingHorizontal: Metrics.paddings.default,
    paddingVertical: Metrics.paddings.default
  },
  contractView: {
    marginBottom: Metrics.margins.medium,
  },
  labelStyle: {
    fontSize: Font.sizes.medium,
    color: Colors.default,
    textAlign: 'center',
    marginTop: Metrics.margins.small,
  },
};
