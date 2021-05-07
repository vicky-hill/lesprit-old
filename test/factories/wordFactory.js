const supertest = require('supertest');
const host = 'http://localhost:5000';
const request = supertest(host);

module.exports = async (foreign, native, user, list, token) => {
    const res = await request
        .post('/api/words')
        .send({foreign, native, user, list})
        .set('x-auth-token', token);
    
    return res.body;
}