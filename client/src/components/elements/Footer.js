import React from 'react';
import book from '../../assets/icons/book-icon.png';
import speechbubble from '../../assets/icons/speechbubble-icon.png';
import chevronright from '../../assets/icons/chevron-right-icon.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
           {/* Vocabulary Footer Link */}
            <Link to="/vocabulary" className="footer-top">       
            <img className="icon" src={book} alt="book icon"/>
                <h5>Vocabulary</h5>
                <img className="chevron" src={chevronright} alt="chevron right"/>   
            </Link>
    
           
             {/* Conjugation Footer Link */}
            <div className="footer-bottom">
                <img className="icon" id="speechbubble" src={speechbubble} alt="speech bubble icon"/>
                <h5>Conjugation</h5>
                <img className="chevron" src={chevronright} alt="chevron right"/>  
            </div>
            
        </>
    )
}

export default Footer;
