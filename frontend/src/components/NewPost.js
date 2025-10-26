import React ,  { useState  } from  'react' ;
import  { createPost  } from  ' . ./api' ;
export default function NewPost({ token , onCreated , onCancel  }){
const  [title ,setTitle]=useState( '' );
const  [body ,setBody]=useState( '' );
const  [tags ,setTags]=useState( '' );
async function submit(){
try{
await createPost({ title , body , tags  }, token);
onCreated();
}catch(err ){
alert(err .error  ||  'Failed' );
}
}
return  (
<div className="container">
<h3>New Post</h3>
<input placeholder="Title" value={title}
onChange={e=>setTitle(e .target.value)}  />
<textarea placeholder="Body" value={body}
onChange={e=>setBody(e .target.value)}  rows={8}  />
<input placeholder="tags  (comma separated)" value={tags}
onChange={e=>setTags(e .target.value)}  />
<button onClick={submit}>Publish</button>
<button onClick={onCancel} style={{marginLeft :8}}>Cancel</button>
< /div>
);
}
