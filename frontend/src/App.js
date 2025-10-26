import React ,  { useState , useEffect  } from  'react' ;
import Header from  ' ./components/Header' ;
import PostList from  ' ./components/PostList' ;
import PostView from  ' ./components/PostView' ;
import NewPost from  ' ./components/NewPost' ;
import * as api from  ' ./api' ;
function App(){
const  [posts , setPosts] = useState([]);
const  [viewId , setViewId] = useState(null);
const  [showNew , setShowNew] = useState(false);
const  [token , setToken] = useState(localStorage .getItem( 'token' ));
const  [user , setUser] = useState(JSON .parse(localStorage .getItem( 'user' )  ||
'null' ));
async function load(){
try{
const data = await api.fetchPosts();
setPosts(data);
}catch(err ){ console.error (err );  }
}
useEffect(()=>{ load();  },  []);
async function handleLogin(){
const email = prompt( 'Email  (admin@example.com or user@example.com)' );
const pass = prompt( 'Password  (AdminPass123 or Password123)' );
try{
const  res = await api.login(email , pass);
setToken(res .token);
setUser(res .user );
localStorage .setItem( 'token' ,  res .token);
localStorage .setItem( 'user' , JSON .stringify(res .user ));
load();
}catch(err ){ alert(err .error  ||  'Login failed' );  }
}
function handleLogout(){
setToken(null); setUser(null); localStorage .removeItem( 'token' );
localStorage .removeItem( 'user' );
}
return  (
<div>
<Header user={user} onLogout={handleLogout} onShowNew={()=>
setShowNew(true)}  />
{ !token && <div className="container"><button onClick={handleLogin}
>Login< /button></div>}
{showNew ?  (
<NewPost token={token} onCreated={()=>{ setShowNew(false); load();  }}
onCancel={()=> setShowNew(false)}  />
)  : viewId ?  (
<PostView id={viewId} token={token} user={user} onBack={()=>
setViewId(null)}  />
)  :  (
<PostList posts={posts} onOpen={id=> setViewId(id)}  />
)}
< /div>
);
}
export default App;
