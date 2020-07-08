import { PHOTOS_FETCH, PHOTOS_FETCH_ERROR } from "./photosActionTypes";
import loadData from "../../utils/fetch/loadData";

export const fetchPhotos = () => async (dispatch) => {
  try {
    const data = loadData("photos");
    dispatch({ type: PHOTOS_FETCH, payload: data });
  } catch (e) {
    dispatch({ type: PHOTOS_FETCH_ERROR, payload: "Error fetching photos" });
  }
};
