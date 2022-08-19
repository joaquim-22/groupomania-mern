import { Box } from '@mui/material';
import React from 'react'
import logoGroupomania from '../assets/logo.svg'

const Logo = () => {
    return (
        <Box className='logo'>
            <img style={{width: '100%', height: '100%'}} src={logoGroupomania} alt='Logo Groupomania'/>
        </Box>
    )
}

export default Logo;