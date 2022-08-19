import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Feed from './pages/Feed';
import { useSelector } from "react-redux";
import ProfileUsers from './components/Profile/ProfileUsers';
import { createTheme, ThemeProvider } from "@mui/material";


const RoutesPages = () => {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Lato',
        'sans-serif'
      ].join(',')
    }
  })

  const user = useSelector((state) => state.userReducer);

    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/feed' element={<Feed/>} />
          <Route path='/profile' element={<Profile user={user}/>}/>
          <Route path='/profile/:id' element={<ProfileUsers/>}/>
        </Routes>
      </ThemeProvider>
    );
};

export default RoutesPages;