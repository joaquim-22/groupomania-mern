import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {toast, ToastContainer} from 'react-toastify';
import { getPosts } from '../actions/postActions';
import NavBar from '../components/NavBar/NavBar';
import PostCard from '../components/Posts/PostCard';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Button, Card, Container, CssBaseline, Grid, Input, List, TextField, Typography } from '@mui/material';


const Feed = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const user = useSelector((state) => state.userReducer);
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    
    useEffect(() => {
        dispatch(getPosts());
    },[dispatch])


    const handlePost = async () => {
        const formData = new FormData();
        
        formData.append("file", image);
        formData.append("content", content);
        formData.append("posterId", user._id);
        
        await axios.post(`http://localhost:3050/api/post/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        .then(() => {
            toast.success('Post ajouté');
            setContent('');
        })
        .then(() => dispatch(getPosts()))
        .catch((err) => toast.error(err.response.data))
    }

    return (
        <div style={{ height: "100%"}}>
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
                        <TextField variant='filled' value={content} fullWidth type="text" onChange={(e) => setContent(e.target.value)} name='content' placeholder='Ecrivez'/>
                        <Input sx={{m: 2}} type="file" onChange={(e) => setImage(e.target.files[0])} name='image'/>
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
                <ToastContainer/>
            </Container>
        </div>
    )
}

export default Feed;