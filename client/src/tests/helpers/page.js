const puppeteer = require('puppeteer');

class Page {
    static async build() {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();

        const customPage = new Page(page);

        return new Proxy(customPage, {
            get: function (target, property) {
                return customPage[property] || browser[property] || page[property];
            }
        })
    }

    constructor(page) {
        this.page = page;
    }

    async login() {
        await this.page.evaluate(() => {
            localStorage.setItem('token', 'example-token');
        });
    }

    // GetContentOf
    async getContentOf(selector) {
        return this.page.$eval(selector, el => el.innerHTML)
    }

    // Request
    request(method, path, data, token) {
        return this.page.evaluate((_method, _path, _data, _token) => {

            let req = {
                method: _method,
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' }
            }

            if (_data) {
                req.body = JSON.stringify(_data);
            }

            if (_token) {
                req.headers['x-auth-token'] = _token;
            }

            return fetch('http://localhost:5000' + _path, req).then(res => res.json())
        }, method, path, data, token)
    }

    // Create test user
    async createUser(name = 'test', password = '1234') {
        const { token } = await this.request('POST', '/api/user/register', { name, password });

        const { _id } = await this.request('GET', '/api/user', null, token);
            
        return { token, _id }
    }


    // Clean Up User
    async clearUser(token) {
        if (!token) {
            // Get token from local storage if not passed in
            token = await this.page.evaluate(() => {
                return localStorage.getItem('token');
            });
        }

        // Get id to delete
        const { _id } = await this.request('GET', '/api/user', null, token);

        // Delete test user
        await this.request('DELETE', `/api/user/${_id}`, null, token);
    }

    // Clean Up Lists
    async clearLists(token) {
        if (!token) {
            // Get token from local storage if not passed in
            token = await this.page.evaluate(() => {
                return localStorage.getItem('token');
            });
        }

        // Delete all users lists
        await this.request('DELETE', `/api/lists`, null, token);
    }

}

module.exports = Page;