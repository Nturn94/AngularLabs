
let fs = require("fs");



// function renderHTML(path, response) {
//     fs.readFile(path, null, function(err, data) {
//         if (err) {
//             response.writeHead(404);
//             response.write("File not found");
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// }


// module.exports = {
//     handleRequest: function (request, response) {
//         response.writeHead(200, {"Content-Type": "text/html"});
//         var path = url.parse(request.url).pathname;
//         if (path == "/") {
//             renderHTML("./index.html", response);
//         } else {
//             response.writeHead(404);
//             response.write("Route not defined");
//             response.end();
//         }
//     }
// }

module.exports = function(req, res) {
    let userobj = {
        "userid" : req.body.userid,
        "username" : req.body.username,
        "userbirthdate" : req.body.userbirthdate,
        "userage" : req.body.userage
    }

    let uArray = [];
    fs.readFile('server/data/extendedUsers.json', 'utf8', function(err, data) {
        if (err) throw errl
        uArray = JSON.parse(data);
        uArray.push(userobj);
        console.log(userobj);


        uArrayjson = JSON.stringify(uArray);
        fs.writeFile('server/data/extendedUsers.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
            res.send(uArray);
        });
    });


}
