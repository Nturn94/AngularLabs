module.exports = {

    connect: function(io, PORT) {
        var rooms=["room1", "room2", "room3", "room4"];
        var socketRoom = []; //array of two column table | socketid | name of room |
        var socketRoomnum = []; // name of room || how many people in room

        //const collection = db.collection("groups");

        //collection.find({}).foreach(function(err, data) {
        //    rooms.push(data);
        // });
        
        const chat = io.of("/chat");

        chat.on('connection',(socket) => {
            socket.on('message',(message)=> {
                console.log('user connection on port '+ PORT +' : '+ socket.id);
                // io.emit('message',message); ////// HERRRRRRRRRRE
                for(i=0; i<socketRoom.length;i++) {
                    if (socketRoom[i][0] == socket.id){
                    chat.to(socketRoom[i][1]).emit('message', message);
                    // console.log("hellowerld");

                    }
                }
            });

        io.on('connection',(socket) => {
        console.log('lamo '+ PORT +' : '+ socket.id);
            socket.on('message',(message)=>{
                //console.log("socket.js:"+message);
                io.emit('message',message);
            })
    });

            socket.on('newroom', (newroom)=>{
                if (rooms.indexOf(newroom)== -1){
                    rooms.push(newroom);
                    chat.emit('roomslist', JSON.stringify(rooms));
                }
            });

            socket.on('roomslist', (m)=>{
                chat.emit('roomslist', JSON.stringify(rooms));
            });

            socket.on('numusers', (room) => {
                var usercount = 0;

                for (i=0;i<socketRoomnum.length;i++){
                    if(socketRoomnum[i][0] == room){
                        usercount = socketRoomnum[i][1];
                    }
                }

                chat.in(room).emit('numusers', usercount);

            });

            socket.on("joinRoom", (room)=>{
                if(rooms.includes(room)){
                    socket.join(room, ()=>{
                        var inroomSocketarray = false;
                        for (i=0;i<socketRoom.length;i++){
                            if(socketRoom[i][0] == socket.id){
                                socketRoom[i][1] = room;
                                inroom = true;
                            }
                        }
                    if(inroomSocketarray == false){
                        socketRoom.push([socket.id, room]);
                        var hasroom = false;
                        for(let j=0;j<socketRoomnum.length;j++){
                            if(socketRoomnum[j][0]==room){
                                socketRoomnum[j][1] = socketRoomnum[j][1] + 1;
                                hasroomnum = true;
                            }
                        }
                        if (hasroomnum == false){
                            socketRoomnum.push([room,1]);
                        }

                    }
                        chat.in(room).emit("notice", "A new user has joined");
                    });
                    return chat.in(room).emit("joined", room);
                }
            });

            socket.on("leaveroom", (room) =>{
                for(let i=0;i<socketRoom.length;i++){
                    if (socketRoom[i][0] == socket.id){
                        socketRoom.splice(i,1);
                        socket.leave(room);
                        chat.to(room).emit("notice", "A user has left");
                    }
                }

                for(let j=0;i<socketRoom.length;j++){
                    if(socketRoomnum.length[j][0]== room){
                        socketRoomnum[j][1] = socketRoomnum[j][1]-1;
                        if(socketRoomnum[j][1]==0){
                            socketRoomnum.splice(j,1);
                        }
                    }
                }
            });

            socket.on("disconnnect", ()=>{
                chat.emit('disconnnect');
                for (let i=0;i<socketRoom.length;i++){
                    if(socketRoom[i][0] == socket.id){
                        socketRoom.splice(i,1);
                    }
                }
                for (let j=0;j<socketRoomnum.length;j++){
                    if(socketRoomnum[j][0] == socket.room){
                        socketRoomnum[j][1] = socketRoomnum[j][1] -1;
                    }
                }
                console.log("Client disconnected");
            });
        });

    }
}

// module.exports = {
//     connect: function(io, PORT){
//         io.on('connection',(socket) => {
//             console.log('user connection on port '+ PORT +' : '+ socket.id);
//                 socket.on('message',(message)=>{
//                     //console.log("socket.js:"+message);
//                     io.emit('message',message);
//                 })
//         });
//     }
// }