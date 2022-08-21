import React, { useEffect, useState } from 'react';
import { getPosts } from '../../actions/postActions';
import PostCard from '../Posts/PostCard';
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, Avatar, Card, CardContent, Typography, List, Grid } from '@mui/material';

const UserProfile = ({user}) => {
    const [loadPost, setLoadPost] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])
    
    return (
        <div style={{backgroundColor: "#E3E3E3"}}>
            <CssBaseline/>
            <Card sx={{ width: 1 }}>
                <Grid container justifyContent={'center'}>
                    <Grid item my={2}>
                        {
                            (user.picture !== undefined) && <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user" key={user._id} sx={{ width: 100, height: 100 }}/>
                        }
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant="h5" align='center'>{user.prenom + ' ' + user.nom}</Typography>
                    </Grid>
                </Grid>
                <CardContent>
                    <Grid container>
                        <Grid container item rowSpacing={2} justifyContent='center'>
                            <Grid item xs={10} lg={4}>
                                <Typography variant="h6">Date Naissance: {user.dateNaissance}</Typography>
                            </Grid>
                            <Grid item xs={10} lg={2}>
                                <Typography variant="h6">Départment: {user.department}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} justifyContent='center' my={1} style={{backgroundColor: "#E3E3E3"}}>
                            <Grid item xs={10} lg={6} py={2}>
                                <Typography variant="h6" align='center'>Bio</Typography>
                                <Typography fontSize={20}>{user.bio}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <List>
                {
                posts.length > 0 && posts.map((post) => {
                        if(user && user._id === post.posterId) return <PostCard post={post} user={user} key={post._id} />
                        else return null
                    })
                }
            </List>
        </div>
    )
}

export default UserProfile;