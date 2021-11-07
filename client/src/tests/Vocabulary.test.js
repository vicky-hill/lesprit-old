const Page = require('./helpers/page');
const Auth = require('./helpers/auth');
jest.setTimeout(30000);

let page;

beforeAll(async () => {
    page = await Page.build();
    await Auth.login(page);
   
    await page.request('POST', `/api/lists`, { title: 'Factory list 1' }, Auth.token);
    await page.request('POST', `/api/lists`, { title: 'Factory list 2' }, Auth.token);
    await page.request('POST', `/api/lists`, { title: 'Factory list 3' }, Auth.token);
})

afterAll(async () => {
    await Auth.logout(page);
})


test('Load vocabulary lists', async () => {
    await page.click('#menu-card-Vocabulary');
    const vocabTitle = await page.getContentOf('.panel-card_group--title');
    await page.waitForTimeout(1000);
    
    const lists = await page.$$('.vocabulary-card');
    
    expect(lists.length).toEqual(3);
    expect(vocabTitle).toContain('Word');
})


test('Add a new list', async () => {
    await page.goto('http://localhost:3000/vocabulary');

    await page.click('#add-list-btn');

    await page.type('#vocabulary-form #title', 'Testing with jest');
    await page.click('#vocabulary-form button')

    await page.waitForTimeout(2000);

    const listTitle = await page.getContentOf('.vocabulary-card .vocabulary-card--text h3');

    expect(listTitle).toEqual('Testing with jest')
})

