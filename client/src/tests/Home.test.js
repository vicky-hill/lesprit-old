const puppeteer = require('puppeteer');

test('We can launch a browser', async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })


    await page.goto('http://localhost:3000');


    const reviewText = await page.$eval('h2.desktop-home_review--title', el => el.innerHTML);

    expect(reviewText).toEqual('All done!');

})

































// import React from 'react';
// import { shallow } from 'enzyme';
// import Home from 'components/pages/Home';
// import Circle from 'components/blocks/home/Circle';
// import MenuCard from 'components/blocks/home/MenuCard';
// import Footer from 'components/elements/Footer';
// import Slide from 'components/elements/Slide';
// import Review from 'components/blocks/home/Review';

 
// let wrapper;

// describe('desktop and mobile', () => {

//     beforeEach(() => {
//         wrapper = shallow(<Home />);
//     });

//     it('keeps the review hidden on initial loading', () => {
//         expect(wrapper.find(Review).length).toEqual(1);
//         expect(wrapper.find(Slide).props().open).toEqual(false);
//     });

//     it('opens the review after clicking on the review circle', () => { 
//         wrapper.find(Circle).simulate('click');

//         expect(wrapper.find(Slide).props().open).toEqual(true);
//     });


//     it('closes the review after clickin anywhere', () => {
//         wrapper.find(Review).simulate('click');

//         expect(wrapper.find(Slide).props().open).toEqual(false);
//     });
// })



// describe('desktop version', () => {
//     beforeEach(() => {
//         wrapper = shallow(<Home />);
//         window.innerWidth = 1400;
//     });

//     it('shows the review circle', () => { 
//         expect(wrapper.find(Circle).length).toEqual(1);
//     });

//     it('shows two Menu cards', () => {
//         expect(wrapper.find(MenuCard).length).toEqual(2);
//     });
// })


// describe('mobile version', () => {
//     beforeEach(() => {
//         wrapper = shallow(<Home />);
//         window.innerWidth = 400;
//     });

//     it('shows the review circle', () => { 
//         expect(wrapper.find(Circle).length).toEqual(1);
//     });

//     it('doesn\'t show the menu cards', () => {
//         expect(wrapper.find(MenuCard).length).toEqual(0);
//     });

//     it('it shows the menu in the footer', () => {
//         expect(wrapper.find(Footer).length).toEqual(1);
//     });
// })


