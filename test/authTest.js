const assert = require('chai').assert;
const User = require('../models/User');


// /api/auth login()
describe('POST /api/auth', ()=>{
    it('should login user and return token', done =>{
        request(app)
            .post(`/api/auth`)
            .set('Accept', 'application/json')
            .set('Content-Type','application/json')
            .send({email:'admin@admin.com', password:'123456'})
            .expect(200)
            .expect('Content-type', /json/)
            .expect((response)=>{
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');

            })
            .end(done);
    })
})