const supertest = require('supertest');
const host = 'http://localhost:5000';
const request = supertest(host);

module.exports = async (name = 'test_user', email = 'test@mymail.com', password = '1234') => {
    
    // Register test user and return token
    const res1 = await request
        .post('/api/user/register')
        .send({ name, email, password })

    const token = res1.body.token;

    // Get test user info and save id
    const res2 = await request
        .get('/api/user')
        .set('x-auth-token', token)

    const _id = res2.body._id;

    return {token, _id};
}

