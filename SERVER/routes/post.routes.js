const router = require('express').Router();
const postController =require ('../controllers/post.controller');
const { upload } = require('../middleware/multerConfig');

router.get('/', postController.readPost);
router.post('/', upload.single("file"), postController.createPost);
router.put('/:id', upload.single("file"), postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/update/comment/:id', postController.editCommentPost);
router.patch('/delete/comment/:id', postController.deleteCommentPost);

module.exports = router;