import React from 'react';
import Circle from '../elements/Circle';
import goldCircle from '../../assets/graphics/gold-circle.png';
import { Link } from 'react-router-dom';
import silverCircle from '../../assets/graphics/silver-circle.png';
import MenuCard from '../elements/MenuCard';

import speechbubble from '../../assets/icons/speechbubble-icon.png';
import book from '../../assets/icons/book-icon.png';

function Home() {

    const windowClass = window.innerWidth < 1100 ? 'mobile' : 'desktop';

    return (
        <div className="container">
            
            {/* Landing page */}
            <div className={windowClass + '-home'}>
                <Circle
                    windowClass={windowClass}
                    openRanking={() => console.log('open ranking')}
                    circleImage={goldCircle}
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
            </div>

            


        </div>

    )
}

export default Home;
