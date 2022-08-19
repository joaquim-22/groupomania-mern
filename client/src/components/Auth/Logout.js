import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Typography } from '@mui/material';

const Logout = () => {

    const removeCookie = (key) => {
        if(window !== 'undefined') {
            cookie.remove(key, {expires: 1})
        }
    }
    
    const logout = async () => {
        await axios({
            method: "GET",
            url: 'http://localhost:3050/api/user/logout',
            withCredentials:true
        })
        .then(() => removeCookie('jwt'))
        .catch((err) => console.log(err))

        window.location = '/'
    }

    return(
        <IconButton onClick={logout}>
            <Typography>Logout</Typography>
            <LogoutIcon sx={{ color: 'red' }}/>
        </IconButton>
    )
}

export default Logout;