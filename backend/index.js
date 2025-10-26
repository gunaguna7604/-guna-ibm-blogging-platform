require( 'dotenv' ).config();
const express =  require( 'express' );
const bodyParser =  require( 'body-parser' );
const cors =  require( 'cors' );
const  { sequelize  } =  require( ' ./models' );
const authRoutes =  require( ' ./routes/auth' );
const postsRoutes =  require( ' ./routes/posts' );
const commentsRoutes =  require( ' ./routes/comments' );
const app = express();
app.use (bodyParser .json());
app.use (cors ());
app.use ( '/api/auth' , authRoutes);
app.use ( '/api/posts' , postsRoutes);
app.use ( '/api/comments' , commentsRoutes);
app.get( '/health' ,  (req ,res )=>  res .json({ ok : true  }));
const PORT = process .env .PORT  || 5000 ;
sequelize.sync() .then(()=>{
app.listen(PORT ,  ()=> console.log( 'Server listening on' , PORT));
});
