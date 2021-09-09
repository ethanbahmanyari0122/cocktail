var request = require('supertest');
var app = require('../app');


request(app)
       .get('/')
       .expect(200)
       .end((err, res) => {
         if(err) throw err;
       })

describe('GET home', function() {
        it('responds with ejs', function(done) {
          request(app)
            .get('/')
            .expect(200, done);
        });
      });       


describe('GET About', function() {
        it('responds with ejs', function(done) {
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

describe('hi', async () => {
  await request(app).get('/contact')
                    .expect(200)
})
