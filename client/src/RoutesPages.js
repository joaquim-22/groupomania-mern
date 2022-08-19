import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Feed from './pages/Feed';
import { useSelector } from "react-redux";
import ProfileUsers from './components/ProfileUsers'

const RoutesPages = () => {

  const user = useSelector((state) => state.userReducer);

    return (
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/feed' element={<Feed/>} />
        <Route path='/profile' element={<Profile user={user}/>}/>
        <Route path='/profile/:id' element={<ProfileUsers/>}/>
      </Routes>
    );
};

export default RoutesPages;