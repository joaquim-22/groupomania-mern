import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { updateComment } from "../actions/postActions";

const UpdateComment = ({comment, post}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newCommentContent, setNewCommentContent] = useState("");
    const [update, setUpdate] = useState(false);

    
    const updateComments = (e) => {
      e.preventDefault();
      dispatch(updateComment(post._id, comment._id, newCommentContent));
      setNewCommentContent('');
      setUpdate(false);
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
        <DialogTitle>Update Commentaire</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateComments}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateComment;