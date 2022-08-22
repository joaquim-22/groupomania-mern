import { GET_POSTS, DELETE_POST, UPDATE_POST, LIKE_POST, UNLIKE_POST, UPDATE_COMMENT, DELETE_COMMENT } from "../actions/postActions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type){
        case GET_POSTS:
            return action.payload;
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId);
        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                  const { newContent } = action.payload.formData;
                    return {
                            ...post,
                            message: newContent,
                        };
                } else return post;
        });
        case LIKE_POST:
            return state.map((post) => {
              if (post._id === action.payload.postId) {
                return {
                  ...post,
                  likers: [action.payload.userId, ...post.likers],
                };
              }
              return post;
        });
        case UNLIKE_POST:
          return state.map((post) => {
            if (post._id === action.payload.postId) {
              return {
                ...post,
                likers: post.likers.filter((id) => id !== action.payload.userId),
              };
            }
            return post;
          });
          case UPDATE_COMMENT:
            return state.map((post) => {
              if (post._id === action.payload.postId) {
                return {
                  ...post,
                  comments: post.comments.map((comment) => {
                    if (comment._id === action.payload.commentId) {
                      return {
                        ...comment,
                        text: action.payload.newCommentContent,
                      };
                    } else {
                      return comment;
                    }
                  }),
                };
              } else return post;
            });
          case DELETE_COMMENT:
            return state.map((post) => {
              if (post._id === action.payload.postId) {
                return {
                  ...post,
                  comments: post.comments.filter(
                    (comment) => comment._id !== action.payload.commentId
                  ),
                };
              } else return post;
            });
          default:
            return state;
    }
}