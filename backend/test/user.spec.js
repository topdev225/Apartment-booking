const should = require('should');
const request = require('supertest');
const app = require('../app');

describe('GET /api/users', ()=> {
    it('should return 200 status code', (done) => {
        request(app)
            .get('/api/users')
            .expect(200)
            .end((err, res) => {
                // console.log("res", res);
                if(err) throw err;
                done();
            })
    });

    it('should return array', (done) => {
        request(app)
            .get('/api/users')
            .expect(200)
            .end((err, res) => {
                if(err) {
                    throw err;
                }
                // res.body.data.should.be.an.instanceof(Array).and.have.length(9);
                res.body.data.should.be.an.instanceof(Array)
                res.body.data.map(user=>{
                    user.should.have.properties('id', 'userName');
                    user.id.should.be.a.Number();
                    user.userName.should.be.a.String();
                });
                done();
            })
    });
})