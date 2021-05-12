import React from 'react';
import chevronright from '../../assets/icons/chevron-right-icon.png';
import speechbubble from '../../assets/icons/speechbubble-icon.png';

function MenuCard() {
    return (
        <div className="menu-card">
            <img className="menu-card--icon" id="speechbubble" src={speechbubble} alt="speech bubble icon" />
                <h5>Conjugation</h5>
            <img className="chevron" src={chevronright} alt="chevron right" />
        </div>
    )
}

export default MenuCard;
