import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import ProfileUpdate from '../components/ProfileUpdate';
import UserProfile from '../components/UserProfile';
import { CssBaseline, Container, Box, Button, Grid } from '@mui/material';

const Profile = ({ user }) => {
    const [update, setUpdate] = useState(true);
    const [monProfil, setMonProfil] = useState(false);
  
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
        <div style={{backgroundColor: "#E3E3E3"}}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <NavBar user={user}/>
                <Box>
                    <Grid container justifyContent={'space-evenly'} mb={3}>
                        <Grid item xs={5}>
                            <Button fullWidth variant="outlined" onClick={handleModals} id="update">Update</Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button fullWidth variant="outlined" onClick={handleModals} id="monProfil">Mon Profil</Button>
                        </Grid>
                    </Grid>
                    {update && <ProfileUpdate user={user}/>}
                    {monProfil && <UserProfile user={user}/>}
                </Box>
            </Container>
        </div>
    )
}

export default Profile;