# Assignment One Software Frameworks 3813ICT
By Nathan Turnbull S2808290

## Layout and version control
### Layout 
This repo has been in use for many weeks. S2808290 is the only contributor. Only the core files have been uploaded. Node modules purposefully left out. There are many commits with detailed commenting. There are two branches: main and week5.
###  The Server
Within the server directory there are three files:
server.js
socket.js
listen.js
These files are run via "node server.js". This server file contains all the routes used and runs via express. The listen and socket files are responsible for managaging sockets.
### Other files
All the other files have been created via angular. This is an angular project. There are several generated components and services.
### Version control
The project has had many updates. The project was commited to often to store changes and always have a backup. There is one branch but merging was only required once as there were no addiontally people working on this project.

### Documentation - Data structures
There are three main data structures. Users, channels and groups. All of these structures exist within the Mongo database.
| Structure      | Type | Properties |
| ----------- | ----------- | ----------- |
| Users      | Object      | _id, email, password, Rank, Moderatorof, groupmemberof, channelmemberof       |
| Channels   | Object        | _id, channelname, GroupName        |
| Groups   | Object       | _id, GroupName       |

This design is centered around the user. Most of the information is stored on the user via foreign keys. However there is also a foreign key on the channel structure.
There are many groups and channels to many users.

### Documentation - REST API

| API      | Description | Inputs | Returns
| ----------- | ----------- | ----------- | | ----------- |
| /api/SaveUser     | This creates or updates a user      |   String containing: email, password, rank    | returns user object |
| /api/deleteUser   | This deletes a user        |    String containing email  | returns user object |
| /api/SaveGroup   | This creates or updates a group       |    string containing group name    | returns group array |
| /api/deleteGroup   | This deletes a group       |   string containing group name     | returns group array |
| /api/SaveChannel   | This creates or updates a channel       |  string containing channel name and group name      | returns channel array |
| /api/deleteChannel   | This deletes a channel       |   string containing channel name     | returns channel array |
| /rtv               | Short for retrieve, this api is a get request that returns lists of users, groups and channels       |   No inputs    | Returns arrays of all structures with names as values |
| /assign          | This api adds a user to a group       |   String of user + group    | Nothing |
| /assignchannel   | This api adds a user to a channel      |  String of user + channel     | Nothing |
| //api/getusers   | This api returns an object of all users       |    no inputs   | Object containing all users |


## Documentation - AngularArchitecture
### The core files were generated via the "Ng new" command.
This repository is an angular project. There are core folders such as src and all files within have been generated using commands. The "App" folder within the "src" folder contains component folders and app files. As this project is built in angular some of the app files have been modified so that other components can access modules and inherit styles and html.
#### The components
There are several components of note. 
##### App
The main file is app. App is responsible for all the inheritance that happens on all the other files. It also includes all of the CSS which was inspired by some online designs.
##### Login
The Login component provides a view and a typescript file that users can use to login. The login TS file references the Auth service.

##### Chat
The chat component is an early example of what connecting to channels to chat in will look like.
The chat has some HTML, connection to the sockets and some CSS.
##### MSP 
The msp component is a control panel for managing all aspects of the website. The MSP component has both a html file and a typescript file that can create new users,groups and channels. It can also delete and appoint users.
There is a large chunck of html written. Many forms have been included.
##### Account
Admin page for looking at statistics of users.
#### The services
##### LoginService
The login service checks if a user exists of the server using a http module.
##### User Service
Hardly used. More http requests that are called in components.
##### Socket Service
contains socket.io code that is used to communicate with the server code.




## General Angular commands/Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
