import React from 'react';
import Circle from '../elements/Circle';
import goldCircle from '../../assets/graphics/gold-circle.png';
import silverCircle from '../../assets/graphics/silver-circle.png';
import MenuCard from '../elements/MenuCard';

import speechbubble from '../../assets/icons/speechbubble-icon.png';
import book from '../../assets/icons/book-icon.png';

function Home() {

    const windowClass = window.innerWidth < 1100 ? 'mobile' : 'desktop';

    return (
        <div className={windowClass + '-landing'}>
            <Circle
                windowClass={windowClass}
                openRanking={() => console.log('open ranking')}
                circleImage={goldCircle}
                circleTitle="All done!"
                count={34}
            />
            {/* <MenuCard icon={speechbubble} title="Conjugation" bigger /> */}
            {/* <MenuCard icon={book} title="Vocabulary" /> */}
        </div>

    )
}

export default Home;
