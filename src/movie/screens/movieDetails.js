import React, { Component } from "react";
import {View, Text, Image} from 'react-native';
import { Item, Toast, Left, Body, Right } from 'native-base';
import {connect } from 'react-redux';

import styles from "../styles/movieDetails";
import httpServices from '../../commons/httpServices';
import Images from '../../themes/images';
import {imageUrl} from '../../config/config';
import { showLoader, hideLoader } from '../../actions/loaderAction';
import moment from 'moment';

class MovieDetail extends Component {
  constructor(props) {
        super(props);
        this.state = {
          movieId: null,
          movieDetails: null
        };
  }

  //Setting header for the screen
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Movie Details'),
    };
  };

  //reading the moiveId from props
  componentWillMount(){
    this.props.dispatch(showLoader())
    this.setState({movieId: this.props.navigation.state.params.id})
  }

  async componentDidMount(){
    await this._fetchMovieDetail();//fetching the movie detail API
  }

  _fetchMovieDetail(){
    let url = `/movie/${this.state.movieId}?`;
    httpServices.get(url).then((response) =>{
      if(response.status_code === 34){ //calling toast on error from API
        this.props.dispatch(hideLoader())
        this.errorToast('Something went wrong please try again');
      }else{
        this.props.navigation.setParams({title: response.title})
        this.setState({movieDetails: response})
        this.props.dispatch(hideLoader()) //hide loader
      }
    })
  }

  //On API error the toast will be called and after 3 sec it will redirect to Movie list page
  errorToast(message) {
    var scope = this;
    Toast.show({
      text: message,
      textStyle: { color: '#fdc630' },
      position: "top",
      duration: 3000,
      onClose:function(){
          scope.props.navigation.goBack();
      }
    })
  }

  _renderMovieDetails(){
    if(this.state.movieDetails){
        let uri = `${imageUrl}${this.state&&this.state.movieDetails.backdrop_path}`;
        //let uri1 = `${imageUrl}${this.state&&this.state.movieDetails.poster_path}`;
        let movieDetails = this.state.movieDetails;
        return  <View>
                    <View style={styles.flexRow}>
                      <View style={styles.movieCoverImageContainer}>
                        <Image source={{uri}} defaultSource={Images.no_image} style={styles.movieBGImageStyle}/>
                      </View>
                      <View style={styles.movieDetailsTitleContainer}>
                        <View style={styles.flexRow}>
                          <Text style={styles.movieDetailsTitleStyle}>Release: </Text>
                          <Text style={styles.movieDetailsStyle}>{moment(movieDetails.release_date).format('ll')}</Text>
                        </View>
                        <View style={styles.flexRow}>
                          <Text style={styles.movieDetailsTitleStyle}>Popularity: </Text>
                          <Text style={styles.movieDetailsStyle}>{movieDetails.popularity}</Text>
                        </View>
                        <View style={styles.flexRow}>
                          <Text style={styles.movieDetailsTitleStyle}>Language: </Text>
                          <Text style={styles.movieDetailsStyle}>{movieDetails.spoken_languages[0].name}</Text>
                        </View>
                        <View style={styles.flexRow}>
                          <Text style={styles.movieDetailsTitleStyle}>Revenue: </Text>
                          <Text style={styles.movieDetailsStyle}>${movieDetails.revenue}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.movieOverviewContainer}>
                      <Text style={styles.movieOverviewTextStyle}>{movieDetails.overview}</Text>
                    </View>
                </View>
    }else{
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderMovieDetails()}
      </View>
    );
  }
}

export default connect()(MovieDetail);
