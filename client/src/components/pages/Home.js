import React, { useState, useEffect } from 'react';
import Circle from '../blocks/home/Circle';
import goldCircle from '../../assets/graphics/gold-circle.png';
import { Link } from 'react-router-dom';
import silverCircle from '../../assets/graphics/silver-circle.png';
import MenuCard from '../blocks/home/MenuCard';
import Slide from '../elements/Slide';
import Review from '../blocks/home/Review';
import { closeSlide, closeByClick } from '../elements/Slide';

import speechbubble from '../../assets/icons/speechbubble-icon.png';
import book from '../../assets/icons/book-icon.png';
import Footer from '../elements/Footer';
import Container from '../layout/Container';

import { connect } from 'react-redux';
import { getWords } from 'actions/words';

function Home({ getWords }) {

    const windowClass = window.innerWidth < 1100 ? 'mobile' : 'desktop';

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getWords()
    }, [])
  
    closeByClick(setIsOpen);


    return (
        <Container>

            {/* Landing page */}
            <div className={windowClass + '-home'}>
                <Circle
                    windowClass={windowClass}
                    circleImage={goldCircle}
                    onClick={() => setIsOpen(true)}
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
            <Slide open={isOpen} >
                <Review />
            </Slide>

        </Container>
    )
}

export default connect(null, { getWords })(Home);
