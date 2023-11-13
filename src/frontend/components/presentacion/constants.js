import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../crear-botellas/styles.css'; 

function Contenido() {
    const location = useLocation();
    const presentacion = location.state?.presentation || {};

    useEffect(() => {
    }, [presentacion.id_presentation]);

    return (
        <main>
            <div className="App-header" style={{marginTop: '-280%'}}> 
                <label>
                    <strong>Nombre:</strong> {presentacion.name}
                </label>
                <label>
                    <strong>Marca:</strong> {presentacion.brand}
                </label>
                <label>
                    <strong>Volumen:</strong> {presentacion.volume}
                </label>
                <label>
                    <strong>Unidad:</strong> {presentacion.unit === 1 ? 'ml' : 'L'}
                </label>
            </div>
        </main>
    );
}

export default Contenido;
