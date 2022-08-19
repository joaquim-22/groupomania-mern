import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { updatePost } from "../actions/postActions";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Input } from '@mui/material';

const UpdatePost = ({post}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newContent, setNewContent] = useState("");
    const [image, setImage] = useState("");

  const updateQuote = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("newContent", newContent);
    dispatch(updatePost(post._id, formData))
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