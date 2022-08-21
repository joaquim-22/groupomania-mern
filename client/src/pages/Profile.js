import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import ProfileUpdate from '../components/Profile/ProfileUpdate';
import UserProfile from '../components/Profile/UserProfile';
import { CssBaseline, Container, Box, Button, Grid } from '@mui/material';

const Profile = ({ user }) => {
    const [update, setUpdate] = useState(false);
    const [monProfil, setMonProfil] = useState(true);
  
    const handleModals = (e) => {
      if (e.target.id === "update") {
        setMonProfil(false);
        setUpdate(true);
      } else if (e.target.id === "monProfil") {
        setUpdate(false);
        setMonProfil(true);
      }
    };

    return (
        <div>
            <CssBaseline/>
            <Container maxWidth="lg" height="100vh">
                <NavBar user={user}/>
                <Grid container justifyContent={'space-evenly'} my={3}>
                    <Grid item xs={5}>
                        <Button fullWidth variant="contained" color='secondary' onClick={handleModals} id="update">Update</Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button fullWidth variant="contained" color='secondary' onClick={handleModals} id="monProfil">Mon Profil</Button>
                    </Grid>
                </Grid>
                {update && <ProfileUpdate user={user}/>}
                {monProfil && <UserProfile user={user}/>}
            </Container>
        </div>
    )
}

export default Profile;