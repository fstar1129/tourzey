import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT_FULL = Dimensions.get('window').height;
export default {
  agentContainer: {
    marginTop: Metrics.margins.default,
  },
  cardViewStyle: {
    elevation: 0
  },
  scrollContainer: {
    backgroundColor: Colors.allpageBg,
    height: SCREEN_HEIGHT_FULL,
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
    borderRadius: 50
  },
  nameSpacing: {
    marginLeft: Metrics.margins.default,
  },
  nameStyling: {
    fontWeight: 'bold',
    fontSize: Font.sizes.regular,
    color: Colors.primary,
  },
  earningsView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  earningAmount: {
    fontSize: Font.sizes.regular,
    color: Colors.primary,
    fontWeight: 'bold',
    marginTop: Metrics.margins.large
  },
  jobTitle: {
    fontSize: Font.sizes.medium,
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
  starSpacing: {
    paddingLeft: Metrics.paddings.small,
  },
  profileContainer: {
    margin: Metrics.margins.default,
  },
  labelStyle: {
    fontSize: Font.sizes.medium,
    color: Colors.default,
    textAlign: 'center',
    marginTop: Metrics.margins.small,
  },
  jobPostLabel: {
    fontSize: Font.sizes.regular,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: Metrics.margins.default,
  },
  heading: {
    color: Colors.default,
    marginTop: Metrics.margins.veryLarge,
    textAlign: 'center',
    fontSize: Font.sizes.regular,
  },
  tickIcon: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginTop: Metrics.margins.preMedium,
  },
  nodataText: {
    color: Colors.default,
    fontSize: Font.sizes.medium,
    textAlign: 'center',
    paddingTop: Metrics.paddings.extraLarge
  },
  guidesView: {
    marginHorizontal: Metrics.margins.large
  }, 
};
