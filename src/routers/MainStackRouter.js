import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MovieList from '../movie/screens/movieList';
import MovieDetail from '../movie/screens/movieDetails';
import {primaryColor, secondaryColor} from '../themes/colors'

const onLeftButtonPress = (navigation) => {
  navigation.goBack();
}

//Stack Navigation 
const StackNav = createStackNavigator(
  {
    MovieList,
    MovieDetail,
  },
  {
    initialRouteName: 'MovieList',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: primaryColor,
      },
      headerTintColor: secondaryColor,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22
      },
    },
  }
);

 const AppContainer = createAppContainer(StackNav);
export default AppContainer;
