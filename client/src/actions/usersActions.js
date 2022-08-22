import axios from 'axios';
import { toast } from 'react-toastify';

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return async (dispatch) => {
    await axios(`http://localhost:3050/api/user/`)
    .then((res) => {
      dispatch({ type: "GET_USERS", payload: res.data });
    })
    .catch((err) => toast.error('Impossible de afficher les users'));
  };
};