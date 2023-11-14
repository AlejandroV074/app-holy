
import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="logo-section">
                <img src="/images/holy.png" alt="Logo" className="logofooter" />
                <h1>HolyLabel</h1>
            </div>
            <div className="vertical-list contact-section">
                <h1>MENÚ</h1>

                <a>Inicio</a>
                <a>¿Quienes somos?</a>
                <a>FAQ</a>
                <a>Escanear QR</a>

            </div>
            <div className="vertical contactofooter">
                <h1>DATOS DE CONTACTO</h1>
                <p>Teléfono: </p>
                <p>Email: </p>
            </div>
            <div className="vertical-red responsive-section">
                <h1>REDES SOCIALES</h1>
                
                    <a>Facebook</a>
                    <a>Twitter</a>
                    <a>Instagram</a>
                
            </div>
        </footer>
    );
};

export default Footer;
