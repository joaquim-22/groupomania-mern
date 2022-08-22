import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logoGroupomania from '../../assets/logo.svg'
import Logout from '../Auth/Logout';
import { Grid, Link } from '@mui/material';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((state) => state.userReducer);
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
          <IconButton size="large" aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu 
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'inline-block', md: 'none' }, 
            }}
          >
              <MenuItem>
                  <Link underline="none" href="/feed">Feed</Link>
              </MenuItem>
              <MenuItem>
                  <Link underline="none" href="/profile">Profile</Link>
              </MenuItem>
              <MenuItem>
                  <SearchBar/>
              </MenuItem>
          </Menu>
        </Box>
        <Box component="img"
            src={logoGroupomania}
            sx={{
                height: 35,
                width: 180,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 450, md: 250 },
            }}
            align={"center"}
        />
        <Grid container sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around' }}>
          <Grid container justifyContent={'space-evenly'} alignItems={'center'}>
            <Link underline="none" href="/feed">Feed</Link>
            <Link underline="none" href="/profile">Profile</Link>
            <SearchBar/>
          </Grid>
        </Grid>

        <Box sx={{ flexGrow: 1 }}>
          <Box title="Open settings" sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <IconButton onClick={handleOpenUserMenu}>
              {user.picture !== undefined && <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user" key={user._id}/>}
            </IconButton>
          </Box>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {
            user.isAdmin === true &&
              <MenuItem>
                <Link underline="none" href="http://localhost:3050/admin">Admin</Link>
              </MenuItem>
            }
            <MenuItem>
                <Logout/>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </>
  );
};
export default NavBar;