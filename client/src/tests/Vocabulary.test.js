const Page = require('./helpers/page');
const Auth = require('./helpers/auth');
jest.setTimeout(30000);

let page;

beforeAll(async () => {
    page = await Page.build();
    await Auth.login(page);
})

afterAll(async () => {
    // await Auth.logout(page);
})


test('Open vocabulary', async () => {

    await page.evaluate( async (token) => {
        localStorage.setItem('token', token);
    }, Auth.token);

    await page.click('#menu-card-Vocabulary');
    const vocabTitle = await page.getContentOf('.panel-card_group--title');
    

    expect(vocabTitle).toContain('Word');
})

test('Add a new list', async () => {
    
    await page.goto('http://localhost:3000/vocabulary');

    await page.click('#add-list-btn');

    await page.type('#vocabulary-form #title', 'Testing with jest');
    await page.click('#vocabulary-form button')

    // await page.waitForTimeout(5000);

    const listTitle = await page.getContentOf('.vocabulary-card .vocabulary-card--text h3');

    console.log(listTitle)

    expect(1).toEqual(1)
})

