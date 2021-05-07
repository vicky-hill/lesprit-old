const supertest = require('supertest');
const host = 'http://localhost:5000';
const request = supertest(host);

module.exports = async (title, user, token) => {
    const res = await request
        .post('/api/lists')
        .send({title, user})
        .set('x-auth-token', token);

    return res.body;
}