import { Avatar, Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProfileUpdate = ({user}) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [bio, setBio] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState({ preview: '', data: '' });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userId = user._id;
    
    await axios(`http://localhost:3050/api/user/${userId}`, {
      method: "PUT",
      data: { nom, prenom, department, bio, user },
      withCredentials: true
    })
    .then((res) => toast.success("Profil updated"))
    .catch((err) => toast.error(err.response.data));
  };

  const handleDelete = () => {
    axios({
        method: "DELETE",
        url: `http://localhost:3050/api/user/${user._id}`,
        withCredentials: true
    })
    .then((res) => {
      toast.success('User supprimmé');
      setTimeout(() => {
        window.location.replace('/');
      }, 5000);
    })
    .catch((err) => toast.error(err.response.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', image.data);
    axios.patch('http://localhost:3050/api/user/upload', formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    })
    .then((res) => toast.success('User photo updated'))
    .cathc((err) => toast.error('Error'))
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img);
  }

  return (
    <>
      <form className="avatar-update" onSubmit={handleSubmit}>
        <Grid container justifyContent={'space-around'} my={3}>
          {(image && image.preview) && <Avatar src={image.preview} alt="Avatar Preview" sx={{ width: 100, height: 100 }}/>}
          {(user && user.picture !== undefined) && <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user" sx={{ width: 100, height: 100 }}/> }
          <Input name="file" type="file" onChange={handleFileChange}/>
          <Grid item xs={12} md={8} mt={4}>
            <Button fullWidth variant='outlined' type='submit' pb={2}>Submit Avatar</Button>
          </Grid>
        </Grid>
      </form>
      <form action="PUT" onSubmit={handleUpdate}>
        <Grid container rowSpacing={3} justifyContent='center'>
          <Grid item xs={12}>
            <Typography>Bio</Typography>
            <TextField fullWidth placeholder={user.bio} onChange={(e) => setBio(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Typography>Nom</Typography>
            <TextField fullWidth placeholder={user.nom} type="text" onChange={(e) => setNom(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Typography>Prénom</Typography>
            <TextField fullWidth placeholder={user.prenom} type="text" onChange={(e) => setPrenom(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Typography>Départment</Typography>
            <TextField fullWidth placeholder={user.department} onChange={(e) => setDepartment(e.target.value)}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Button fullWidth variant='outlined' type="submit">Update</Button>
          </Grid>
        </Grid>
      </form>
      <Grid container justifyContent='end' mt={3}>
        <Grid item xs={12} md={4}>
          <Button variant='outlined' fullWidth color={'error'} onClick={handleDelete}>
            Delete Account
            <DeleteForeverIcon/>
          </Button>
        </Grid>
      </Grid>
      <ToastContainer/>
    </>
  );
};

export default ProfileUpdate;
