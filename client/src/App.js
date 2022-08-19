import React, { useEffect, useState } from "react";
import RoutesPages from './RoutesPages'
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { getUser } from './actions/userActions'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect( () => {
    const fetchTok = async (e) => {
      await axios({
        method:"get",
        url: "http://localhost:3050/jwtid",
        withCredentials: true,
      })
      .then((res) => {
        setUid(res.data);
      })
      .catch(() => navigate('/'));
    }
    fetchTok();

    if(uid) dispatch(getUser(uid));
  }, [uid, dispatch, navigate]);

  return (
    <UidContext.Provider value={uid}>
      <RoutesPages />
    </UidContext.Provider>
  )
}

export default App;
