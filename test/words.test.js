const supertest = require('supertest');
const host = 'http://localhost:5000';
const request = supertest(host);

const userFactory = require('./factories/userFactory');
const listFactory = require('./factories/listFactory');
const wordFactory = require('./factories/wordFactory');

let testList;
let testUser;


beforeAll(async () => {
    // Create a test user and list
    testUser = await userFactory('words_user', 'words@mymail.com', '4567');
    testList = await listFactory('First Chapter', testUser._id, testUser.token);
});

    

afterAll(async () => {
    // Delete test user and list
    await request.delete(`/api/user/${testUser._id}`);
    await request.delete(`/api/lists/${testList._id}`).set('x-auth-token', testUser.token);
});


/* ===================================
   Word Endpoints
=================================== */
describe('Word endpoints', () => {

    let word1;
    let word2;

    beforeAll(async () => {
        // Populate db with 3 words
        word1 = await wordFactory('Palabra 1', 'Word 1', testUser._id, testList._id, testUser.token);
        word2 = await wordFactory('Palabra 2', 'Word 2', testUser._id, testList._id, testUser.token);
        await wordFactory('Palabra 3', 'Word 3', testUser._id, testList._id, testUser.token);
    });


    test('gets all words', async () => {
        const res = await request
            .get('/api/words')
            .set('x-auth-token', testUser.token);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
    });

    test('gets one word', async () => {
        const res = await request
            .get('/api/words/' + word1._id)
            .set('x-auth-token', testUser.token);

        expect(res.statusCode).toBe(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                foreign: 'Palabra 1',
                native: 'Word 1',
                rating: 0,
                user: testUser._id,
                list: testList._id,
            }));
    });

    test('gets all words for review', async () => {
        let now = new Date();
        await request
            .put('/api/words/' + word1._id)
            .send({ dueDate: now.setFullYear(now.getFullYear() + 7) })
            .set('x-auth-token', testUser.token);

        const res = await request
            .get('/api/words/review')
            .set('x-auth-token', testUser.token);

        expect(res.body.length).toBe(2);
    });


    test('saves a new word', async () => {
        const res = await request
            .post('/api/words')
            .send({ foreign: 'Palabra 4', native: 'Word 4', user: testUser._id, list: testList._id })
            .set('x-auth-token', testUser.token);

        const resGetSingle = await request
            .get('/api/words/' + res.body._id)
            .set('x-auth-token', testUser.token);

        expect(resGetSingle.body).toEqual(
            expect.objectContaining({
                foreign: 'Palabra 4',
                native: 'Word 4',
                rating: 0,
                user: testUser._id,
                list: testList._id
            }));
    });


    test('updates a word', async () => {
        const res = await request
            .put('/api/words/' + word1._id)
            .send({ foreign: 'Mot 1' })
            .set('x-auth-token', testUser.token);

        expect(res.body).toEqual(
            expect.objectContaining({
                foreign: 'Mot 1',
                native: 'Word 1',
                rating: 0,
                user: testUser._id
            }));
    });


    test('deletes a word', async () => {
        const res = await request
            .delete('/api/words/' + word1._id)
            .set('x-auth-token', testUser.token);

        expect(res.body._id).toBe(word1._id);

        const resGetAll = await request
            .get('/api/words')
            .set('x-auth-token', testUser.token);

        expect(resGetAll.body.length).toBe(3);

        const resGetOne = await request
            .get('/api/words/' + word1._id)
            .set('x-auth-token', testUser.token);

        expect(resGetOne.body).toEqual({
            msg: 'Word not found'
        });
    });


    /* ===================================
       Not Found Error Handling 
    =================================== */
    describe('word not found responds with msg', () => {

        test('when fetching', async () => {
            const res = await request
                .get('/api/words/6095b6214829cbe546b1f3b2')
                .set('x-auth-token', testUser.token);

            expect(res.body).toEqual({
                msg: 'Word not found'
            });
        })

        test('when updating', async () => {
            const res = await request
                .put('/api/words/6095b6214829cbe546b1f3b2')
                .set('x-auth-token', testUser.token);

            expect(res.body).toEqual({
                msg: 'Word not found'
            });
        })

        test('when deleting', async () => {
            const res = await request
                .delete('/api/words/6095b6214829cbe546b1f3b2')
                .set('x-auth-token', testUser.token);

            expect(res.body).toEqual({
                msg: 'Word not found'
            });
        })



        /* ===================================
           Not Authorized Error Handling
        =================================== */
        describe('unauthorized request responds with msg', () => {
            test('when fetching', async () => {
                const res = await request
                    .get('/api/words/' + word2._id);

                const res2 = await request
                    .get('/api/words');

                const res3 = await request
                    .get('/api/words/review');

                expect(res.body && res2.body && res3.body).toEqual({
                    msg: 'No token, authorization denied'
                });
            })

            test('when updating', async () => {
                const res = await request
                    .put('/api/words/' + word2._id)
                    .send({ foreign: 'Wort 2' });

                expect(res.body).toEqual({
                    msg: 'No token, authorization denied'
                });
            })

            test('when deleting', async () => {
                const res = await request
                    .delete('/api/words/' + word2._id);

                expect(res.body).toEqual({
                    msg: 'No token, authorization denied'
                });
            })
        })
    });
});