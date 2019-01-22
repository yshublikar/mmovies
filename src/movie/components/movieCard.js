import React, { Component } from "react";
import {View, Image, FlatList, TouchableOpacity} from 'react-native';
import { Card, CardItem, Text, Left, Body, Item, Icon } from 'native-base';
import {connect } from 'react-redux';

import styles from "../styles/movieCard";
import Images from '../../themes/images';
import {imageUrl} from '../../config/config';
import httpServices from '../../commons/httpServices';
import Loader from '../../commons/loader';
import { showLoader, hideLoader } from '../../actions/loaderAction';

class MovieCard extends Component {
  constructor(props) {
        super(props);
        this.state = {
          movies: [], //used for internal pagination
          orignalMovies : [],
          recordCount: 0, //used for internal pagination
          loadingMoreData: false,
          page: 1 //used for server pagination
        };
  }
  async componentDidMount(){
    this.props.dispatch(showLoader())//show the loader
    await this._fetchMovies();//fetch movies from particular genre using id
  }

  //fetching movies by genre id and page number
  _fetchMovies(){
    let url = `/genre/${this.props.genre.id}/movies?page=${this.state.page}&`;
    httpServices.get(url).then((response) =>{
      //using internal pagination, showing only 5 cards at a time
      this.setState({orignalMovies: [...this.state.orignalMovies, ...response.results]}, ()=> this._pagingation())
    })
  }

  //used customize pagination to reduce the load from the app
  _pagingation(){
    let remainRecords = this.state.orignalMovies.length - this.state.recordCount; // calculating remaining count of the records
    if(remainRecords>0){ //if there are remaing records of this.state.orignalMovies then using intenal pagination
        let spliceNoOfRecord = remainRecords >= 5 ? 5 : remainRecords; //showing only 5 records at a time
        let movies = this.state.orignalMovies.splice(this.state.recordCount, spliceNoOfRecord); // coping records from orignalMovies
        let recordCount = this.state.recordCount + spliceNoOfRecord; //increasing the record count
        this.setState({
                      movies: [...this.state.movies, ...movies],
                      recordCount,
                      loadingMoreData: false
                    })
    }else{ //fetching the next page records from the API
      this.setState({page: this.state.page + 1}, ()=> this._fetchMovies())
    }
    this.props.dispatch(hideLoader()) //hide the loader
  }

  //When reach to screen bottom on scroll
  _onEndReached = () => {
    if(!this.state.loadingMoreData){
      this.props.dispatch(showLoader())
      this.setState({loadingMoreData: true}, ()=> this._pagingation())
    }
  };

//Rendering movies using FlatList
  _renderMovies(){
      return <FlatList
                  data={this.state.movies}
                  renderItem={this._renderMovieCards}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  ItemSeparatorComponent = {()=> <View style={styles.cardSeparator}></View>}
                  onEndReachedThreshold={0.5}
                  onMomentumScrollBegin={()=>{}}
                  onMomentumScrollEnd={this._onEndReached}
                />
   }

//Rendering movie cards with movie name
  _renderMovieCards = ({item, index}) =>{
    let uri = imageUrl + item.poster_path;
     return (<Card style={styles.cardStyle}>
                 <CardItem cardBody>
                    <TouchableOpacity onPress={()=> this._fetchMovieDetail(item)}>
                        <Image source={{uri}} defaultSource={Images.no_image} style={styles.movieImageStyle} resizeMode="stretch"/>
                    </TouchableOpacity>
                 </CardItem>
                 <CardItem style={styles.movieTitleContainer}>
                   <Left>
                     <Body style={styles.movieTitleStyle}>
                       <Text ellipsizeMode='tail' numberOfLines={1} style={styles.movieTitleText}>{item.title}</Text>
                     </Body>
                   </Left>
                 </CardItem>
               </Card>)
  }

//On selecting the movie it will redirect to the MovieDetail screen, passing the movie id as props
  _fetchMovieDetail(movie){
    this.props.navigation.navigate('MovieDetail',{id: movie.id});
  }

  render() {
    return (
        <View
            style={styles.container}
            >
            <View style={styles.genreTitleContainer}>
              <View style={styles.genreTitleStyle}>
                <Text style={styles.genreTitleTextStyle}>{this.props.genre.name}</Text>
              </View>
              <View style={styles.leftIconContainer}>
                <Icon style={styles.leftIconStyle} name= "ios-arrow-forward"/>
              </View>
            </View>
            {this.state.movies? this._renderMovies() : null}
        </View>
    );
  }
}

export default connect()(MovieCard);
