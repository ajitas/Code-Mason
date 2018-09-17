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

//get top 10 codes with maximum likes
app.get("/", function(req, res) {
    db.Code.findAll({
        order: [['likes', 'DESC']],
        limit: 10
    }).then(function(data){
        var resObj = {
            codes: data
        };
        res.json(resObj);
    });
});

//get all comments of a particular code
app.get("/comments/:codeID", function(req,res){
    db.Comment.finalAll({
        where: {
            CodeId:req.params.codeID
        }
    }).then(function(data){
        var resObj = {
            comments: data
        };
        res.json(resObj);
    });
});

//get a particular code
app.get("/codes/:codeID", function(req,res){
    db.Code.findOne({
        where: {
            CodeId:req.params.codeID
        }
    }).then(function(data){
        var resObj = {
            code: data
        };
        res.json(resObj);
    });
});

//get all codes of a particular user
app.get("/codes/:userID", function(req,res){
    db.Code.findAll({
        where: {
            UserId:req.params.userID
        }
    }).then(function(data){
        var resObj = {
            codes: data
        };
        res.json(resObj);
    });
});

//get 5 recent modified codes of a particular user
app.get("/codes/:userID", function(req,res){
    db.Code.findAll({
        where: {
            UserId:req.params.userID
        },
        order: [['updatedAt', 'DESC']],
        limit: 5
    }).then(function(data){
        var resObj = {
            codes: data
        };
        res.json(resObj);
    });
});

//get all codes that have a particular :tag in its tag
app.get("/search/codes/:tag", function(req,res){
    db.Code.findAll({
        include : [{
            model: db.Tag,
            where: {
              tagname: req.params.tag
            }
        }]
    }).then(function(data){
        var resObj = {
            codes: data
        };
        res.json(resObj);
    });
});

//get all codes for a particular language
app.get("/search/codes/:language", function(req,res){
    db.Code.findAll({
        where :
        {
            language: req.params.language
        }
    }).then(function(data){
        var resObj = {
            codes: data
        };
        res.json(resObj);
    });
});

//get all codes for a particular language for a particular user
app.get("/search/codes/:language/:userID", function(req,res){
    db.Code.findAll({
        where :
        {
            language: req.params.language,
            userID : req.params.userID
        }
    }).then(function(data){
        var resObj = {
            codes: data
        };
        res.json(resObj);
    });
});

//get a user's codes that have a particular keyword in its tag
app.get("/search/codes/:tag/:userID", function(req,res){
    db.Code.findAll({
        include : [{
            model: db.Tag,
            where: {
              tagname: req.params.tag
            }
        }],
        where :
        {
            id:req.params.userID
        }
    }).then(function(data){
        var resObj = {
            codes: data
        };
        res.json(resObj);
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
        name: req.body.name,
        text: req.body.text,
        public: req.body.public,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
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

//add new user
app.post("/users", function(req,res){
    db.User.create({
        name: req.body.name,
        email: req.body.email
    }).then(function(data){
        res.json({ id: data.insertId });
    })
});

//lets user update his code
app.put("/codes/:codeID", function(req, res) {
    db.Code.update({
        name: req.body.name,
        text: req.body.text,
        public: req.body.public,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
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

//lets user delete his code 
app.delete("/codes/:codeID", function(req,res){
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
}) 

//deletes all tags related to a code
app.delete("/tags/:CodeID", function(req,res){
    db.Tag.destroy({
        CodeId : req.params.codeID
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