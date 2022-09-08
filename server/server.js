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

const path = require('path');
const { SystemJsNgModuleLoader } = require('@angular/core');


app.use(express.static(__dirname + "../dist/week4/"));

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

let ksu = {username : 'k@s', pwd: '1', userid: '1', userbirthdate: '1900', userage: '122', groups: ["groupa"]};
let Ntl = {username : 'n@t', pwd: '2', userid: '2' , userbirthdate: '', userage: '', groups: ["groupa"]};
let Abn = {username : 'a@b', pwd: '3', userid: '3', userbirthdate: '', userage: '', groups: ["groupa", "groupc"]};

let groups = ["groupa", "groupb", "groupc"];
let users = [ksu, Ntl, Abn];

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
    // console.log("hello", req.body)

    console.log("hello");
    res.status(200).json("data");
    

});

app.get("/rtv", function (req, res) {
    res.status(200).json({groups: groups, users: users });
});

app.post('/assign', async (req, res) =>{
    console.log(req.body);
    const myArray = req.body.split(" ");

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

    //group, user

});


// res.send({data: dataChunk, results: results[1]});

// app.get("/rtv", function (req, res) {
//     res.status(200).json({ status: "UP" });
// });
// _________________________________________________

// app.listen(3000,()=>{
//     var d = new Date();
//     var n = d.getHours();
//     var m = d.getMinutes();
//     console.log("server has been started at : "+n+":"+m);
// });






// app.get("/task2", function (req, res) {
//     res.sendFile(__dirname + "/www/task2.html");
//     });

// app.get("/test", function (req, res) {
//     res.sendFile(__dirname + "/www/test.html");
//     });

app.post('/login', require('./router/postLogin'));
app.post('/loginafter', require('./router/postLoginafter'));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "../dist/week4/");
    });

// app.get("/endpoint", function (req, res) {
//         res.sendFile(__dirname + "/www/endpoint.html");
//         });

app.post('/api/login', function(req, res){

    let users = [{'email' : 'abc@com.au', 'pwd' : '123'}, {'email' : 'abd@com.au', 'pwd' : '123'}, {'email' : 'abe@com.au', 'pwd': '123'}]

    if (!req.body) {
        return res.sendStatus(400)
    }


    var customer = {};
    customer.email = req.body.email;
    customer.upwd = req.body.upwd;
    customer.valid = false;

    for (let i=0; i<users.length;i++){
        if (req.body.email == users[i].email && req.body.upwd == users[i].pwd){
            customer.valid = true;
        }
    }

    // if (req.body.email == "abc@com.au" && req.body.upwd == "123"){
    //     customer.valid = true;
    // }else{
    //     customer.valid = false;
    // }

        
    res.send(customer);

});