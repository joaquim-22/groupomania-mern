import React from "react";
import Logo from "../components/NavBar/Logo";
import HomeImage from "../assets/groupomaniaHomeImage.svg";
import MenuHome from "../components/Auth/MenuHome";
import { Container, CssBaseline, Grid } from "@mui/material";

const Home = () => {

  return (
    <Container maxWidth={false} style={{backgroundColor: 'white', 'min-height': '100%'}}>
      <CssBaseline/>
      <Grid container justifyContent={'space-evenly'}>
        <Grid item xs={10} md={8}>
          <Logo />
        </Grid>
        <Grid item xs={12} md={8} sx={{ 'max-height': '750px'}}>
          <img style={{width: '100%', height: '100%'}} src={HomeImage} alt="Groupomania"/>
        </Grid>
        <Grid item xs={12} md={3}>
            <Grid item alignItems={'center'}>
              <MenuHome RegisterForm={false} LoginForm={true} />
            </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
