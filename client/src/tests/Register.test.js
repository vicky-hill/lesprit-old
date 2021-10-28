const Page = require('./helpers/page');
jest.setTimeout(30000);

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/register');
});

afterEach(async () => {
    await page.close();
})

const registerUser = async (name) => {
    await page.type('form #name', name);
    await page.type('form #password', '1234');
    await page.type('form #password2', '1234');

    await page.click('form button');
}

test('The register page is loading', async () => {
    const url = await page.url();
    const text = await page.getContentOf('a.nav-link');
    const heading = await page.getContentOf('.form-heading');

    expect(url).toMatch(/register/);
    expect(text).toContain('Sign up');
    expect(heading).toEqual('Create a new account');
});



test('Register redirects to home page', async () => {
    await registerUser('Tom');

    await page.waitForNavigation();

    const user = await page.getContentOf('a.nav-link--user');

    expect(user).toEqual('username');

    await page.clearUser();
});


test('Register with username that is taken', async () => {
    const testUser = await page.createUser();

    await registerUser('test');

    await page.waitForSelector('.alert-danger');
    
    const alert = await page.getContentOf('.alert-danger p');

    expect(alert).toEqual('Username is taken!');
    
    await page.clearUser(testUser.token);
});


test('Register validation empty fields', async() => {
    await registerUser('');

    await page.waitForSelector('.alert-danger');

    const alert = await page.getContentOf('.alert-danger p');

    expect(alert).toEqual('Please fill out all fields');
});


test('Register with passwords not matching', async() => {
    await page.type('form #name', 'analisa');
    await page.type('form #password', '1234');
    await page.type('form #password2', '12345');

    await page.click('form button');

    await page.waitForSelector('.alert-danger');

    const alert = await page.getContentOf('.alert-danger p');

    expect(alert).toEqual('Passwords don\'t match');
})