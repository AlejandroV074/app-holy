import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Forma from '../../components/form/form';
import Footer from '../../components/footer/footer';
import QRScanner from '../../components/qr/qr';

function Qr() {
    return (
        <div className="App">
            <header className="App-header">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />

                <Navbar />
                <div className='scan-codigo'>
                    <h1 style={{color: '#D4AF37'}}>Escanear qr</h1>
                    <QRScanner />
                </div>
            </header>
            <main>
                <Forma backgroundImage="/images/qr-scan.png" texto="¿Cómo funciona?"
                    textoAdicional="Nuestra plataforma utiliza avanzada tecnología de 
                    validación y registro mediante códigos QR personalizados. Además, 
                    implementamos la consulta de trazabilidad en una cadena de blockchain, 
                    asegurando así la transparencia y seguridad en cada paso de la cadena de 
                    suministro de las bebidas alcohólicas." />
                <Footer />
            </main>
        </div>
    );
}

export default Qr;
