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
        var hbsObject = {
            codes: data
        };
        res.json(hbsObject);
    });
});

//get all comments of a particular code
app.get("/comments/:codeID", function(req,res){
    db.Comment.finalAll({
        where: {
            CodeId:req.params.codeID
        }
    }).then(function(data){
        var hbsObject = {
            comments: data
        };
        res.json(hbsObject);
    });
});

//get a particular code
app.get("/codes/:codeID", function(req,res){
    db.Code.findOne({
        where: {
            CodeId:req.params.codeID
        }
    }).then(function(data){
        var hbsObject = {
            code: data
        };
        res.json(hbsObject);
    });
});

//get all codes of a particular user
app.get("/codes/:userID", function(req,res){
    db.Code.findAll({
        where: {
            UserId:req.params.userID
        }
    }).then(function(data){
        var hbsObject = {
            codes: data
        };
        res.json(hbsObject);
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
        var hbsObject = {
            codes: data
        };
        res.json(hbsObject);
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
        var hbsObject = {
            codes: data
        };
        res.json(hbsObject);
    });
});

//get a user's codes that have a particular keyword in its tag
app.get("/search/codes/:keyword/:userID", function(req,res){
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
        var hbsObject = {
            codes: data
        };
        res.json(hbsObject);
    });
}); 
};










/**************************Ajita*******************************/

/**************************Taylor*******************************/










/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/