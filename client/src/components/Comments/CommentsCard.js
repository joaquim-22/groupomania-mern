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
            <Card>
                <CardHeader
                        avatar={users.length > 0 &&
                                users.map((user) => {
                                    return (user.picture !== undefined && user._id === comment.commenterId) ?
                                    (   <IconButton key={user._id} onClick={(e) => searchUser(e, user._id)}>
                                            <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user"/>
                                        </IconButton>)
                                    : null
                            })}
                        action={
                            <Grid container>
                                {(user._id === comment.commenterId) ? 
                                    <UpdateComment comment={comment} post={post}/>
                                : null}

                                {( user._id === comment.commenterId ) ? 
                                    <IconButton onClick={deleteComments}>
                                        <ClearIcon sx={{ color: 'red' }}/>
                                    </IconButton>
                                : null}
                            </Grid>
                        }
                        title={users.length > 0 &&
                                users.map((user) => {
                                    if (user._id === comment.commenterId) return user.prenom + ' ' + user.nom
                                    else return null;
                                })
                                .join("")
                            }
                        subheader={convertDateForHuman(comment.timestamp).slice(0, -3)}
                    />
                    <CardContent>
                        <Typography>{comment.text}</Typography>
                    </CardContent>
            </Card>
    )
}

export default CommentsCard;