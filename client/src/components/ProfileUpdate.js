import { Avatar, Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ProfileUpdate = ({user}) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [bio, setBio] = useState("");
  const [department, setDepartment] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    const userId = user._id;
    console.log(user);
    axios(`http://localhost:3050/api/user/${userId}`, {
      method: "PUT",
      data: { nom, prenom, department, bio, user },
      withCredentials: true
    })
    .then((res) => {
      setUpdateForm(false);
      toast.success(res.data.success);
    })
    .catch((res) => console.log(res));
  }

  const handleDelete = () => {
    axios({
        method: "DELETE",
        url: `http://localhost:3050/api/user/${user._id}`,
        withCredentials: true
    })
    .then((res) => {
      toast.success('User supprimmé');
      setTimeout(function() {
        window.location.replace('/');
      }, 5000);
    })
    .catch((err) => toast.error(err.response.data))
  }

  const handleSubmit = () => {
    let formData = new FormData()
    formData.append('file', image.data)
    const response = axios.put('http://localhost:3050/api/user/upload', formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    })
    if (response) toast.success('User photo updated')
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (
    <>
      <form className="avatar-update" onSubmit={handleSubmit}>
        <Grid container justifyContent={'space-around'}>
          {(image && image.preview) && <img src={image.preview} alt="Avatar Preview" width='100' height='100' />}
          {(user && user.picture !== undefined) && <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user" sx={{ width: 100, height: 100 }}/> }
          <Input type='file' name='file' onChange={handleFileChange}></Input>
          <Button fullWidth variant='outlined' type='submit'>Submit</Button>
        </Grid>
      </form>
      <form action="PUT" onSubmit={handleUpdate}>
        <Box mb={3}>
          <Typography>Nom</Typography>
          <TextField fullWidth placeholder={user.nom}
            type="text"
            onChange={(e) => setNom(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Typography>Prénom</Typography>
          <TextField fullWidth placeholder={user.prenom}
            type="text"
            onChange={(e) => setPrenom(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Typography>Départment</Typography>
          <TextField fullWidth placeholder={user.department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Typography>Bio</Typography>
          <TextField fullWidth placeholder={user.bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Box>
        <Button fullWidth variant='outlined' type="submit">Update</Button>
      </form>
      <Box py={3}>
        <Button variant='outlined' fullWidth color={'error'} onClick={handleDelete}>Delete</Button>
      </Box>
      <ToastContainer/>
    </>
  );
};

export default ProfileUpdate;
