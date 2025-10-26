import React ,  { useState , useEffect  } from  'react' ;
import  { fetchPost , addComment  } from  ' . ./api' ;
export default function PostView({ id , token , user , onBack  }){
const  [post , setPost] = useState(null);
const  [comment , setComment] = useState( '' );
useEffect(()=>{
fetchPost(id) .then(setPost) .catch(err=>console.error (err ));
},[id]);
if  ( !post)  return <div className="container">Loading ...< /div>;
async function submitComment(){
try{
await addComment(id , comment , token);
const updated = await fetchPost(id);
setPost(updated);
setComment( '' );
}catch(err ){
alert(err .error  ||  'Failed' );
}
}
return  (
<div className="container">
<button onClick={onBack}>Back</button>
<h2>{post.title}< /h2>
<small>by  {post.author?post.author.name : 'Unknown'}< /small>
<div style={{marginTop :12}} dangerouslySetInnerHTML={{___html :
post.body.replace(/\n/g , '<br/>' )}}  />
<h4>Comments</h4>
{post.comments && post.comments.map(c=>  (
<div  key={c .id} style={{borderTop : '1px solid #eee' , padding : '8px 0'}}>
<small>{c .author?c .author.name : 'Anon'}< /small>
<p style={{margin :4}}>{c .body}</p>
< /div>
))}
{token ?  (
<div>
<textarea value={comment} onChange={e=>setComment(e .target.value)}
placeholder="Write a comment"  />
<button onClick={submitComment}>Submit</button>
< /div>
)  :  (
<p>Login to comment.</p>
)}
< /div>
);
}
