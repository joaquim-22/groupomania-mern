import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Button, Card, Container, CssBaseline, Grid, Input, List, TextField, Typography } from '@mui/material';
import {toast} from 'react-toastify';


const Feed = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const user = useSelector((state) => state.userReducer);
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    

    useEffect(() => {
        dispatch(getPosts());
    },[dispatch])


    const handlePost = () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("content", content);
        formData.append("posterId", user._id);
        
        axios.post(`http://localhost:3050/api/post/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        .then((res) => {
            dispatch(getPosts());
            toast.success('Post ajouté');
        })
        .catch((res) => toast.error('Error'))
    }

    return (
        <div style={{backgroundColor: "#E3E3E3"}}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <NavBar/>
                <Grid container justifyContent="center" alignItems="center" my={2}>
                    <Grid item xs={12} md={2} align={'center'}>
                        {(user && user.picture !== undefined) && <Avatar sx={{ width: 100, height: 100 }} src={"http://localhost:3050/Images/" + user.picture} alt="user" key={user.id}/>}
                    </Grid>
                    <Grid item xs={12} md={4} align={'center'}>
                        <Typography variant='h5'>Bienvenue {user.prenom}</Typography>
                    </Grid>
                </Grid>

                <Card>
                    <Grid container justifyContent="center">
                        <TextField variant='filled' fullWidth type="text" onChange={(e) => setContent(e.target.value)} name='content' placeholder='Ecrivez'/>
                        <Input sx={{m: 2}} type="file" onChange={(e) => setImage(e.target.files[0])} name='image'></Input>
                        <Button type="submit" style={{backgroundColor: "#FF9292"}} fullWidth variant="contained" endIcon={<SendIcon />} onClick={handlePost}>Publier</Button> 
                    </Grid>
                </Card>
                <Typography variant="h4" align='center' my={3}>Dernières Publications</Typography>
                <List>
                    {
                    posts.length > 0 && posts.map((post) => {
                        return <PostCard key={post._id} post={post} user={user}/>;
                    })}
                </List>
            </Container>
        </div>
    )
}

export default Feed;