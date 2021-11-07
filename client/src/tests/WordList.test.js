const Page = require('./helpers/page');
const Auth = require('./helpers/auth');
jest.setTimeout(30000);

let page;
let word1;
let word2

beforeAll(async () => {
    page = await Page.build();
    await Auth.login(page);
   
    const { _id } = await page.request('POST', `/api/lists`, { title: 'Factory list 1' }, Auth.token);
    word1 = await page.request('POSt', `/api/words`, { foreign: 'primero', native: 'first', list: _id }, Auth.token);
    word2 = await page.request('POSt', `/api/words`, { foreign: 'segundo', native: 'second', list: _id }, Auth.token);
})

afterAll(async () => {
    await Auth.logout(page);
})


test('Load word list', async () => {

    await page.click('#menu-card-Vocabulary');

    await page.waitForTimeout(1000);
    await page.click('.vocabulary-card');

    await page.waitForSelector('.word-card');
    const words = await page.$$('.word-card');
    const secondWordForeign = await page.getContentOf('.word-card--text h3');
    const secondWordNative = await page.getContentOf('.word-card--text p');
    
    expect(words.length).toEqual(2);
    expect(secondWordForeign).toEqual(word2.foreign);
    expect(secondWordNative).toEqual(word2.native);

    expect(1).toEqual(1);
})



