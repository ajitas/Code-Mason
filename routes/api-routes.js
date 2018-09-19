/**************************Ajita*******************************/
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

 //get userID by their email
app.get("/user/:email", function(req, res) {
    db.User.findOne({
        attributes :['id'],
       where:
       {
           email:req.params.email
       }
    }).then(function(data){
        console.log(data);
        res.json(data);
    });
});   

 //get user name by their ID
 app.get("/user/name/:userID", function(req, res) {
    db.User.findOne({
        attributes :['name'],
       where:
       {
           id:req.params.userID
       }
    }).then(function(data){
        console.log(data);
        res.json(data);
    });
}); 

//get top 10 codes with maximum likes
app.get("/top10", function(req, res) {
    db.Code.findAll({
        order: [['likes', 'DESC']],
        limit: 10
    }).then(function(data){
        console.log(data);
        res.json(data);
    });
});

//get a particular code
app.get("/codes/code/:codeID", function(req,res){
    db.Code.findOne({
        where: {
            id:req.params.codeID
        }
    }).then(function(data){
        console.log(data.text);
        res.json(data);
    });
});

//get all comments of a particular code
app.get("/comments/code/:codeID", function(req,res){
    db.Comment.findAll({
        where: {
            CodeId:req.params.codeID
        }
    }).then(function(data){
        res.json(data);
    });
});

//get all languages of a particular user
app.get("/languages/user/:userID", function(req,res){
    db.Code.findAll({
        attributes :[[db.Sequelize.fn('DISTINCT', db.Sequelize.col('language')) ,'language']],
        where: {
            UserId:req.params.userID
        }
    }).then(function(data){
        res.json(data);
    });
});

//get all languages of all users
app.get("/languages", function(req,res){
    db.Code.findAll({
        attributes :[[db.Sequelize.fn('DISTINCT', db.Sequelize.col('language')) ,'language']],
        where:{
            public:true
        }
    }).then(function(data){
        res.json(data);
    });
});

//get all codes of a particular user
app.get("/codes/user/:userID", function(req,res){
    db.Code.findAll({
        where: {
            UserId:req.params.userID
        }
    }).then(function(data){
        res.json(data);
    });
});

//get 5 recent modified codes of a particular user
app.get("/codes/latest/user/:userID", function(req,res){
    db.Code.findAll({
        where: {
            UserId:req.params.userID
        },
        order: [['updatedAt', 'DESC']],
        limit: 5
    }).then(function(data){
        res.json(data);
    });
});

//get 5 most liked codes of a particular user
app.get("/codes/liked/user/:userID", function(req,res){
    db.Code.findAll({
        where: {
            UserId:req.params.userID
        },
        order: [['likes', 'DESC']],
        limit: 5
    }).then(function(data){
        res.json(data);
    });
});

//get total likes for a particular code
app.get("/codes/likes/:codeID", function(req,res){
    db.Code.findOne({
        attributes:['likes'],
        where: {
            CodeId:req.params.codeID
        }
    }).then(function(data){
        res.json(data);
    });
});

//get all the codes that a user has liked
app.get("/codes/likes/user/:userID", function(req,res){
    db.Code.findAll({
        include :[{
                model: db.Like,
                as: 'Likes'
        }],
        where :
                {
                    '$Likes.UserId$': req.params.userID
                }
    }).then(function(data){
        res.json(data);
    });
});

//get all codes that have a particular keyword in its tag or title
app.get("/search/codes/word/:keyword", function(req,res){
    db.Code.findAll({
        include : [{
            model: db.Tag,
            as :'Tags'
        }],
        where: {
            public : true,
            $or: [
                {title : 
                                {
                                    $like: '%'+req.params.keyword+'%'
                                }
                },
                {'$Tags.tagname$' :
                                 {
                                    $like: '%'+req.params.keyword+'%'
                                 }
                }
            ]
        }
    }).then(function(data){
        res.json(data);
    })
});

//get a user's codes that have a particular keyword in its tag or its title
app.get("/search/codes/user/:userID/word/:keyword", function(req,res){
    db.Code.findAll({
        where: {
            UserId:req.params.userID,
            $or: [
                {title : 
                                {
                                    $like: '%'+req.params.keyword+'%'
                                }
                },
                {'$Tags.tagname$' :
                                {
                                    $like: '%'+req.params.keyword+'%'
                                }
                }
            ]
        },
        include : [{
            model: db.Tag,
            as :'Tags'
        }]
    }).then(function(data){
        res.json(data);
    })
}); 

//get all codes for a particular language
app.get("/search/codes/language/:language", function(req,res){
    db.Code.findAll({
        where :
        {
            public : true,
            language: req.params.language
        }
    }).then(function(data){
        res.json(data);
    });
});

//get all codes for a particular language for a particular user
app.get("/search/codes/language/:language/user/:userID", function(req,res){
    db.Code.findAll({
        where :
        {
            language: req.params.language,
            userID : req.params.userID
        }
    }).then(function(data){
        res.json(data);
    });
});

//add new comment
app.post("/comments", function(req,res){
    db.Comment.create({
        text: req.body.text,
        CodeId: req.body.codeID,
        UserId: req.body.userID
    }).then(function(data){
        res.json({ id: data.insertId });
    });
});

//add new code
app.post("/codes", function(req,res){
    db.Code.create({
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        public: req.body.public,
        likes: req.body.likes,
        language:req.body.language,
        UserId: req.body.userID
    }).then(function(data){
        res.json({ id: data.insertId });
    });
});

//add new tag
app.post("/tags", function(req,res){
    db.Tag.create({
        tagname: req.body.tagname,
        CodeId : req.body.codeID
    }).then(function(data){
        res.json({ id: data.insertId });
    })
});

//add new like
app.post("/likes", function(req,res){
    db.Like.create({
        UserId: req.body.userID,
        CodeId : req.body.codeID
    }).then(function(data){
        res.json({ id: data.insertId });
    })
});

//add new user
app.post("/users", function(req,res){
    db.User.create({
        name: req.body.name,
        email: req.body.email
    }).then(function(data){
        res.json({ id: data.insertId });
    })
});

//update a code
app.put("/codes/code/:codeID", function(req, res) {
    db.Code.update({
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        public: req.body.public,
        language:req.body.language,
    },{
      where:
      {
        id:req.params.codeID
      }
    }).then(function(data){
      if (data.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

//updates the number of likes for a code
app.put("/code/likes/:codeID", function(req, res) {
    db.Code.update({
        likes: req.body.likes,
    },{
      where:
      {
        id:req.params.codeID
      }
    }).then(function(data){
      if (data.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

//lets user delete his code 
app.delete("/codes/code/:codeID", function(req,res){
    db.Code.destroy({
        where:
        {
          id:req.params.codeID
        }
      }).then(function(data){
        if (data.affectedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      });
});

//deletes all tags related to a code
app.delete("/tags/code/:CodeID", function(req,res){
    db.Tag.destroy({
        where:{
            CodeId : req.params.codeID
        }
    }).then(function(data){
        res.json({ id: data.insertId });
    })
});
};










/**************************Ajita*******************************/

/**************************Taylor*******************************/










/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/