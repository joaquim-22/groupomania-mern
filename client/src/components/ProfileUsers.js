import React, { useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import { CssBaseline, Container, Box, Button, Grid, CardContent, CardHeader, Card, Typography, Avatar, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import PostCard from './PostCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileUsers = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const user = useSelector((state) => state.userReducer);
    const [loadPost, setLoadPost] = useState(false);
    const [userGet, setUserGet] = useState([]);
    const params = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:3050/api/user/${params.id}`)
            .then((res) => {
            setUserGet(res.data)
            })
            .catch((err) => window.location='/feed')
    }, [params.id,]);

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])
    
    return (
        <div style={{backgroundColor: "#E3E3E3"}}>
        <CssBaseline/>
        <Container maxWidth="lg">
            <NavBar user={user}/>
            <Card sx={{ width: 1 }}>
                <CardHeader 
                    avatar={(
                        userGet.picture !== undefined) && <Avatar src={"http://localhost:3050/Images/" + userGet.picture} alt="user" key={userGet.id} sx={{ width: 100, height: 100 }}/>
                    }
                    title={userGet.prenom + ' ' + userGet.nom}
                />
                <CardContent>
                    <Box mb={3}>
                        <Typography>Date Naissance</Typography>
                        <Typography>{userGet.dateNaissance}</Typography>
                    </Box>
                    <Box mb={3}>
                        <Typography>Départment</Typography>
                        <Typography>{userGet.department}</Typography>
                    </Box>
                </CardContent>
            </Card>
            <List>
                {
                posts.length > 0 && posts.slice().reverse().map((post) => {
                    if(userGet.id === post.userId) return <PostCard post={post} user={user} key={post.id} />
                    else return null
                })}
            </List>
        </Container>
        </div>
    )
}

export default ProfileUsers;