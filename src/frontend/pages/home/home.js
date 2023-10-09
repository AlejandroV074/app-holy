import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../../../frontend/components/navbar/navbar';
import Forma from '../../../frontend/components/form/form';
import Faq from '../../../frontend/components/faq/faq';
import Footer from '../../../frontend/components/footer/footer';

function Home() {
    const [showHolyLabel, setShowHolyLabel] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowHolyLabel(false);
            } else {
                setShowHolyLabel(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />

                <div className={`large-text ${showHolyLabel ? 'show' : ''}`}>
                    HolyLabel
                </div>
                <Navbar />
            </header>

            <main>
                <Forma backgroundImage="/images/person.png" texto="¿Quiénes somos?"
                    textoAdicional="Nuestra plataforma utiliza avanzada tecnología de 
                    validación y registro mediante códigos QR personalizados. Además, 
                    implementamos la consulta de trazabilidad en una cadena de blockchain, 
                    asegurando así la transparencia y seguridad en cada paso de la cadena de 
                    suministro de las bebidas alcohólicas." />

                <div className='tituloStyle'>FAQ</div>
                <Faq
                    pregunta="¿Cómo funciona la aplicación?"
                    respuesta="La aplicación funciona de la siguiente manera: "
                />
                <Faq
                    pregunta="¿Cómo funciona la aplicación?"
                    respuesta="La aplicación funciona de la siguiente manera: "
                />
                <Footer />
            </main>
        </div>
    );
}

export default Home;
