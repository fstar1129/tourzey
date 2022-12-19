import { Platform } from 'react-native';
import Colors from '../themes/main/Theme.Main.Colors';
import Metrics from '../themes/main/Theme.Main.Metrics';
import Font from '../themes/main/Theme.Main.Font';

export default {
    profileView: { 
        height: 195,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',   
        justifyContent: 'space-between',   
    },
    userRole: {
        fontSize: Font.sizes.medium, 
        marginTop: Metrics.margins.large,
    },
    userName: {
        color: '#03B1A6',
        fontSize: Font.sizes.title,
        marginBottom: Metrics.margins.default,    
        paddingbottom: 20
    },
    wrapper: {
        flex: 1,
    },
    back: {
        zIndex: 0
    },
    front: {   
        position: 'absolute',
        //left: 30,
        right: -50,
        bottom: 20,   
        //alignSelf: 'center',
        zIndex: 1,
        marginHorizontal: Metrics.margins.extraLarge,
    },
    addIcon: {
        width: 35,
        height: 35,
        position: 'absolute',
        marginTop: Metrics.margins.default,
        bottom:Platform.OS === 'ios' ? 35 : 0,
        right: 0,
    },
    profileImage: {
        //alignSelf: 'center',
        width: 100,
        height: 100,
        borderRadius: 50, 
        marginVertical: Metrics.margins.default,
    },
    navIcons: {
        color:'#03B1A6',
        width: 30,
        height: 30,
    },
    menuIcon: {
        color: Colors.primary,
        paddingLeft: Metrics.paddings.preMedium
    },
    logoutView: {
        flexDirection: 'row',
        fontSize: Font.sizes.default,
        paddingTop: 10
    },
    logoutText: {
        color: Colors.sidebarText,
        fontWeight: 'normal',
        paddingLeft: 26,            
        paddingTop: 3,
    },
    logoutImg: {
        width: 30,
        height: 30,
        marginLeft: 15,
        opacity: 0.6
    }
};