import React from 'react';
import chevronright from '../../assets/icons/chevron-right-icon.png';

function MenuCard({ icon, title, bigger }) {
    return (
        <div className="menu-card">
            <img className={`menu-card--icon ${bigger && 'menu-card--bigger'}`} src={icon} alt="card icon" />
                <h5>{title}</h5>
            <img className="menu-card--chevron" src={chevronright} alt="chevron right" />
        </div>
    )
}

export default MenuCard;
