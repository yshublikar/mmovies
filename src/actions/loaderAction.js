export function showLoader() {
  return {
      type: 'SHOW_LOADER',
      payload: true
    };
}
export function hideLoader(court) {
  return {
      type: 'HIDE_LOADER',
      payload: false
    };
}
