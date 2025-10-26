const express =  require( 'express' );
const  { Post , User , Comment  } =  require( ' . ./models' );
const  { authMiddleware  } =  require( ' . ./middleware/auth' );
const  router = express.Router();
//  List posts  (public)
router.get( '/' , async  (req ,  res ) =>  {
const posts = await Post .findAll({ include :  [{ model : User , as :  'author' ,
attributes :  [ 'id' , 'name' ]}], order : [[ 'createdAt' , 'DESC' ]]  });
res .json(posts);
});
// Get single post with comments
router.get( '/:id' , async  (req ,  res ) =>  {
const post = await Post .findByPk(req.params .id ,  { include :  [
{ model : User , as :  'author' , attributes :  [ 'id' , 'name' ]},
{ model : Comment , as :  'comments' , include :  [{ model : User , as :  'author' ,
attributes :  [ 'id' , 'name' ]  }  ]  }
]  });
if  ( !post)  return  res .status(404).json({ error :  'Post not found'  });
res .json(post);
});
// Create post  (auth)
router.post( '/' , authMiddleware , async  (req ,  res ) =>  {
const  { title , body , tags  } =  req.body ;
if  ( !title  ||  !body)  return  res .status(400).json({ error :  'Missing title or
body'  });
const post = await Post .create({ title , body , tags , authorId :  req .user .id  });
res .json(post);
});
//  Edit post  (auth, owner)
router.put( '/:id' , authMiddleware , async  (req ,  res ) =>  {
const post = await Post .findByPk(req.params.id);
if  ( !post)  return  res .status(404).json({ error :  'Post not found'  });  
if  (post.authorId  !==  req .user .id &&  req .user .role  !==  'admin' )  return
res .status(403).json({ error :  'Not allowed'  });
const  { title , body , tags  } =  req.body ;
await post.update({ title : title||post.title , body : body||post.body , tags :
tags||post.tags  });
res .json(post);
});
// Delete post
router.delete( '/:id' , authMiddleware , async  (req ,  res ) =>  {
const post = await Post .findByPk(req.params.id);
if  ( !post)  return  res .status(404).json({ error :  'Post not found'  });
if  (post.authorId  !==  req .user .id &&  req .user .role  !==  'admin' )  return
res .status(403).json({ error :  'Not allowed'  });
await post.destroy();
res .json({ success : true  });
});
module.exports =  router ;
