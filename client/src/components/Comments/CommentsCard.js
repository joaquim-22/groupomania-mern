import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from "../../actions/postActions";
import UpdateComment from '../Comments/UpdateComment';
import { Avatar, CardContent, CardHeader, Grid, Typography, Card } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const CommentsCard = ({ comment, post }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.usersReducer);
    const user = useSelector((state) => state.userReducer);
    const deleteComments = () => dispatch(deleteComment(post._id, comment._id));
    
    const convertDateForHuman = (createdAt) => {
        let converted = new Date(createdAt);
        return converted.toLocaleString();
    }

    const searchUser = (e, id) => {
        navigate(`/profile/${id}`);
    }

    return (
        <Card style={{'margin-bottom': '10px'}}>
            <Grid container justifyContent={'center'} pt={2}>
                <Grid item container xs={12} sm={5} justifyContent={{xs: 'center', sm:'flex-start'}}>
                    <Grid item>
                        {
                            users.length > 0 && users.map((user) => {
                                return (user.picture !== undefined && user._id === comment.commenterId) ?
                                    (<IconButton key={user._id} onClick={(e) => searchUser(e, user._id)}>
                                        <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user"/>
                                    </IconButton>)  : null
                            })
                        }
                    </Grid>
                    <Grid item>
                        {
                            users.length > 0 && users.map((user) => {
                                if (user._id === comment.commenterId) return user.prenom + ' ' + user.nom
                                else return null;
                            }).join("")
                        }
                        <Typography>{convertDateForHuman(comment.timestamp).slice(0, -3)}</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={6} justifyContent={{xs: 'center', sm:'flex-end'}}>
                    <Grid item alignSelf='center'>
                        {
                            (user._id === comment.commenterId) ? 
                                <UpdateComment comment={comment} post={post}/>
                            : null
                        }
                    </Grid>
                    <Grid item>
                        {
                            (user._id === comment.commenterId ) ? 
                                <IconButton onClick={deleteComments}>
                                    <ClearIcon sx={{ color: 'red' , fontSize: 45}}/>
                                </IconButton>
                            : null
                        }
                    </Grid>
                </Grid>
            </Grid>
            <CardContent>
                <Typography>{comment.text}</Typography>
            </CardContent>
        </Card>
    )
}

export default CommentsCard;