import React, { useState } from 'react';

function Faq({ pregunta, respuesta }) {
    const [expandir, setExpandir] = useState(false);

    const toggleExpandir = () => {
        setExpandir(!expandir);
    };

    const faqStyle = {
        color: '#000',
        fontFamily: 'Montserrat',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
        margin: '30px 0', 
        padding: '30px', 
        borderRadius: '8px',
        background: '#FFF',
        boxShadow: '1px 5px 4px 0px #D4AF37',
        transition: 'box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
    };

    const respuestaStyle = {
        padding: '20px',
        borderRadius: '8px',
    };

    return (
        <div style={faqStyle} onClick={toggleExpandir}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>{pregunta}</span>
                <span style={{ fontSize: '20px', marginLeft: '8px' }}>{expandir ? '▼' : '▶'}</span>
            </div>
            {expandir && (
                <div style={respuestaStyle}>
                    {respuesta}
                </div>
            )}
        </div>
    );
}

export default Faq;
