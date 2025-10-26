const  { Sequelize , DataTypes  } =  require( 'sequelize' );
const path =  require( 'path' );
const sequelize = new Sequelize({
dialect :  'sqlite' ,
storage : path.join(___dirname ,  'database.sqlite' ),
  logging : false ,
});
const User = sequelize.define( 'User' ,  {
id :  { type : DataTypes .INTEGER , primaryKey : true , autoIncrement : true  },
name :  { type : DataTypes .STRING , allowNull : false  },
email :  { type : DataTypes .STRING , allowNull : false , unique : true  },
passwordHash :  { type : DataTypes .STRING , allowNull : false  },
role :  { type : DataTypes .STRING , defaultValue :  'user'  },
});
const Post = sequelize.define( 'Post' ,  {
id :  { type : DataTypes .INTEGER , primaryKey : true , autoIncrement : true  },
title :  { type : DataTypes .STRING , allowNull : false  },
body :  { type : DataTypes .TEXT , allowNull : false  },
tags :  { type : DataTypes .STRING  },
});
const Comment = sequelize.define( 'Comment' ,  {
id :  { type : DataTypes .INTEGER , primaryKey : true , autoIncrement : true  },
body :  { type : DataTypes .TEXT , allowNull : false  },
approved :  { type : DataTypes .BOOLEAN , defaultValue : true  },
});
User .hasMany(Post ,  { as :  'posts' , foreignKey :  'authorId'  });
Post .belongsTo(User ,  { as :  'author' , foreignKey :  'authorId'  });
Post .hasMany(Comment ,  { as :  'comments' , foreignKey :  'postId'  });
Comment .belongsTo(Post ,  { as :  'post' , foreignKey :  'postId'  });
Comment .belongsTo(User ,  { as :  'author' , foreignKey :  'authorId'  });
module.exports =  { sequelize , User , Post , Comment  };

