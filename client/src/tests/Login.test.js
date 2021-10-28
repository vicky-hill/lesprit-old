const Page = require('./helpers/page');
jest.setTimeout(30000);

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/login');
});

afterEach(async () => {
    await page.close();
})

const loginUser = async (name, password) => {
    await page.type('form #name', name);
    await page.type('form #password', password);

    await page.click('form button');
}


test('The login page is loading', async () => {
    const url = await page.url();
    const text = await page.getContentOf('a.nav-link');
    const heading = await page.getContentOf('.form-heading');

    expect(url).toMatch(/login/);
    expect(text).toContain('Sign up');
    expect(heading).toEqual('Sign into your account');
});


test('Login redirects to home page', async () => {
    await page.createUser('Lin', '1234');
    
    await loginUser('Lin', '1234');

    await page.waitForNavigation();

    const user = await page.getContentOf('a.nav-link--user');

    expect(user).toEqual('username');

    await page.clearUser();
});


test('Login validation empty fields', async() => {
    await loginUser('', '1234');

    await page.waitForSelector('.alert-danger');

    const alert = await page.getContentOf('.alert-danger p');

    expect(alert).toEqual('Please fill out all fields');
});


test('Login with invalid credentials', async () => {
    await page.createUser('Lin', '1234');

    await loginUser('Linn', '12345');

    await page.waitForSelector('.alert-danger');

    const alert = await page.getContentOf('.alert-danger p');

    expect(alert).toEqual('Username or password invalid!');
});