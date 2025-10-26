const express =  require( 'express' );
const  { Comment , Post  } =  require( ' . ./models' );
const  { authMiddleware  } =  require( ' . ./middleware/auth' );
const  router = express.Router();
// Add comment to post  (auth)
router.post( '/:postId' , authMiddleware , async  (req ,  res ) =>  {
const post = await Post .findByPk(req.params.postId);
if  ( !post)  return  res .status(404).json({ error :  'Post not found'  });
const  { body  } =  req.body ;
if  (!body)  return  res .status(400).json({ error :  'Comment body  required'  });
const comment = await Comment .create({ body , postId : post.id , authorId :
req .user .id , approved : true  });
res .json(comment);
});
module.exports =  router ;
