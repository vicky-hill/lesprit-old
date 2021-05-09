const supertest = require('supertest');
const host = 'http://localhost:5000';
const request = supertest(host);

const userFactory = require('./factories/userFactory');
const listFactory = require('./factories/listFactory');
const wordFactory = require('./factories/wordFactory');

let testUser;


beforeAll(async () => {
    // Create test user
    testUser = await userFactory('list_user', 'list@mymail.com', '6789');
});


afterAll(async () => {
    // Delete test user
    await request.delete(`/api/user/${testUser._id}`).set('x-auth-token', testUser.token);;
});


/* ===================================
   List Endpoints
=================================== */

describe('List endpoints', () => {

    let list1;
    let list2;
    let list3;
    let list4;


    beforeAll(async () => {
        list1 = await listFactory('First Chapter', testUser._id, testUser.token);
        list2 = await listFactory('Second Chapter', testUser._id, testUser.token);
        list3 = await listFactory('Third Chapter', testUser._id, testUser.token);
        await wordFactory('Uno', 'One', testUser._id, list1._id, testUser.token);
        await wordFactory('Dos', 'Two', testUser._id, list1._id, testUser.token);
        await wordFactory('Tres', 'Three', testUser._id, list1._id, testUser.token);

    });

    afterAll(async () => {
        await request.delete(`/api/lists/${list2._id}`).set('x-auth-token', testUser.token);
        await request.delete(`/api/lists/${list3._id}`).set('x-auth-token', testUser.token);
        await request.delete(`/api/lists/${list4._id}`).set('x-auth-token', testUser.token);
    })


    test('gets all lists', async () => {
        const res = await request
            .get('/api/lists')
            .set('x-auth-token', testUser.token);

        expect(res.body.length).toBe(3);
    })


    test('gets one list', async () => {
        const res = await request
            .get('/api/lists/' + list1._id)
            .set('x-auth-token', testUser.token);

        expect(res.body).toEqual(
            expect.objectContaining({
                title: 'First Chapter',
                user: testUser._id
            }));
    })


    test('saves new list', async () => {
        const res = await request
            .post('/api/lists')
            .send({ title: 'Fourth Chapter', user: testUser._id })
            .set('x-auth-token', testUser.token);

        list4 = res.body;

        expect(res.body).toEqual(
            expect.objectContaining({
                title: 'Fourth Chapter',
                user: testUser._id
            }));

        const resGetAll = await request
            .get('/api/lists')
            .set('x-auth-token', testUser.token);

        expect(resGetAll.body.length).toBe(4);
    })

    test('updates a list', async () => {
        const res = await request
            .put('/api/lists/' + list1._id)
            .send({ title: 'Chapter 1' })
            .set('x-auth-token', testUser.token);

        expect(res.body).toEqual(
            expect.objectContaining({
                title: 'Chapter 1'
            }));
    })

    test('deletes a list', async () => {
        const res = await request
            .delete('/api/lists/' + list1._id)
            .set('x-auth-token', testUser.token);

        expect(res.body._id).toBe(list1._id);

        const resWord = await request
            .get('/api/words')
            .set('x-auth-token', testUser.token);

        expect(resWord.body.length).toBe(0);

    })




    /* ===================================
       Not Found Error Handling 
    =================================== */
    describe('list not found responds with msg', () => {

        test('when fetching', async () => {
            const res = await request
                .get('/api/lists/6095b6214829cbe546b1f3b2')
                .set('x-auth-token', testUser.token);

            expect(res.body).toEqual({
                msg: 'List not found'
            });
        })

        test('when updating', async () => {
            const res = await request
                .put('/api/lists/6095b6214829cbe546b1f3b2')
                .set('x-auth-token', testUser.token);

            expect(res.body).toEqual({
                msg: 'List not found'
            });
        })

        test('when deleting', async () => {
            const res = await request
                .delete('/api/lists/6095b6214829cbe546b1f3b2')
                .set('x-auth-token', testUser.token);

            expect(res.body).toEqual({
                msg: 'List not found'
            });
        })
    })


    /* ===================================
       Not Authorized Error Handling
    =================================== */
    describe('unauthorized request responds with msg', () => {
        test('when fetching', async () => {
            const res = await request
                .get('/api/lists/' + list3._id);

            const res1 = await request
                .get('/api/lists');

            expect(res.body && res1.body).toEqual({
                msg: 'No token, authorization denied'
            });
        })

        test('when updating', async () => {
            const res = await request
                .put('/api/lists/' + list3._id)
                .send({ title: 'Chapter 2' });

            expect(res.body).toEqual({
                msg: 'No token, authorization denied'
            });
        })

        test('when deleting', async () => {
            const res = await request
                .delete('/api/lists/' + list3._id);

            expect(res.body).toEqual({
                msg: 'No token, authorization denied'
            });
        })
    })

});