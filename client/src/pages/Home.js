import React, { useState, useEffect } from 'react';
import Circle from '../components/blocks/home/Circle';
import goldCircle from '../assets/graphics/gold-circle.png';
import { Link } from 'react-router-dom';
// import silverCircle from '../assets/graphics/silver-circle.png';
import MenuCard from '../components/blocks/home/MenuCard';
import Slide from '../components/elements/Slide';
import Review from '../components/blocks/home/Review';

import speechbubble from '../assets/icons/speechbubble-icon.png';
import book from '../assets/icons/book-icon.png';
import Footer from '../components/elements/Footer';
import Container from '../components/containers/Container';

import { connect } from 'react-redux';
import { getWords } from 'actions/words';
import { getLists } from 'actions/lists';
import { openSlide, closeSlide } from 'actions/utils'

function Home({ getWords, getLists, openSlide, closeSlide }) {

    const windowClass = window.innerWidth < 1100 ? 'mobile' : 'desktop';

    useEffect(() => {
        getWords();
        getLists();
        // eslint-disable-next-line
    }, [])
  
    return (
        <Container>

            {/* Landing page */}
            <div className={windowClass + '-home'}>
                <Circle
                    windowClass={windowClass}
                    circleImage={goldCircle}
                    onClick={openSlide}
                    circleTitle="All done!"
                    count={34}
                />

                {/* Menu items for desktop */}
                {
                    windowClass === 'desktop' && (
                        <div className="desktop-home_menu">
                            <Link to="/vocabulary">
                                <MenuCard icon={book} title="Vocabulary" />
                            </Link>
                            <Link to="/conjugation">
                                <MenuCard icon={speechbubble} title="Conjugation" bigger />
                            </Link>
                        </div>
                    )
                }

                {/* Footer for mobile */}
                <Footer />
            </div>


            {/* Review Page */}
            <Slide >
                <Review close={closeSlide} />
            </Slide>

        </Container>

    )
}

export default connect(null, { getWords, getLists, openSlide, closeSlide })(Home);
