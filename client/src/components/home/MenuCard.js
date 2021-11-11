import React from 'react';
import chevronright from '../../assets/iconsImg/chevron-right-icon.png';

/* Props
=================================================== */
// icon: String
// title: String
// bigger: Bolean


function MenuCard({ icon, title, bigger }) {
    return (
        <div className="menu-card" id={'menu-card-' + title}>
            <img className={`menu-card--icon ${bigger && 'menu-card--bigger'}`} src={icon} alt="card icon" />
                <h5>{title}</h5>
            <img className="menu-card--chevron" src={chevronright} alt="chevron right" />
        </div>
    )
}

export default MenuCard;
