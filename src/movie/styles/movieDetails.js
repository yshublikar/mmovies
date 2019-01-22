import { primaryColor, secondaryColor, titleColor, textColor } from '../../themes/colors'
export default {
  container:{
    backgroundColor: primaryColor,
    padding: 20,
    height: '100%'
  },
  flexRow:{
    flexDirection: 'row'
  },
  movieCoverImageContainer:{
    width: '50%',
  },
  movieDetailsTitleContainer:{
    paddingLeft: 10,
    width: '50%',
    justifyContent: 'space-between'
  },
  movieDetailsTitleStyle:{
    color: titleColor,
    fontSize: 18,
    fontWeight: '700'
  },
  movieDetailsStyle:{
    color: textColor,
    fontSize: 14,
    top: 3
  },
  movieOverviewContainer:{
    paddingTop: 20,
    justifyContent: 'flex-start'
  },
  movieOverviewTextStyle:{
    color: textColor
  },
  movieBGImageStyle: {
    height: 250,
  }
};
