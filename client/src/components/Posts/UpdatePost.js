import React, {useState} from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Input, Button } from '@mui/material/';
import { useDispatch } from 'react-redux';
import { updatePost, getPosts } from "../../actions/postActions";
import { ToastContainer} from 'react-toastify';

const UpdatePost = ({ post }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newContent, setNewContent] = useState("");
    const [image, setImage] = useState("");

  const updateQuote = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("newContent", newContent);
    await dispatch(updatePost(post._id, formData))
    dispatch(getPosts());
  } 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update publication</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={(e) => setNewContent(e.target.value)}
          />
        <Input sx={{m: 2}} type="file" onChange={(e) => setImage(e.target.files[0])} name='image'></Input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateQuote}>Update</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default UpdatePost;