var express = require('express');
var app = express();
// var http = require("http").Server(app);

// let server = http.listen(3000, function () {
//     let host = server.address().address;
//     let port = server.address().port;
//     console.log("My First Nodejs Server!");
//     console.log("Server listening on: "+ host + " port:" + port);
//});

// var bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors());

// app.use (bodyParser.json());

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const path = require('path');


app.use(express.static(__dirname + "../dist/week4/"));

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

let ksu = {username : 'k@s', pwd: '1', userid: '1', userbirthdate: '1900', userage: '122'};
let Ntl = {username : 'n@t', pwd: '2', userid: '2' , userbirthdate: '', userage: ''};
let Abn = {username : 'a@b', pwd: '3', userid: '3', userbirthdate: '', userage: ''};

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

app.listen(3000,()=>{
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log("server has been started at : "+n+":"+m);
});






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