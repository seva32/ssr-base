import {
  PHOTOS_FETCH,
  PHOTOS_FETCH_ERROR,
} from "../actions/photos/photosActionTypes";

const initialState = {
  list: [],
  error: "",
};

function photosReducer(state = initialState, action) {
  switch (action.type) {
    case PHOTOS_FETCH:
      return { ...state, list: action.payload };
    case PHOTOS_FETCH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default photosReducer;
