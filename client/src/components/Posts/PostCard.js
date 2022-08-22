import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import CommentsCard from '../Comments/CommentsCard';
import LikeButton from './LikeButton';
import UpdatePost from './UpdatePost'
import { addComment, deletePost, getPosts } from "../../actions/postActions";
import { Box, TextField, CardContent, Grid, List, Modal, Button, Card, CardMedia, Avatar, IconButton, Typography, ListItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useNavigate } from 'react-router-dom';


const PostCard = ({ post, user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.usersReducer);
    const [commentContent, setCommentContent] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const deleteQuote = () => dispatch(deletePost(post._id));

    const style = {
        position: 'absolute',
        height: '80%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        overflow: 'scroll',
        p: 4,
    };

    const convertDateForHuman = (createdAt) => {
        let converted = new Date(createdAt);
        return converted.toLocaleString();
    };

    const handleComment = async (e) => {
        e.preventDefault();
        await dispatch(addComment(post._id, commentContent))
        .then(() => {
            dispatch(getPosts())
            setCommentContent('')
        })
        .catch((err) => toast.error(err.response.data))
    };

    const searchUser = (e, id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <ListItem >
            <Card sx={{ width: 1 }}>
                <Grid container justifyContent={'center'} pt={2}>
                    <Grid item container xs={12} sm={5} justifyContent={{xs: 'center', sm:'flex-start'}}>
                        <Grid item>
                            {
                                users.length > 0 && users.map((user) => {
                                    return (user.picture !== undefined && user._id === post.posterId) ?
                                        (<IconButton key={user._id} onClick={(e) => searchUser(e, user._id)}>
                                            <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user"/>
                                        </IconButton>)  : null
                                })
                            }
                        </Grid>
                        <Grid item>
                            {
                                users.length > 0 && users.map((user) => {
                                    if (user._id === post.posterId) return user.prenom + ' ' + user.nom
                                    else return null;
                                }).join("")
                            }
                            <Typography>{convertDateForHuman(post.createdAt).slice(0, -3)}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sm={6} justifyContent={{xs: 'center', sm:'flex-end'}}>
                        <Grid item alignSelf='center'>
                            {
                                (user && user._id === post.posterId) ? 
                                    <UpdatePost post={post}/>
                                : null
                            }
                        </Grid>
                        <Grid item>
                            {
                                (user && user._id === post.posterId ) ? 
                                    <IconButton onClick={deleteQuote}>
                                        <ClearIcon sx={{ color: 'red', fontSize: 45}}/>
                                    </IconButton>
                                : null
                            }                                
                        </Grid>
                    </Grid>
                </Grid>
                {(post.picture !== undefined && post.picture != null && post.picture !== "") &&
                    <CardMedia sx={{maxHeight: '400px', objectFit: "contain", width: '90%', margin: 'auto'}} component="img" src={"http://localhost:3050/Images/" + post.picture} alt="Post"/>
                }
                {post.message !== "" ?
                    (<CardContent>
                        <Typography fontSize={20}>{post.message}</Typography>
                    </CardContent>) : null
                }
                <IconButton>
                    <LikeButton post={post} user={user} users={users}/>
                </IconButton>
                <IconButton onClick={handleOpen}>
                    <ModeCommentOutlinedIcon sx={{fontSize: 45}}></ModeCommentOutlinedIcon>
                    <Typography pl={2} fontSize={30}>{post.comments.length}</Typography>
                </IconButton>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <List>
                            {post.comments.length > 0 && post.comments.map((comment) => <CommentsCard key={comment._id} post={post} comment={comment}/>)}
                        </List>
                        <TextField onChange={(e) => setCommentContent(e.target.value)} value={commentContent} name="commentContent" fullWidth variant="filled" label="Ajoutez un commentaire ..."/>
                        <Button type="submit" style={{backgroundColor: "#FF9292"}} fullWidth variant="contained" endIcon={<SendIcon />} onClick={handleComment}>Submit</Button>
                    </Box>
                </Modal>
                    <Grid container>
                        <TextField onChange={(e) => setCommentContent(e.target.value)} value={commentContent} name="commentContent" fullWidth variant="filled" label="Ajoutez un commentaire ..."/>
                        <Button type="submit" style={{backgroundColor: "#FF9292"}} fullWidth variant="contained" endIcon={<SendIcon />} onClick={handleComment}>Envoyer</Button> 
                    </Grid>
            </Card>
            <ToastContainer/>
        </ListItem>
    )
}

export default PostCard;