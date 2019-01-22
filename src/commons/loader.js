import React, {Component} from 'react';
import {View, ActivityIndicator,StyleSheet, Image} from 'react-native';
import {loaderColor} from '../themes/colors';
import Images from '../themes/images';

class Loader extends Component{
  render(){
    return(
      <View style={style.overlay}>
        <View style={[style.container, style.loading]}>
           <Image source={Images.loader} style={style.loaderImageStyle} resizeMode="stretch"/>
        </View>
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loaderImageStyle:{
    height: 100,
    width: 100
  },
  overlay:{
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 1,
    paddingLeft: '50%',
    paddingTop: '50%',
    width: '100%',
    height: '100%'
   }
})
export default Loader;
