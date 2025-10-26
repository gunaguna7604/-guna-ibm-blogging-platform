import React from  'react' ;
export default function PostList({ posts , onOpen  }){
return  (
<div className="container">
{posts.map(p=>  (
<div  key={p.id} className="post">
<h3 style={{margin :0}}>{p.title}< /h3>
<small>by  {p .author? p .author.name  :  'Unknown'}< /small>
<p>{p.body.substring(0 ,200)}{p.body.length>200? ' . . . ' : ''}< /p>
<button onClick={()=>onOpen(p.id)}>Read</button>
< /div>
))}
< /div>
);
}
