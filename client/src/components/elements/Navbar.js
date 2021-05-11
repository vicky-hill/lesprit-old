import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pineapple from '../../assets/graphics/pineapple.png';

function Navbar({ authenticated, username }) {

    const [currentURL, setCurrentURL] = useState('register');

    // Toggle between Sign in and sign up
    function changeURL() {
        setCurrentURL(window.location.href);
    }

    // Show logout after clicking on username
    function showLogOut() {
        document.getElementById('logout').classList.toggle('show-logout');
    }

    // Hide logout when clicking anywhere
    document.addEventListener('click', function(e) {
        if(!e.target.classList.contains('nav-link--user') && authenticated) {
            document.getElementById('logout').classList.remove('show-logout');
        }
    });

    // Mobile drawer
    function toggleDrawer() {
        const settings = document.getElementById("drawer");
        settings.classList.toggle("show-drawer");
    }



    // Logged in
    const loggedIn = (

        <div className='header'>

            {/* Dictionary Search */}
            <div className="dictionary-searchbar">
                {/* <form action="">
                        <i class="fas fa-book-open input-icon"></i><input class="heading_grey-box_input rounded-input" type="text" />
                    </form> */}
            </div>

            {/* Logo */}
            <Link to="">
                <h1>Linguar</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="nav">
                <Link to="/vocabulary" className="nav-link">vocabulary</Link>
                <Link to="/conjugation" className="nav-link">conjugation</Link>

                <img src={pineapple} alt="" />
                <div className="logout-box" onClick={showLogOut}>
                    <Link to="" className="nav-link nav-link--user">{username}</Link>
                    <div className="logout" id="logout">
                        <p className="logout-button" >Logout</p>
                    </div>
                </div>
            </div>

            {/* Hamburger Menu */}
            <div className="hamburger" onClick={toggleDrawer}>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
            </div>

            <div className="drawer" id="drawer">
                 { authenticated ? <h4> {username} </h4> : null }
                <button className="transparent-btn">Log Out</button>
            </div>

        </div>
    )

    
    // Logged out
    const loggedOut = (
        <div className="header">
            {/* Dictionary Search */}
            <div className="dictionary-searchbar"></div>

            {/* Logo */}
            <Link to="">
                <h1>Linguar</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="nav">

                {
                    currentURL.includes('login') ?

                        <Link to="login" className="nav-link nav-link--signin" onClick={changeURL} >Sign in <i className="fas fa-sign-in-alt"> </i></Link> :
                        <Link to="register" className="nav-link nav-link--signin" onClick={changeURL}>Sign up <i className="fas fa-user-plus"> </i></Link>

                }

            </div>


        </div>
    )

    return (

        !authenticated ? loggedOut : loggedIn
 
     )
}

export default Navbar;
