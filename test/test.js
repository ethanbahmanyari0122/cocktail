var request = require('supertest');
const { response } = require('../app');
var app = require('../app');
var assert = require('assert');


request(app)
       .get('/')
       .expect(200)
       .end((err, res) => {
         if(err) throw err;
       })


describe('GET home', function() {
        it('respons with ejs', function(done) {
          request(app)
            .get('/')
            .expect(200, done);
        });
      });  
      

describe('GET 404', function() {
        it('respons with ejs', function(done) {
          request(app)
            .get('/cocktail')
            .expect(404, done);
        });
      });          


describe('GET About', function() {
        it('respons with ejs', function(done) {
          request(app)
            .get('/about')
            .expect('Content-Type', /html/)
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);
              return done();
            });
        });
      });      


      /*
describe('POST Something', function() {
        it('respons with html', function(done) {
          request(app)
            .post('/')
            .send('{ message : "Hi, i am there" }')
            .expect('Content-Type', /html/)
            .expect()
            .expect(404)
            .end(function(err, res) {
              if (err) return done(err);
              return done();
            });

        });
      });      

*/