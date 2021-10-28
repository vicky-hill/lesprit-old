const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ0ZXN0X3VzZXIiLCJpZCI6IjYxNzJjMjJmNGRmOTZmZDE4YjU4YTA0MSJ9LCJpYXQiOjE2MzQ5MTA4NTR9.KwJeBAP8F6zoxgR0wvZly5LlRqPljOPSi3I2ZsZtHg8'

const login = async (page) => {
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/login');

    await page.type('form #name', 'test_user');
    await page.type('form #password', '1234');
    await page.click('form button');

    await page.waitForNavigation();

    await page.evaluate( async (token) => {
        localStorage.setItem('token', token);
    }, token);
}

const logout = async (page) => {
    await page.clearLists(token);
    await page.close();
}

module.exports = {
    token, login, logout
}