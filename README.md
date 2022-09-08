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
There are three main data structures. Users, channels and groups. All of these structures will exist within the database eventually. At the moment Users is an object, channels and groups are arrays. Currently all structures are stored within the server.js file.
####The user has these elements: 
Username, userid, userbirthdate, userage, groups(memberof)[], adminstatus(yes/no), GroupAssis[], channels[] 
There is a many groups/channels association to one user. The user can also be a super admin.
#### The group structure is an array
There is just an array that inculdes all groups. The relation to the user is stored on user.
#### The channel structure is also an array
There is just an array that inculdes all channels. The relation to the user is stored on user.

### Documentation - REST API

#### GetStatus()
This api is a get request that has no input. The request returns the users, groups and channels.
#### AssignUser(usergroup)
This api assigns a user to a group. The post request takes a group and a user in a combined string. non important data is returned to show it was successful.
#### PostNewGroup(NameOfGroup)
This api creates a new group by adding one to the array. The input is a string.  non important data is returned to show it was successful.
#### PostNewUser(NameOfUserPasswordOfUser)
This api creates a new user by adding it to an array. it takes a combined string of a username and password. non important data is returned to show it was successful.
#### DelUser(user)
this api deletes a user by sending a string and removing a user from object/array. non important data is returned to show it was successful.
#### delgroup(group)
A string is taken as a parameter the string is checked against the array of groups and the group is removed. non important data is returned to show it was successful.
#### AssignUserToChannel(userchannel)
A combination string is input. The user object is updated to include an additional channel. non important data is returned to show it was successful.
#### PostNewChannel(NameOfChannel)
A string is sent via post. A new channel is added to the channel array. non important data is returned to show it was successful.
#### delChannel(Channel)
A string is sent via post. the channel array is indexed and the provided channel is removed. non important data is returned to show it was successful.

## Documentation - AngularArchitecture
### The core files were generated via the "Ng new" command.
This repository is an angular project. There are core folders such as src and all files within have been generated using commands. The "App" folder within the "src" folder contains component folders and app files. As this project is built in angular some of the app files have been modified so that other components can access modules and inherit styles and html.
#### The components
There are several components of note. 
##### App
The main file is app. App is responsible for all the inheritance that happens on all the other files. It also includes all of the CSS which was inspired by some online designs.
##### Login
The Login component provides a view and a typescript file that users can use to login. The login TS file references the Auth service.
##### Auth
The auth component is a service that checks if a user exists of the server using a http module.
##### Chat
The chat component is an early example of what connecting to channels to chat in will look like.
The chat has some HTML, connection to the sockets and some CSS.
##### MSP 
The msp component is a control panel for managing all aspects of the website. The MSP component has both a html file and a typescript file that can create new users,groups and channels. It can also delete and appoint users.
There is a large chunck of html written. Many forms have been included.




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
