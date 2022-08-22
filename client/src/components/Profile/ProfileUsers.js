import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { CssBaseline, Container, CardContent, Card, Typography, Avatar, List, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PostCard from '../Posts/PostCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const ProfileUsers = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const user = useSelector((state) => state.userReducer);
    const [loadPost, setLoadPost] = useState(false);
    const [userGet, setUserGet] = useState([]);
    const params = useParams();
    
    useEffect(() => {
        axios.get(`${API_URL}/user/${params.id}`)
            .then((res) => {
            setUserGet(res.data)
            })
            .catch((err) => console.log(err))
    }, [params.id,]);

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch]);
    
    return (
        <div style={{backgroundColor: "#E3E3E3"}}>
        <CssBaseline/>
        <Container maxWidth="lg">
            <NavBar user={user}/>
            <Card sx={{ width: 1 }}>
                <Grid container justifyContent={'center'}>
                    <Grid item my={2}>
                        {(userGet.picture !== undefined && userGet.picture !== null) && <Avatar src={"http://localhost:3050/Images/" + userGet.picture} alt="user" key={userGet._id} sx={{ width: 100, height: 100 }}/>}
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant="h5" align='center'>{userGet.prenom + ' ' + userGet.nom}</Typography>
                    </Grid>
                </Grid>
                <CardContent>
                    <Grid container>
                        <Grid container item rowSpacing={2} justifyContent='center'>
                            <Grid item xs={10} lg={4}>
                                <Typography variant="h6">Date Naissance: {userGet.dateNaissance}</Typography>
                            </Grid>
                            <Grid item xs={10} lg={2}>
                                <Typography variant="h6">Départment: {userGet.department}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} justifyContent='center' my={1} style={{backgroundColor: "#E3E3E3"}}>
                            <Grid item xs={10} lg={6} py={2}>
                                <Typography variant="h6" align='center'>Bio</Typography>
                                <Typography fontSize={20}>{userGet.bio}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <List>
                {posts.length > 0 && posts.map((post) => {
                    if(userGet._id === post.posterId) return <PostCard post={post} user={user} key={post._id} />
                    else return null
                })}
            </List>
        </Container>
        </div>
    )
}

export default ProfileUsers;