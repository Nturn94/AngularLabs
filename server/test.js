

// var linear = require('./linearPoint.js');

// var assert = require('assert');
// describe('Linear Point', function () {
//   describe('see what happens', function () {
//     it('should return 2x1+4=6', function () {
//         assert.equal(linear(2,1,4), 6);
//     });
//     it('should return 2x0+4=4', function () {
//         assert.equal(linear(2,0,4), 4);
//     });
//     it('should return 2x-1+4=2', function () {
//         assert.equal(linear(2,-1,4), 2);
//     });
//   });
// });

var assert = require('assert');
let server = require("./server.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require('express');

chai.should();
chai.use(chaiHttp);

describe('Task APIs', ()=>{
  describe('GET /api/getusers', ()=>{
    it('it should return list of all users', (done)=>{
      chai.request(server)
      .get("/api/getusers")
      .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.not.be.eq(0);
        done();
      });
    });
  });

  describe('When adding a user', () => {
    it('It should add a new user', (done) => {
        let UsersSchema = {
            email: "LL@LL",
            password: "lolol",
            Rank: "member"
        }
      chai.request(server)
          .post('/api/SaveUser')
          .send(UsersSchema)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.property('errors');
                // response.body.should.be('object');
            done();
          });
    });
    it('it should not not add a user without a rank', (done) => {
      let UsersSchema = {
          email: "QQ@QQ",
          password: "wololol"
      }
    chai.request(server)
        .post('/api/SaveUser')
        .send(UsersSchema)
        .end((err, res) => {
              res.should.have.status(200);
              // response.body.should.be.a('array');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('Rank');
              res.body.errors.Rank.should.have.property('kind').eql('required');
          done();
        });
  });

  describe('When updating a user', () => {
    it('it should update a user', (done) => {
        let UsersSchema = {
            email: "AB@gmail.com",
            password: "lolol",
            Rank: "member"
        }
      chai.request(server)
          .post('/api/SaveUser')
          .send(UsersSchema)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.property('errors');
                // response.body.should.be('object');
            done();
          });
    });

  describe('Delete user', () => {
    it('it should DELETE a user given the email', (done) => {
        let UsersSchema = ({email: "HH@HH", password: "qwertyuiop", Rank: "member"})
        chai.request(server)
          .post('/api/deleteUser')
          .send(UsersSchema.email)
          .end((err, res) => {
              res.should.have.status(200);
            done();
            
          });
              
        });
    });
});

});

});
