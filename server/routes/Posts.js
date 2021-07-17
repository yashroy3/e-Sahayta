import express from 'express';

import { getPosts,createPosts,updatePost,deletePost,likePost} from '../controllers/Posts.js';

const router = express.Router();

// Routes along with functions are called
//for ex. getPosts function is being called from a different file a
//and only a route specifying that path is being written here



//if anyone visites this route then the callback function will be called
// localhost:5000/posts/
router.get('/',getPosts);
router.post('/',createPosts);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);

export default router;