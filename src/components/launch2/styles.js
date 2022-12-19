import { Dimensions } from 'react-native';
export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 100; 
console.log('SCREEN_HEIGHT', SCREEN_HEIGHT);
export default {
 
      launchText: {
       height:'100%',
       flex:1
      },
      textStyle:{
        flexDirection: 'column',  
        alignItems: 'center', 
        justifyContent: 'flex-end',
        display: 'flex',
        width:'100%',
        height:'100%',
        paddingBottom:'10%',
      },
      textStyle1:{
        color:'#f0f8ff',
        fontSize:45,   
        textAlign:'center',
        marginLeft:'15%',
        marginRight:'15%',
        marginBottom:'5%',
      },
      launchScreen:{
        width: '100%', 
        height: '100%'
      },
      icon:{
        backgroundColor:'white',
        height:60,
        width:60,  
        borderRadius:30, 
        display:'flex', 
        justifyContent: 'center', 
        paddingLeft:7,
       
      },
      imageStyle2: {
        height:30,
        width:30,
        marginLeft:8
      },
     
};
