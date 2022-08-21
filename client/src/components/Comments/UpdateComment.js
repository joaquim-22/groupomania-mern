import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { getPosts, updateComment } from "../../actions/postActions";

const UpdateComment = ({comment, post}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  
  const updateComments = async (e) => {
    e.preventDefault();
    if(newCommentContent) {
      await dispatch(updateComment(post._id, comment._id, newCommentContent));
      dispatch(getPosts())
      setNewCommentContent('');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Update</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Commentaire</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={(e) => setNewCommentContent(e.target.value)}
            name="newCommentContent"
            type="text"
            value={newCommentContent}
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