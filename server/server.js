var express = require('express');
var app = express();
// var bodyParser = require("body-parser");
var mongo = require("mongoose");
// const bp = require('body-parser')
// app.use(bp.json())
// app.use(bp.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

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
    Moderator: [{
        type: String
    }],
    groupmember: [{
        type: String
    }],
    channelmember: [{
        type: String
    }],
},{versionKey: false});

var Schema = mongo.Schema;
var ChannelsSchema = new Schema({
    channelname: {type: String, required: true},
    GroupName: {type: String, required: true},
},{versionKey: false});

var Schema = mongo.Schema;
var GroupsSchema = new Schema({
    GroupName: {type: String, required: true},
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

    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const myarray = Buffer.concat(buffers).toString();
    
    someText = myarray.replace(/(\r\n|\n|\r|"|{|})/gm, "").trim();
    const data = someText.split(" ");
    // res.send(data);

    // res.status(200).send(myarray);
    if(data){
        let doc = await model.findOne({ email: data[0] });
        if(doc){
            await model.findOneAndUpdate({email: data[0]}, { email: data[0], password: data[1], Rank: data[2] });
            model.find().then(data => {
                res.send(data);
            });
        }else{

            var mod = new model( {email: data[0], password: data[1], Rank: data[2]});
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

    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const myarray = (Buffer.concat(buffers).toString());
    someText = myarray.replace(/(\r\n|\n|\r|"|{|}|\\)/gm, "").trim();
    console.log(someText);

    const doc = model.findOne({ email: someText }, function(err,obj) { console.log(obj); });
    if(doc){
        model.findOneAndRemove({ email: someText }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          });
    
        await model.find().then(data => {
            res.send(data);
        });
    }
})

app.get("/api/getusers", function(req, res){

    model.find().then(data => {
        res.send(data);
    });
});


// module.exports = app.listen(3000);


app.post("/api/SaveGroup", async function(req,res){

    const buffers = [];
    // const grouparray = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const myarray = Buffer.concat(buffers).toString();
    data = myarray.replace(/(\r\n|\n|\r|"|{|}|\\)/gm, "").trim();

    // console.log(data);
    // res.send(data);
    const grouparray = [];

    if(data){
        let doc = await groupmodel.findOne({ GroupName: data });
        if(doc){
            await groupmodel.findOneAndUpdate({GroupName: data}, { GroupName: data});
            groupmodel.find().then(data => {
                for(var i = 0; i < data.length; i++) {
                    grouparray.push(data[i].GroupName);
                  }
                res.status(200).send(grouparray);
            });
        }else{

            var mod = new groupmodel({GroupName: data});
             mod.save((err, mod) =>{
                if(err) {
                    res.send(err);
                }
                else {
                }
            });
            
            groupmodel.find().then(data => {
                for(var i = 0; i < data.length; i++) {
                    grouparray.push(data[i].GroupName);
                  }
                res.status(200).send(grouparray);
            });
            
        }
    }

});
app.post("/api/deleteGroup", async function(req, res){

    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const myarray = (Buffer.concat(buffers).toString());
    someText = myarray.replace(/(\r\n|\n|\r|"|{|}|\\)/gm, "").trim();
    console.log(someText);
    groupmodel.findOneAndDelete({GroupName: someText}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            groupmodel.find().then(data => {
                res.send(data);
            });
        }
        });
});

app.get("/api/getGroup", function(req, res){

    groupmodel.find().then(data => {
        res.send(data);
    });
});

// #####################################################################

app.post("/api/SaveChannel", async function(req,res){
    const buffers = [];
    // const grouparray = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const myarray = Buffer.concat(buffers).toString();
    someText = myarray.replace(/(\r\n|\n|\r|"|{|}|\\)/gm, "").trim();
    const data = someText.split(" ");

    // console.log(data);
    // res.send(data);
    const channelarray = [];

    if(data){
        let doc = await channelmodel.findOne({ channelname: data });
        if(doc){
            await channelmodel.findOneAndUpdate({channelname: data}, { channelname: data[0], GroupName: data[1]});
            channelmodel.find().then(data => {
                for(var i = 0; i < data.length; i++) {
                    grouparray.push(data[i].GroupName);
                  }
                res.status(200).send(grouparray);
            });
        }else{

            var mod = new channelmodel({channelname: data, GroupName: data[1]});
             mod.save((err, mod) =>{
                if(err) {
                    res.send(err);
                }
                else {
                }
            });
            
            channelmodel.find().then(data => {
                for(var i = 0; i < data.length; i++) {
                    channelarray.push(data[i].channelname);
                  }
                res.status(200).send(channelarray);
            });
            
        }
    }

});
app.post("/api/deleteChannel", async function(req, res){

        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const myarray = (Buffer.concat(buffers).toString());
        someText = myarray.replace(/(\r\n|\n|\r|"|{|}|\\)/gm, "").trim();
        console.log(someText);
        channelmodel.findOneAndDelete({channelname: someText}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                channelmodel.find().then(data => {
                    res.send(data);
                });
            }
            });
});

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
});


app.get("/rtv", async function (req, res) {
    const userarray = [];
    const grouparray = [];
    const channelarray = [];
    users = await model.find();
    for(var i = 0; i < users.length; i++) {
        userarray.push(users[i].email);
      }
    channels = await channelmodel.find();
    for(var i = 0; i < channels.length; i++) {
        channelarray.push(channels[i].channelname);
      }
    groups = await groupmodel.find();
    for(var i = 0; i < groups.length; i++) {
        grouparray.push(groups[i].GroupName);
      }
    res.status(200).json({groups: grouparray, users: userarray, channels: channelarray});
});


app.post('/assign', async (req, res) =>{
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const myarray = (Buffer.concat(buffers).toString());
    someText = myarray.replace(/(\r\n|\n|\r|"|{|}|\\)/gm, "").trim();
    console.log(someText);
    const myArray = someText.split(" ");


    let result = await model.findOne({ email: myArray[0] });

    if( result.groupmember){
        await model.findOneAndUpdate( {email: myArray[0]},
            {$push: {groupmember: myArray[1] }});

    }else{
        await model.findOneAndUpdate({email: myArray[0]}, {$push: {groupmember: myArray[1] }});

    }

});
app.post('/assignchannel', async (req, res) =>{
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const myarray = (Buffer.concat(buffers).toString());
    someText = myarray.replace(/(\r\n|\n|\r|"|{|}|\\)/gm, "").trim();
    console.log(someText);
    const myArray = someText.split(" ");

    let result = await model.findOne({ email: myArray[0] });

    if( result.channelmember){
        await model.findOneAndUpdate( {email: myArray[0]},
            {$push: {channelmember: myArray[1] }});

    }else{
        await model.findOneAndUpdate({email: myArray[0]}, {$push: {channelmember: myArray[1] }});

    }


});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "../dist/week4/");
    });


