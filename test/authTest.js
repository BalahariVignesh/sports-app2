const assert = require('chai').assert;
const User = require('../models/User');
const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
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


// /api/user/sign-up
describe('POST /api/user/sign-up', () =>{
	it('should register a new user and return success', done =>{
		request(app)
			.post(`/api/user/sign-up`)
			.set('Accept', 'application/json')
			.set('Content-Type','application/json')
			.send({name:'Bala  ',email:'Bala@srh.com',password:'123456',password2:'123456',isOrganiser:'true'})
			.expect(200)
			.expect((response)=>{
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');

            })
            .end(done);
    })
})