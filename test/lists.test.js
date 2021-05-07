const supertest = require('supertest');
const host = 'http://localhost:5000';
const request = supertest(host);

const userFactory = require('./factories/userFactory');
const listFactory = require('./factories/listFactory');

let testUser;


beforeAll(async () => {
    testUser = await userFactory();
});



afterAll(async () => {

    // Delete test user
    await request.delete(`/api/user/${testUser._id}`);
});






test('testing tests', async () => {
    const res = 1;

    expect(res).toBe(1);
});