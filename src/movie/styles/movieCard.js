import { primaryColor, secondaryColor } from '../../themes/colors'

export default {
  container: {
    paddingLeft: 20,
    marginTop: 20
  },
  genreTitleContainer: {
    flexDirection: 'row'
  },
  genreTitleTextStyle: {
    color: secondaryColor,
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 10,
  },
  genreTitleStyle: {
    width: '95%',
    justifyContent: 'flex-start',
    alignItem: 'center'
  },
  leftIconContainer: {
    width: '5%',
    justifyContent: 'flex-end',
    alignItem: 'center'
  },
  leftIconStyle: {
    color: secondaryColor,
    fontSize: 20,
    paddingBottom: 10
  },
  cardSeparator: {
    width: 10
  },
  movieImageStyle: {
    height: 170,
    width: 140,
    flex: 1
  },
  movieTitleContainer: {
    backgroundColor: '#f3f3f3'
  },
  movieTitleStyle: {
    width: 100,
  },
  movieTitleText: {
    color: primaryColor
  }
};
