import React, { useEffect, useState, useContext} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../actions/postActions";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Grid, List, ListItem } from "@mui/material";
import { UidContext } from "./AppContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const LikeButton = ({ post }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const uid = useContext(UidContext);
    const users = useSelector((state) => state.usersReducer);

    const submitLike = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    }
    
    const submitDislike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    }

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
      }, [uid, post.likers, liked]);

    return (
        <>
            <Grid container alignItems={'center'}>
                {liked && (
                    <img src="../../icons/heart-filled.svg" onClick={submitDislike} alt="like" />
                )}
    
                {liked === false &&  (
                    <img src="../../icons/heart.svg" onClick={submitLike} alt="like" />
                )}
                <Typography onClick={handleOpen} >{post.likers.length}</Typography>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <List>
                            {
                                users.length > 0 && users.map((user) =>  {
                                    if (user.likes.includes(post._id)) {
                                        return(
                                            <ListItem key={user._id}>
                                                <Avatar src={"http://localhost:3050/Images/" + user.picture} alt="user" key={user._id}/>
                                                <Typography>{user.prenom + ' ' + user.nom}</Typography>
                                            </ListItem>
                                        )
                                    }
                                    else return null
                                })
                            }
                        </List>
                    </Box>
                </Modal>
            </Grid>
        </>
    )
}

export default LikeButton;