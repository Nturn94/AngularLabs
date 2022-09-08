var express = require('express');
var app = express();
// var bodyParser = require("body-parser");


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
// app.use(bodyParser.json());

const path = require('path');
const { SystemJsNgModuleLoader } = require('@angular/core');
const { stringify } = require('querystring');


app.use(express.static(__dirname + "../dist/week4/"));

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

let ksu = {username : 'k@s', pwd: '1', userid: '1', userbirthdate: '1900', userage: '122', groups: ["groupa"], adminstatus: "yes", GroupAssis: ["groupa", "groupb", "groupc"], channels: ["channel1"]};
let Ntl = {username : 'n@t', pwd: '2', userid: '2' , userbirthdate: '', userage: '', groups: ["groupa"], adminstatus: "no", GroupAssis: ["groupa"], channels: ["channel1"]};
let Abn = {username : 'a@b', pwd: '3', userid: '3', userbirthdate: '', userage: '', groups: ["groupa", "groupc"], adminstatus: "no", GroupAssis: ["groupa"], channels: ["channel1"]};

const groups = new Array ("groupa", "groupb", "groupc");
let users = [ksu, Ntl, Abn];
let newusers = [];
const channels = new Array ("channel1", "channel2", "channel3");
app.post('/ping', function (req, res) {
    console.log("hello", req.body)
    state = false;
    authcheck = false;

    if(isHeroEqual(ksu, req.body)===true){
        Sendinfo(isHeroEqual(ksu, req.body), ksu);
    }else if(isHeroEqual(Ntl, req.body)===true){
        Sendinfo(isHeroEqual(Ntl, req.body), Ntl);
    }else if(isHeroEqual(Abn, req.body)===true){
        Sendinfo(isHeroEqual(Abn, req.body), Abn);
    }else{
        Sendinfo(false);
    }
    

    function isHeroEqual(object1, object2) {
        if(object1.username === object2.username && object1.pwd === object2.pwd){
            authcheck = true;
            return(authcheck);
        }else{
            authcheck = false;
            return(authcheck);
        }
      }
    
    function Sendinfo(authchecker, object1){
        if (authchecker=== true){
            state = true;
            res.send(object1);
            console.log("This is two: ", object1);
            console.log(state);
        }else{
            state = false;
            res.send(state);
        }
    }

  })

app.post('/newgroup', async (req, res) =>{
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    this.groups = JSON.stringify(this.groups);
    this.groups += data;
    console.log(this.groups);

});
app.post('/newuser', async (req, res) =>{
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    let index = this.newusers.indexOf(data);
    if(index===-1){
        this.newusers = JSON.stringify(this.newusers);
        this.newusers += data;
        console.log(this.newusers);

    }else{
        console.log("User already exists");
    }

});
app.post('/deluser', async (req, res) =>{
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    let index = this.newusers.indexOf(data);
    newusers = newusers.replaceAt(index, '');
    console.log(this.newusers);
});
app.post('/delgroup', async (req, res) =>{
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    let index = this.groups.indexOf(data);
    groups = groups.replaceAt(index, '');
    console.log(this.groups);
});

app.get("/rtv", function (req, res) {
    res.status(200).json({groups: groups, users: users, channels: channels });
});

app.post('/assign', async (req, res) =>{

    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }
  
    const data = Buffer.concat(buffers).toString();
    console.log(data);
    const myArray = data.split(" ");

    if(CheckEqual(ksu, myArray[1])===true){
        if (this.ksu.groups.indexOf(myArray[0])===-1){
            this.ksu.groups.push(myArray[0]);
            console.log("User added to group!");
        }
    }else if(CheckEqual(Ntl, myArray[1])===true){
        if (this.Ntl.groups.indexOf(myArray[0])===-1){
            this.Ntl.groups.push(myArray[0]);
            console.log("User added to group!");
        }
    }else if(CheckEqual(Abn, myArray[1])===true){
        if (this.Abn.groups.indexOf(myArray[0])===-1){
            this.Abn.groups.push(myArray[0]);
            console.log("User added to group!");
        }

    }

    function CheckEqual(object1, object2) {
        if(object1.username === object2){
            authcheck = true;
            return(authcheck);
        }
    }



});
app.post('/assignchannel', async (req, res) =>{

    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }
  
    const data = Buffer.concat(buffers).toString();
    console.log(data);
    const myArray = data.split(" ");

    if(CheckEqual(ksu, myArray[1])===true){
        if (this.ksu.channels.indexOf(myArray[0])===-1){
            this.ksu.channels.push(myArray[0]);
            console.log("User added to channel!");
        }
    }else if(CheckEqual(Ntl, myArray[1])===true){
        if (this.Ntl.channels.indexOf(myArray[0])===-1){
            this.Ntl.channels.push(myArray[0]);
            console.log("User added to channel!");
        }
    }else if(CheckEqual(Abn, myArray[1])===true){
        if (this.Abn.channels.indexOf(myArray[0])===-1){
            this.Abn.channels.push(myArray[0]);
            console.log("User added to channel!");
        }

    }

    function CheckEqual(object1, object2) {
        if(object1.username === object2){
            authcheck = true;
            return(authcheck);
        }
    }



});
app.post('/newchannel', async (req, res) =>{
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    let index = this.channels.indexOf(data);
    if(index===-1){
        this.channels = JSON.stringify(this.channels);
        this.channels += data;
        console.log(this.channels);

    }else{
        console.log("User already exists");
    }

});
app.post('/delchannel', async (req, res) =>{
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    let index = this.channels.indexOf(data);
    channels = channels.replaceAt(index, '');
    console.log(this.channels);
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "../dist/week4/");
    });


