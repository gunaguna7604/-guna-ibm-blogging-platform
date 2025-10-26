const express =  require( 'express' );
const bcrypt =  require( 'bcrypt' );
const jwt =  require( 'jsonwebtoken' );
const  { User  } =  require( ' . ./models' );
const  router = express.Router();
const JWT_SECRET = process .env .JWT_SECRET  ||  'secret_in_dev' ;
router.post( '/register' , async  (req ,  res ) =>  {
const  { name , email , password  } =  req.body ;
if  ( !name  ||  !email  ||  !password)  return  res .status(400).json({ error :
'Missing fields'  });
try  {
const hash = await bcrypt.hash(password ,  10);
const user = await User .create({ name , email , passwordHash : hash  });
return  res .json({ id : user .id , name : user .name , email : user .email  });
} catch  (err )  {
console.error (err );
return  res .status(400).json({ error :  'Email already in use'  });
}
});
router.post( '/login' , async  (req ,  res ) =>  {
const  { email , password  } =  req.body ;
if  ( !email  ||  !password)  return  res .status(400).json({ error :  'Missing
fields'  });
const user = await User .findOne({ where :  { email  }  });
if  ( !user )  return  res .status(401).json({ error :  'Invalid credentials'  });
const ok = await bcrypt.compare(password , user .passwordHash);
if  ( !ok)  return  res .status(401).json({ error :  'Invalid credentials'  });
const token = jwt.sign({ id : user .id , email : user .email  }, JWT_SECRET ,  {
expiresIn :  '7d'  });
return  res .json({ token , user :  { id : user .id , name : user .name , email :
user .email  }  });
});
module.exports =  router ;
