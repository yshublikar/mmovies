import React, { Component } from "react";
import { View } from 'react-native';
import {connect } from 'react-redux';

import Loader from '../../commons/loader.js';
import AppContainer from "../../routers/MainStackRouter";
import OfflineNotice from '../../commons/offlineNotice';

class StartScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
          <AppContainer />
          <OfflineNotice />
          {this.props.isLoader? <Loader/> : null}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
	return {
		isLoader: state.loader.isLoading
	}
};
export default connect(mapStateToProps, null)(StartScreen);
