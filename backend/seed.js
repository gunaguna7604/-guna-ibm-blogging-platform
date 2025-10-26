require( 'dotenv' ).config();
const bcrypt =  require( 'bcrypt' );
const  { sequelize , User , Post , Comment  } =  require( ' ./models' );
async function seed(){
await sequelize.sync({ force : true  });
const hash = await bcrypt.hash( 'AdminPass123' ,  10);
const admin = await User .create({ name :  'Admin' , email :  'admin@example.com' ,
passwordHash : hash ,  role :  'admin'  });
const uh = await bcrypt.hash( 'Password123' ,  10);
const user = await User .create({ name :  'Demo User' , email :
'user@example.com' , passwordHash : uh  });
const p1 = await Post .create({ title :  'Welcome to the Blog' , body :  'This is
the first post. ' , tags :  'welcome,intro' , authorId : admin.id  });
const p2 = await Post .create({ title :  'Second Post' , body :  'Another post for
testing. ' , tags :  'test' , authorId : user .id  });
await Comment .create({ body :  'Nice post!' , postId : p1 .id , authorId :
user .id  });
console.log( 'Seed complete' );
process.exit(0);
}
seed();
