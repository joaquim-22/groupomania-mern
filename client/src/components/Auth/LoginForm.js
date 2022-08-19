import React, {useState} from 'react';
import axios from "axios";
import { Button, Grid, TextField, Typography,} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
  const handleLogin = (e) => {
      e.preventDefault()
       axios({
        method: "post",
        url: `http://localhost:3050/api/user/login`,
        withCredentials: true,
        data: {
          email,
          password
        },
      })
      .then((res) => {
        window.location="/feed"
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data)
      })
  }

    return (
      <>
        <form action="" onSubmit={handleLogin}>
          <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Typography>Email</Typography>
                <TextField error={email === ""} fullWidth type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
              </Grid>
              <Grid item xs={12}>
                <Typography>Mot de pass</Typography>
                <TextField error={password === ""} fullWidth type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" style={{ height: "50px", fontSize: 20}} fullWidth type="submit" value="Login">Login</Button>
              </Grid>
          </Grid>
        </form>
        <ToastContainer/>
      </>
    )
}

export default LoginForm;