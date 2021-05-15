import React, { useState } from 'react';
import Circle from '../elements/Circle';
import goldCircle from '../../assets/graphics/gold-circle.png';
import { Link } from 'react-router-dom';
import silverCircle from '../../assets/graphics/silver-circle.png';
import MenuCard from '../elements/MenuCard';
import Slide from '../elements/Slide';
import Review from '../elements/Review';
import { closeSlide, closeByClick } from '../elements/Slide';

import speechbubble from '../../assets/icons/speechbubble-icon.png';
import book from '../../assets/icons/book-icon.png';
import Footer from '../elements/Footer';

function Home() {

    const windowClass = window.innerWidth < 1100 ? 'mobile' : 'desktop';

    const [isOpen, setIsOpen] = useState(false);


    closeByClick(setIsOpen, 'closing-x');


    return (
        <div className="container">

            {/* Landing page */}
            <div className={windowClass + '-home'}>
                <Circle
                    windowClass={windowClass}
                    circleImage={goldCircle}
                    onClick={() => setIsOpen(true)}
                    circleTitle="All done!"
                    count={34}
                />

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

                {/* Footer */}
                <Footer />
            </div>



            {/* Review Page */}
            <Slide open={isOpen} >
                <Review />
            </Slide>


        </div>

    )
}

export default Home;
