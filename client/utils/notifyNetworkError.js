const { Materialize } = window;

const notifyNetworkError = error => (error.response ?
  Materialize.toast(error.response.data.message, 4000, 'red') :
  Materialize
    .toast(`${error.message}. It appears you're offline`, 4000, 'red'));

export default notifyNetworkError;
