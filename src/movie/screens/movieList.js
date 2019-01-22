import React, { Component } from "react";
import {View, FlatList} from 'react-native';
import { Toast } from 'native-base';
import {connect } from 'react-redux';

import styles from "../styles/movieList";
import MovieCard from '../components/movieCard';
import httpServices from '../../commons/httpServices';
import Loader from '../../commons/loader';
import { showLoader, hideLoader } from '../../actions/loaderAction';

class MovieList extends Component {
  constructor(props) {
        super(props);
        this.state = {
          genres: [], //store few geners and add more geners on scroll of list
          orignalGeners : [], //store all the Geners
          recordCount: 0, //Number of records show on screen, used for pagination
          loadingMoreData: false
        };
  }

  //Set screen header
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'M Movies'
    };
  };

  async componentDidMount(){
    this.props.dispatch(showLoader()); //dispatched action to show the loader component on screen
    await this._fetchGenres(); // fetching geners
  }

  _fetchGenres(){
    let url = '/genre/movie/list?';
    httpServices.get(url).then((response) =>{
      if(response.genres){
        //fetching data from server and using the internal pagination, as the api dose not support for it
        this.setState({orignalGeners: response.genres}, ()=> this._pagingation());
      }else{
        this.props.dispatch(hideLoader()) //action dispatched to hide the loader
        this.errorToast('Something went wrong please try again');
      }
    })
  }

  //Customize pagination for Geners
  _pagingation(){
    let remainRecords = this.state.orignalGeners.length - this.state.recordCount; // calculating remaining record count
    let spliceNoOfRecord = remainRecords >= 3 ? 3 : remainRecords; // displaying 3 records at a time
    // taking the records from orginalGeners and marging it to geners array
    let genres = this.state.orignalGeners.splice(this.state.recordCount, spliceNoOfRecord);
    let recordCount = this.state.recordCount + spliceNoOfRecord; //increasing record count
    this.setState({
                genres: [...this.state.genres, ...genres],
                recordCount,
                loadingMoreData: false
              })
    this.props.dispatch(hideLoader())
  }

  //Error toast on API response
  errorToast(message) {
    Toast.show({
      text: message,
      textStyle: { color: '#fdc630' },
      position: "top",
      duration: 3000
    })
  }

  //When list reach to the end of the screen after scrolling it
  _onEndReached = () => {
    if(!this.state.loadingMoreData){
      this.props.dispatch(showLoader());
      this.setState({loadingMoreData: true}, ()=> this._pagingation())
    }
  };

//To render the genres on screen used flatList and used MovieCard for item
  _renderGenres(){
    return <FlatList
              data= {this.state.genres}
              renderItem= {({ item }) => <MovieCard genre={item} navigation={this.props.navigation}/>}
              keyExtractor= {(item, index) => item.id.toString()}
              onEndReachedThreshold={0.5}
              onMomentumScrollBegin={()=>{}}
              onMomentumScrollEnd={this._onEndReached}
            />
  }

  render() {
    return (
      <View style={styles.container}>
          {this._renderGenres()}
      </View>
    );
  }
}

export default connect()(MovieList);
