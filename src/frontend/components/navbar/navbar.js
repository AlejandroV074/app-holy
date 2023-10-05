import React, { useState, useEffect } from 'react';
import './navbar.css';

function Navbar() {
    const [showHolyLabel, setShowHolyLabel] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowHolyLabel(true);
            } else {
                setShowHolyLabel(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav>
            <div className={`menu-btn ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
            </div>
            <ul className={`menu ${showMenu ? 'active' : ''}`}>
                {showHolyLabel && (
                    <li className="special-item">
                        <a href="/" className="logo-label-container">
                            <img src="/images/holy.png" alt="Logo de HolyLabel" className="logo" />
                            <span>HolyLabel</span>
                        </a>
                    </li>
                )}
                <li><a href="/">Inicio</a></li>
                <li><a href="/">¿Quiénes somos?</a></li>
                <li><a href="/">FAQ</a></li>
                <li><a href="/" className="scan-qr">Escanear QR</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
