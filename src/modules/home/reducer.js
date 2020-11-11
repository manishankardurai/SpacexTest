import { GET_DATA, ERROR_GET_DATA } from './actions';

const initialState = {
  data: [],
};


export const getDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.payload
      };
    case 'ERROR_GET_DATA':
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
}

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_LOADING':
      console.log('showloading triggered')
      return {
        ...state,
        isLoading: true
      }
    case 'HIDE_LOADING':
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}