import { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';


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
                        <Link to="/" className="logo-label-container">
                            <img src="/images/holy.png" alt="Logo de HolyLabel" className="logo" />
                            <span>HolyLabel</span>
                        </Link>
                    </li>
                )}
                <li><Link to="/" onClick={() => { scroll.scrollTo(5); }}>Inicio</Link></li>
                <li><Link to="/" onClick={() => { scroll.scrollTo(1000); }}> ¿Quiénes somos?</Link></li>
                <li><Link to="/" onClick={() => { scroll.scrollTo(2000); }}> FAQ </Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/scan-qr" className="scan-qr">Escanear QR</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
