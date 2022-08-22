import React from "react";
import Logo from "../components/NavBar/Logo";
import HomeImage from "../assets/groupomaniaHomeImage.png";
import MenuHome from "../components/Auth/MenuHome";
import { Container, CssBaseline, Grid } from "@mui/material";

const Home = () => {

  return (
    <Container maxWidth={false} style={{backgroundColor: 'white', minHeight: '100%'}}>
      <CssBaseline/>
      <Grid container justifyContent={'space-evenly'}>
        <Grid item xs={10} md={8}>
          <Logo/>
        </Grid>
        <Grid item xs={12} md={7}>
          <img style={{width: '100%'}} height={{xs: '100%', md: '800px'}} src={HomeImage} alt="Groupomania"/>
        </Grid>
        <Grid item xs={12} md={4}>
            <Grid item alignItems={'center'}>
              <MenuHome RegisterForm={false} LoginForm={true} />
            </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
