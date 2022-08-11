
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
    var u = req.body.username;
    var p = req.body.pwd;
    c = u + p;
    console.log(c);

    fs.readFile('./server/data/users.json', 'utf8', function(err, data) {
        if (err) throw err;
        let userArray = JSON.parse(data);
        console.log(userArray);
        let i = userArray.findIndex(user =>
            ((user.username ==u) && (user.pwd ==p)));
        if (i == -1) {
            res.send({ "ok":false});
        } else {
            console.log(userArray[i]);
            res.send({ "ok": true});
        }
    });
}
