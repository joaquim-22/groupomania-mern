import React, { useState } from "react";
import axios from "axios";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const RegisterForm = () => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  
  const handleRegister = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: `http://localhost:3050/api/user/register`,
      data: {
        nom,
        prenom,
        dateNaissance,
        department,
        email,
        password
      }
    })
    .then((res) => toast.success("Utilisateur a été bien crée"))
    .catch((err) => toast.error(err.response.data))
  };

  return (
    <>
      <form style={{width: '100%'}} action="" onSubmit={handleRegister}>
        <Grid container rowSpacing={2} my={3}>
          <Grid item xs={12}>
            <Typography>Nom</Typography>
            <TextField fullWidth type="text" onChange={(e) => setNom(e.target.value)} value={nom}/>
          </Grid>
          <Grid item xs={12}>
            <Typography>Prénom</Typography>
            <TextField fullWidth type="text" onChange={(e) => setPrenom(e.target.value)} value={prenom}/>
          </Grid>
          <Grid item xs={12}>
            <Typography>Date Naissance</Typography>
            <TextField fullWidth type="date" onChange={(e) => setDateNaissance(e.target.value)} value={dateNaissance}/>
          </Grid>            
          <Grid item xs={12}>
            <Typography>Email</Typography>
            <TextField fullWidth type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
          </Grid>
          <Grid item xs={12}>
            <Typography>Mot de pass</Typography>
            <TextField fullWidth type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
          </Grid>
          <Grid item xs={12}>
            <Typography>Départment</Typography>
            <TextField fullWidth type="text" onChange={(e) => setDepartment(e.target.value)} value={department}/>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" style={{ height: "50px", fontSize: 20}} fullWidth type="submit">Créer compte</Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer/>
    </>
  )
}

export default RegisterForm;
