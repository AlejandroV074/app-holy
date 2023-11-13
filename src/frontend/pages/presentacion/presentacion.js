import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import Contenido from '../../components/presentacion/constants'

function Botella() {

    return (
        <div className="App">
            <header className="App-header">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
                <Navbar />
                <div style={{ color: '#D4AF37', fontSize: '5rem', fontWeight: '800', marginTop: '-80%' }}>
                    HolyLabel
                </div>
            </header>
            <main>
                <Contenido />
            </main>
        </div>
    );
}

export default Botella;
