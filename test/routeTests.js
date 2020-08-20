// const expect  = require('chai').expect;
// const request = require('request');
const axios = require('axios');
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const {mergeArrays, sortArray} = require('../helpers/arrayFunctions.js');

chai.use(chaiHttp);

describe("Hatchways Back-End Challenge Tests", function () {
  describe("Ping Route", () => {
    it("Test should return the correct body and response status for ping route", (done) => {
      let path = "/api/ping";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          done();
        });
    });
    it("Test should return the correct response status for incorrect ping route path", (done) => {
      let path = "/api/pong";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe("Post Route", () => {
    it("Test should return the correct body type and response status for post route", (done) => {
      let path = "/api/posts?tags=health";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
    it("Test should return the correct response status for incorrect post route path with an invalid sortBy parameter ", (done) => {
      let path = "/api/posts?tags=health&sortBy=likeys&direction=desc";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Test should return the correct response status for incorrect post route path with an invalid direction parameter ", (done) => {
      let path = "/api/posts?tags=health&sortBy=likes&direction=descending";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Test should return the correct response status for incorrect post route path with a missing tags parameter ", (done) => {
      let path = "/api/posts";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("Test should check to make sure only unique posts have been returned so there are no duplicates", (done) => {
      let path = "/api/posts?tags=health&sortBy=likes&direction=desc";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          let pass = false;
          const array = res.body.posts;
          const result = [];
          const map = new Map();
          for (const item of array) {
            if (!map.has(item.id)) {
              map.set(item.id, true); // set any value to Map
              result.push({
                author: item.author,
                authorId: item.authorId,
                id: item.id,
                likes: item.likes,
                popularity: item.popularity,
                reads: item.reads,
                tags: item.tags,
              });
            }
          }
          if (result.toString() == res.body.posts.toString()) {
            pass = true;
          }
          pass.should.equal(true);
          done();
        });
    });
    it("Test should check to make sure that the direction=asc is displaying in correct direction", (done) => {
      let path = "/api/posts?tags=health&sortBy=likes&direction=asc";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          let pass = false;
          const array = res.body.posts;

          let ascArray = sortArray(array, "likes", "asc");

          if (ascArray.toString() == res.body.posts.toString()) {
            pass = true;
          }
          pass.should.equal(true);
          done();
        });
    });
    it("Test should check to make sure that the direction=desc is displaying in correct direction", (done) => {
        let path = "/api/posts?tags=health&sortBy=likes&direction=asc";
        chai
          .request(server)
          .get(path)
          .end((err, res) => {
            console.log("res", res.body)
            let pass = false;
            const array = res.body.posts;
            let descArray = sortArray(array, "likes", "desc");
            if (descArray.toString() == res.body.posts.toString()) {
              pass = true;
            }
            pass.should.equal(true);
            done();
          });
      });
    it("Test should check to make sure that when none is specified, default direction is asc and default sortBy is id", (done) => {
      let path = "/api/posts?tags=health";
      chai
        .request(server)
        .get(path)
        .end((err, res) => {
          let pass = false;
          let correctArray = [];
          axios
            .get(
              "http://localhost:3000/api/posts?tags=health&sortBy=id&direction=asc"
            )
            .then((response) => {
              correctArray = response.data.posts;
            })
            .catch((error) => {});
          const array = res.body.posts;
          if (array.toString() == correctArray.toString()) {
            pass = true;
          }
          pass.should.equal(true);
          done();
        });
    });
  });
  // Make sure it is sorted correctly
  // Make sure it is deduped
  // Status codes for bad routes
  // Check results for default parameters

  //   describe('Ping Route', function() {
  //     it('Should return the correct body for step 1', function(done) {
  //         request('http://localhost:2222/api/ping', function(error, response, body) {
  //             expect(body).to.equal('{"success":"true"}');
  //             done();
  //         });
  //     });
  //     it('Should return the correct status code for step 1 where route is correct', function(done) {
  //       request('http://localhost:2222/api/ping', function(error, response, body) {
  //           expect(response.statusCode).to.equal(200);
  //           done();
  //       });
  //     });
  //     it('Should return the correct status code for step 1 where route is incorrect', function(done) {
  //       request('http://localhost:2222/api/pings', function(error, response, body) {
  //           expect(response.statusCode).to.equal(404);
  //           done();
  //       });
  //     });
  //   })
});