let intiState = {
  isLoading: false
}
export default function loader(state = intiState, action) {
  switch (action.type) {
    case 'SHOW_LOADER':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'HIDE_LOADER':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
