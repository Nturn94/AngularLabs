var express = require('express');
var app = express();
// var bodyParser = require("body-parser");
var mongo = require("mongoose");


var cors = require('cors');



const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
})
const sockets = require('./socket.js');
const server = require('./listen.js');
const PORT = 3000;
app.use(cors());
sockets.connect(io, PORT);
server.listen(http, PORT);


app.use(express.urlencoded({extended: true}));
app.use(express.json())

var db = mongo.connect("mongodb://localhost:27017/assignment", function(err, response){
    if(err){ console.log(err);}
    else{
        console.log('connected to ' + db, ' + ', response);
    }
});

var Schema = mongo.Schema;
var UsersSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    Rank: {type: String, required: true},
    Moderator: {type: Array},
},{versionKey: false});

var Schema = mongo.Schema;
var ChannelsSchema = new Schema({
    channelname: {type: String, required: true},
    GroupID: {type: Number, required: true},
},{versionKey: false});

var Schema = mongo.Schema;
var GroupsSchema = new Schema({
    GroupName: {type: String, required: true},
    GroupID: {type: Number, required: true},
},{versionKey: false});
    
var model = mongo.model('users', UsersSchema, 'users');
var channelmodel = mongo.model('channels', ChannelsSchema, 'channels');
var groupmodel = mongo.model('groups', GroupsSchema, 'groups');

const path = require('path');
const { SystemJsNgModuleLoader } = require('@angular/core');
const { stringify } = require('querystring');
const { addAbortSignal } = require('stream');


app.use(express.static(__dirname + "../dist/week4/"));

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

app.post("/api/SaveUser", async function(req,res){
    if(req.body.email){
        let doc = await model.findOne({ email: req.body.email });
        if(doc){
            await model.findOneAndUpdate({email: req.body.email}, { email: req.body.email, password: req.body.password, Rank: req.body.Rank });
            model.find().then(data => {
                res.send(data);
            });
        }else{

            var mod = new model(req.body);
             mod.save((err, mod) =>{
                if(err) {
                    res.send(err);
                }
                else {
                }
            });
            model.find().then(data => {
                res.status(200).send(data);
            });
            
        }
    }

});


app.post("/api/deleteUser", async function(req, res){
    model.findOneAndDelete({email: req.body.email}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            model.find().then(data => {
                res.send(data);
            });
        }
        });
})

app.get("/api/getusers", function(req, res){

    model.find().then(data => {
        res.send(data);
    });
});


// module.exports = app.listen(3000);


app.post("/api/SaveGroup", async function(req,res){
    if(req.body.GroupName){
        let doc = await groupmodel.findOne({ GroupName: req.body.GroupName });
        if(doc){
            await groupmodel.findOneAndUpdate({GroupName: req.body.GroupName}, { GroupName: req.body.GroupName, GroupID: req.body.GroupID});
            groupmodel.find().then(data => {
                res.send(data);
            });
        }else{

            var mod = new groupmodel(req.body);
             mod.save((err, mod) =>{
                if(err) {
                    res.send(err);
                }
                else {
                }
            });
            groupmodel.find().then(data => {
                res.status(200).send(data);
            });
            
        }
    }

});
app.post("/api/deleteGroup", async function(req, res){
    groupmodel.findOneAndDelete({GroupName: req.body.GroupName}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            groupmodel.find().then(data => {
                res.send(data);
            });
        }
        });
})

app.get("/api/getGroup", function(req, res){

    groupmodel.find().then(data => {
        res.send(data);
    });
});

// #####################################################################

app.post("/api/SaveChannel", async function(req,res){
    if(req.body.GroupName){
        let doc = await channelmodel.findOne({ channelname: req.body.channelname });
        if(doc){
            await channelmodel.findOneAndUpdate({channelname: req.body.channelname}, { GroupName: req.body.channelname, GroupID: req.body.GroupID});
            channelmodel.find().then(data => {
                res.send(data);
            });
        }else{

            var mod = new channelmodel(req.body);
             mod.save((err, mod) =>{
                if(err) {
                    res.send(err);
                }
                else {
                }
            });
            channelmodel.find().then(data => {
                res.status(200).send(data);
            });
            
        }
    }

});
app.post("/api/deleteChannel", async function(req, res){
    channelmodel.findOneAndDelete({email: req.body.GroupName}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            channelmodel.find().then(data => {
                res.send(data);
            });
        }
        });
})

app.get("/api/getChannel", function(req, res){

    channelmodel.find().then(data => {
        res.send(data);
    });
});

app.post('/api/user/login', async (req, res) => {
    let doc = await model.findOne({ email: req.body.email }).lean();
    console.log(doc.Rank);
    if (doc.email === req.body.email && doc.password === req.body.password){
        return res.status(200).json({
            status: 'success',
            data: doc
        })
    }else{
        return res.status(200).json({
            status: 'fail',
            message: 'Login Failed'
        })
    }
})


app.get("/", function (req, res) {
    res.sendFile(__dirname + "../dist/week4/");
    });


