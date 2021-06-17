module.exports = (page, user) => {
    await page.evaluate(() => {
        localStorage.setItem('token', 'example-token');
    });
}