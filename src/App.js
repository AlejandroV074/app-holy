import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './frontend/navbar/navbar';
import Forma from './frontend/form/form';
import Faq from './frontend/faq/faq';

function App() {
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

  const tituloStyle = {
    color: '#D4AF37',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '44px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '56px',
    letterSpacing: '-0.44px',
    margin: '60px 0',
  };

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
        <Forma backgroundImage="/images/person.png" texto="¿Quiénes somos?" />

        <div style={tituloStyle}>FAQ</div>

        <Faq
          pregunta="¿Cómo funciona la aplicación?"
          respuesta="La aplicación funciona de la siguiente manera: "
        />
        <Faq
          pregunta="¿Otra pregunta frecuente?"
          respuesta="Respuesta."
        />
      </main>
    </div>
  );
}

export default App;
