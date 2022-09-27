# Fullstack-test-myrobin
 The project is an implemented simple chat web app using MEVN stack. The project uses MongoDB as the database (NoSQL Database), Node JS (ExpressJS) as the backend, and VueJS (support with Bootstrap5) as the front end. This is a simple project skill test for applying as a Fullstack Developer at MyRobin.
### Requirement
- NodeJS (version 14x, 16x, or later)
- MongoDB Service
- Before setup anything, you must create your own MongoDB database for the project, and add an user to authenticate the database
### Setup Server
- copy config.js.example to config.js
- fill all config fields based on comment rules
- open the terminal and change directory to `api/` folder
- execute `npm install` to install all required npm packages
- execute `npm run dev` to run the server service
- if success running the server service, you will see :

```
Server Running at port 3000
Successfully connected to the database
```
- you can access the server via `http://localhost:3000` (the port 3000 is based on your `config.js`)
### Setup Client
- copy .env.example to .env
- fill all config fields based on comment rules
- open the terminal and change directory to `web/` folder
- execute `npm install` to install all required npm packages
- execute `npm run serve` to run client service in development mode
- if success running the client service, you will see :
```
App running at:
  - Local:   http://localhost:3001/ 
  - Network: xxx
```
- you can access the client app via `http://localhost:3001` (based on your host and port in your `.env`)

### API Testing
There is a simple way to testing Express API. Execute with `npm test` after **Setup Server**
### Project Limitation
- status offline or chatroom members only will be removed when user exiting chatrooms. (Cannot do automatic logout)
- testing only for ExpressJS API not with VueJS (my first project using testing expressJS)