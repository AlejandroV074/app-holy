import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './frontend/navbar/navbar';
import Forma from './frontend/form/form';

function App() {
  // State para mostrar u ocultar el texto
  const [showHolyLabel, setShowHolyLabel] = useState(true);

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowHolyLabel(false);
      } else {
        setShowHolyLabel(true);
      }
    };

    // Agregar el evento de scroll y limpiarlo cuando se desmonte el componente
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Encabezado */}
      <header className="App-header">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />

        {/* Texto grande que se muestra u oculta */}
        <div className={`large-text ${showHolyLabel ? 'show' : ''}`}>
          HolyLabel
        </div>

        {/* Barra de navegación */}
        <Navbar />
      </header>

      {/* Contenido principal */}
      <main>
        {/* Aquí pasamos la URL de la imagen como una prop al componente Forma */}
        <Forma backgroundImage="src/frontend/assets/image/logo512.png" /> {/* Reemplaza <path-to-image> con la ruta correcta de tu imagen */}
      </main>
    </div>
  );
}

export default App;
