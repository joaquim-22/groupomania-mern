import React from "react";
import Logo from "../components/NavBar/Logo";
import HomeImage from "../assets/groupomaniaHomeImage.svg";
import MenuHome from "../components/MenuHome";
import { Box, Container, Typography, CssBaseline } from "@mui/material";

const Home = () => {

  return (
    <Container>
      <CssBaseline/>
      <Logo />
      <Box>
        <img style={{width: '100%', height: '100%'}} src={HomeImage} alt="Groupomania"/>
      </Box>
      <Typography variant='h4' align={'center'}>Un nouveau monde se lève. Découvrons-le.</Typography>
      <Box>
          <Box className="log-container">
            <MenuHome RegisterForm={false} LoginForm={true} />
          </Box>
      </Box>
    </Container>
  );
};

export default Home;
