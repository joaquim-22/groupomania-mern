import React, { useEffect, useState } from 'react';
import { getPosts } from '../../actions/postActions';
import PostCard from '../Posts/PostCard';
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, Box, Avatar, CardHeader, Card, CardContent, Typography, List } from '@mui/material';

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
                <CardHeader 
                    avatar={(
                        user.picture !== undefined && <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user" key={user.id} sx={{ width: 100, height: 100 }}/>)}
                    title={user.prenom + ' ' + user.nom}
                />
                <CardContent>
                    <Box mb={3}>
                        <Typography>Date Naissance</Typography>
                        <Typography>{user.dateNaissance}</Typography>
                    </Box>
                    <Box mb={3}>
                        <Typography>Départment</Typography>
                        <Typography>{user.department}</Typography>
                    </Box>
                </CardContent>
            </Card>
            <List>
                {
                posts.length > 0 && posts.map((post) => {
                    if(user && user._id === post.posterId) return <PostCard post={post} user={user} key={post._id} />
                    else return null
                })}
            </List>
        </div>
    )
}

export default UserProfile;