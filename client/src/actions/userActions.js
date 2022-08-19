import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = (uid) => {
  return (dispatch) => {
    axios.get(`http://localhost:3050/api/user/${uid}`, {
      Accept: "application/json"
    })
    .then((res) => {
      return dispatch({ type: "GET_USER", payload: res.data });
    })
    .catch((err) => console.log(err));
  }
};
