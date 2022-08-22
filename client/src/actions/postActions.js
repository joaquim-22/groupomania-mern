import axios from 'axios';
import {toast} from 'react-toastify';

export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const LIKE_POST = "LIKE_POST";
export const DELETE_COMMENT = "DELETE_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UNLIKE_POST = "UNLIKE_POST";
export const ADD_COMMENT = "ADD_COMMENT";

export const getPosts = () => {
  return (dispatch) => {
    axios(`http://localhost:3050/api/post/`,{
      method: "GET",
    })
    .then((res) => {
      dispatch({ type: GET_POSTS, payload: res.data });
    })
    .catch((err) => console.log(err));
  }
};

export const updatePost = (postId, formData) => {
  return async (dispatch) => {
    await axios(`http://localhost:3050/api/post/${postId}`, {
      method: "PUT",
      data: formData,
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: UPDATE_POST, payload: { formData, postId }});
      toast.success("Post updated");
    })
    .catch((err) => toast.error(err.response.data))
  }
}

export const deletePost = (postId) => {
  return async (dispatch) => {
    await axios(`http://localhost:3050/api/post/${postId}`, {
      method: "DELETE",
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: DELETE_POST, payload: { postId }})
      toast.success("Post suprimmé");
    })
    .catch((err) => toast.error("Error"))
  };
};

export const likePost = (postId, userId) => {
  return async (dispatch) => {
    await axios(`http://localhost:3050/api/post/like-post/` + postId, {
      method: "PATCH",
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: { postId, userId } });
    })
    .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return async (dispatch) => {
    await axios(`http://localhost:3050/api/post/unlike-post/` + postId, {
      method: "PATCH",
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
    })
    .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commentContent, userId) => {
  return async (dispatch) => {
    await axios(`http://localhost:3050/api/post/comment-post/${postId}`, {
      method: "PATCH",
      data: { commentContent },
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: ADD_COMMENT, payload: { postId } });
      toast.success("Commentaire ajouté");
    })
    .catch((err) => toast.error(err.response.data));
  };
};

export const updateComment = (postId, commentId, newCommentContent) => {
  return async (dispatch) => {
    await axios(`http://localhost:3050/api/post//update/comment/${postId}`, {
      method: "PATCH",
      data: { newCommentContent, commentId },
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: UPDATE_COMMENT, payload: { newCommentContent }})
      toast.success("Commentaire updated");
    })
    .catch((err) => toast.error("Error"))
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    await axios(`http://localhost:3050/api/post/delete/comment/${postId}`, {
      method: "PATCH",
      data: { commentId },
      withCredentials: true
    })
    .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId }});
        toast.success("Commentaire supprimmé");
    })
    .catch((err) => toast.error("Error"))
  };
};
