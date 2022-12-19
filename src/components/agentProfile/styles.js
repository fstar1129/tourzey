import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const width = Dimensions.get('window').width;


export default {
    profileContainer: {
        marginHorizontal: Metrics.margins.default,
        marginTop: 70,
        marginBottom: Metrics.margins.default,
    },
    cardViewStyle: {
        elevation: 0,
    },
    wrapper: {
        flex: 1,
    },
    back: {
        zIndex: 0,
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
    icon: {
        color: Colors.grey,
        fontSize: Font.sizes.regular,
    },
    agentDetails: {
        width: '100%',
        alignItems: 'center',
        lineHeight: 22,
        marginTop: Metrics.margins.medium,
    },
    agentName: {
        fontSize: Font.sizes.regular,
        color: Colors.primary,
    },
    agentOffice: {
        fontSize: Font.sizes.default,
        color: Colors.textDisabled,
    },
    starSpacing: {
        paddingLeft: Metrics.paddings.small,
    },
    overView: {
        fontSize: Font.sizes.regular,
        marginVertical: Metrics.margins.small,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
    },
    textCenter: {
        width: '100%',
        alignItems: 'center',
    },
    earningView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    month: {
        paddingHorizontal: Metrics.paddings.default,
        paddingVertical: Metrics.paddings.small,
        borderRadius: 20,
        backgroundColor: Colors.lightBg,
        fontSize: Font.sizes.small,
        color: Colors.primary,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    textBodyCenter: {
        width: '100%',
        alignItems: 'center',
        paddingRight: 40,
    },
    tagView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    tag: {
        paddingHorizontal: Metrics.paddings.default,
        paddingVertical: Metrics.paddings.small,
        marginHorizontal: Metrics.margins.small,
        marginTop: Metrics.margins.default,
        borderRadius: 5,
        backgroundColor: Colors.lightBg,
        fontSize: 13,
    },
    languages: {
        marginTop: Metrics.margins.default,
        alignItems: 'center'
    },
    messageBtn: {
        marginVertical: Metrics.margins.medium,
        marginHorizontal: Metrics.margins.large,
    },
    offerPrice: {
        fontSize: Font.sizes.regular,
        marginVertical: Metrics.margins.small,
        textAlign: 'center',
    },
    briefcaseIcon: {
        width: 25,
        height: 25,
        marginRight: Metrics.margins.default
    },
    jobCompleteView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    jobCompleteViewCommon: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    downIcon: {
        color: Colors.primary,
        justifyContent: 'flex-end',
        paddingLeft: Metrics.paddings.extraLarge
    },
    heartIcon: {
        color: Colors.grey,
        fontSize: Font.sizes.regular,
    },
    heartIconFilled: {
        color: Colors.red,
        fontSize: Font.sizes.regular,
    },
    heartIconView: {
        paddingHorizontal: Metrics.paddings.default,
        paddingVertical: Metrics.paddings.small,
        color: Colors.primary,
        position: 'absolute',
        right: 10,
        top: 12,
    },
    buttonView: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-around',
        marginTop: Metrics.margins.medium,
    },
    detailView: {
        alignSelf: 'center'
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
    hypen: {
        // width: '100%',
        alignItems: 'center',
        lineHeight: 22,
        marginTop: Metrics.margins.medium,
    },
    attachView: {
        display: 'flex',
        flexDirection: 'row',
    },
    fileView: {
        flexDirection: 'row'
    },
    textPrimary: {
        color: Colors.primary,
        fontSize: Font.sizes.medium,
        alignItems: 'center'
    },
    attachIcon: {
        color: Colors.primary,
        fontSize: Font.sizes.h4,
        marginRight: Metrics.margins.default,
        transform: [{ rotate: '70deg' }]
    },
      gallery: {
        color: Colors.primary,
        marginBottom: Metrics.margins.default,
      },
      video: {
        color: Colors.primary,
        marginBottom: Metrics.margins.default,
      },
      listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      card: {
        marginLeft: 10,
        marginTop: 10,
      },
      jobCompletedText: {
        fontSize: Font.sizes.medium,
        color: Colors.primary,
        paddingVertical: Metrics.paddings.default
      }, 
      serviceArea: {
        fontSize: Font.sizes.medium,
        color: Colors.default,
        paddingVertical: Metrics.paddings.small
      }, 
      videoIcon: {
          backgroundColor: Colors.primary,
          color: Colors.white,
          justifyContent: 'flex-start',
          borderRadius: 25,
          marginRight: Metrics.margins.default,
          padding: 5,
      },
      playCircleIcon: {
        zIndex: 999, 
        position: 'absolute', 
        top: '30%', 
        left: '45%' 
      }
};
