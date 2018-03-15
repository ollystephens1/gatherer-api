const config = require('config');
const chai = require('chai');
const chaiHttp = require ('chai-http');
const server = require('../dist/server.bundle');
const should = chai.should();
const PORT = config.get('server.port');

chai.use(chaiHttp);

// Test GET /api
describe('/GET api', () => {
  it('It should get all the test data', (done) => {
    chai.request(`localhost:${PORT}`)
    .get('/api')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.data.should.be.a('array');
      done();
    })
  })
});
