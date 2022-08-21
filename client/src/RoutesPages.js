import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
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
    },
    palette: {
      primary: {
        main: '#FD2D01',
      },
      secondary: {
        main: '#4E5166',
      },
    },
});

  const user = useSelector((state) => state.userReducer);

    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/feed' element={<Feed/>} />
          <Route path='/profile' element={<Profile user={user}/>}/>
          <Route path='/profile/:id' element={<ProfileUsers/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    );
};

export default RoutesPages;