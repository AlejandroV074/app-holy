import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="logo-section">
                <img src="/images/holy.png" alt="Logo" className="logofooter" />
                <h1>HolyLabel</h1>
            </div>
            <div className="vertical contact-section">
                <h1>MENÚ</h1>
                <ul>
                    <li>Inicio</li>
                    <li>¿Quienes somos?</li>
                    <li>FAQ</li>
                    <li>Escanear QR</li>
                </ul>
            </div>
            <div className="vertical contactofooter">
                <h1>DATOS DE CONTACTO</h1>
                <p>Teléfono: </p>
                <p>Email: </p>
            </div>
            <div className="vertical responsive-section">
                <h1>REDES SOCIALES</h1>
                <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
