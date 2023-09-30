import React, { useState, useEffect } from 'react';
import './navbar.css';

function Navbar() {
    const [showHolyLabel, setShowHolyLabel] = useState(false);

    useEffect(() => {
        // Detecta el evento de desplazamiento
        const handleScroll = () => {
            if (window.scrollY > 100) {
                // Muestra el elemento "HolyLabel" después de desplazarse 100 píxeles
                setShowHolyLabel(true);
            } else {
                // Oculta el elemento "HolyLabel" si se desplaza hacia arriba
                setShowHolyLabel(false);
            }
        };

        // Agrega un event listener para el evento de desplazamiento
        window.addEventListener('scroll', handleScroll);

        // Limpia el event listener cuando se desmonta el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav>
            <ul>
                {showHolyLabel && (
                    <li className="special-item"><a href="/">HolyLabel</a></li>
                )}
                <li><a href="/">Inicio</a></li>
                <li><a href="/">¿Quiénes somos?</a></li>
                <li><a href="/acerca-de">FAQ</a></li>
                <li><a href="/contacto" className="scan-qr">Escanear QR</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
