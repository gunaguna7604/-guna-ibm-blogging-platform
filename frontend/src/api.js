const API =  (process.env .REACT_APP_API_URL) ? process .env .REACT_APP_API_URL  :
'http://localhost:5000 ';
async function  request(path ,  { method= 'GET' , body , token  } =  {}){
const headers =  {  'Content-Type' :  'application/json'  };
if  (token) headers[ 'Authorization' ] =  'Bearer  ' + token ;
const  res = await fetch(API + path ,  { method , headers , body : body?
JSON .stringify(body) : undefined  });
const data = await  res .json();
if  ( !res .ok) throw data ;
return data ;
}
export async function  register(name ,email ,password){
return  request( '/api/auth/register' ,  { method :  'POST' , body :  {
name ,email ,password  }  });
}
export async function login(email ,password){
return  request( '/api/auth/login' ,  { method :  'POST' , body :  {
email ,password  }  });
}
export async function fetchPosts(){
return  request( '/api/posts' );
}
export async function fetchPost(id){
return  request( '/api/posts/' + id);
}
export async function createPost({ title , body , tags  }, token){
return  request( '/api/posts' ,  { method :  'POST' , body :  { title , body , tags  },
token  });
}
export async function addComment(postId , body , token){
return  request( '/api/comments/' + postId ,  { method :  'POST' , body :  { body  },
token  });
}
