import axios from 'axios';
import { toast } from 'react-toastify';

export const GET_USERS = "GET_USERS";

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = () => {
  return (dispatch) => {
    axios(`${API_URL}/user/`)
    .then((res) => {
      dispatch({ type: "GET_USERS", payload: res.data });
    })
    .catch((err) => toast.error("Impossible d'afficher les users"));
  };
};