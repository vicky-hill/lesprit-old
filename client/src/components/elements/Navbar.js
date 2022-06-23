import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pineapple from '../../assets/graphics/pineapple.png';
import Drawer from '../elements/Drawer';

/* Props
=================================================== */
// authenticatd: Boolean
// username: String


function Navbar({ authenticated, username, logout }) {

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
    // document.addEventListener('click', function (e) {
    //     if (!e.target.classList.contains('nav-link--user') && authenticated) {
    //         document.getElementById('logout').classList.remove('show-logout');
    //     }
    // });

    // Mobile drawer
    function toggleDrawer() {
        const settings = document.getElementById("drawer");
        settings.classList.toggle("show-drawer");
    }

    // Logged In Navbar
    const loggedInNav = (
        <div className="nav">
            <Link to="/vocabulary" className="nav-link">vocabulary</Link>
            <Link to="/conjugation" className="nav-link">conjugation</Link>

            <img src={pineapple} alt="" />
            <div className="logout-box" onClick={showLogOut}>
                <Link to="" className="nav-link nav-link--user">{username}</Link>
                <div className="logout" id="logout">
                    <p className="logout-button" onClick={logout} >Logout</p>
                </div>
            </div>
        </div>
    )

    // Logged out Navbar
    const loggedOutNav = (

        <div className="nav">

            {
                currentURL.includes('login') ?
                    <Link to="login" className="nav-link nav-link--signin" onClick={changeURL} >Sign in <i className="fas fa-sign-in-alt"> </i></Link> :
                    <Link to="register" className="nav-link nav-link--signin" onClick={changeURL}>Sign up <i className="fas fa-user-plus"> </i></Link>
            }
        </div>
    )



    return (
        <div className='header'>

            {/* Dictionary Search */}
            <div className="dictionary-searchbar">
                {/* <form action="">
                    <i class="fas fa-book-open input-icon"></i><input class="heading_grey-box_input rounded-input" type="text" />
                </form> */}
            </div>


            {/* Logo */}
            <Link to="">
                <h1>lesprit</h1>
            </Link>


            {/* Desktop Menu */}
            { !authenticated ? loggedOutNav : loggedInNav}


            {/* Hamburger Menu if logged out */}
            {
                authenticated && (
                    <>
                        <div className="hamburger" onClick={toggleDrawer}>
                            <div className="hamburger-line"></div>
                            <div className="hamburger-line"></div>
                            <div className="hamburger-line"></div>
                        </div>

                        <div className="drawer" id="drawer">
                            <Drawer authenticated={authenticated} username={username} />
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Navbar;
