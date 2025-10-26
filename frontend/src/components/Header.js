import React from  'react' ;
export default function Header({ user , onLogout , onShowNew  }){
return  (
<div className="header container">
<div>
<strong>Blogging Platform</strong>
< /div>
<div>
{user ?  (
<>
<span>Hi ,  {user .name}< /span>
<button onClick={onShowNew} style={{marginLeft :8}}>New Post</button>
<button onClick={onLogout} style={{marginLeft :8}}>Logout</button>
< />
)  :  (
<>
<a href="#login">Login</a>
< />
)}
< /div>
< /div>
);
}
