import React, { useState } from "react";
import RegisterForm from "./Auth/RegisterForm";
import LoginForm from "./Auth/LoginForm";
import { Box, Button, Grid } from "@mui/material";

const MenuHome = ( props ) => {
  const [registerModal, setRegisterModal] = useState(props.register);
  const [loginModal, setLoginModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setRegisterModal(true);
    } else if (e.target.id === "login") {
      setRegisterModal(false);
      setLoginModal(true);
    }
  };

  return (
    <Box>
      <Grid container rowSpacing={2} my={2}>
        <Grid item xs={12}>
          <Button fullWidth size="large" onClick={handleModals} variant='contained' id="register" className={registerModal ? "active-btn" : null}>S'inscrire</Button>
        </Grid>
        <Grid item xs={12}>            
          <Button fullWidth size="large" onClick={handleModals} variant='contained' id="login" className={loginModal ? "active-btn" : null}>Se connecter</Button>
        </Grid>
    </Grid>
      {registerModal && <RegisterForm />}
      {loginModal && <LoginForm />}
    </Box>
  );
};

export default MenuHome;