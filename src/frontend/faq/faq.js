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
    fontWeight: 400,
    lineHeight: 'normal',
    margin: '50px 0', 
    padding: '30px', // Espacio interno del cuadro de pregunta
    borderRadius: '8px',
    background: '#FFF',
    boxShadow: expandir ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : '1px 5px 4px 0px #D4AF37',
    transition: 'box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centrar preguntas en el cuadro
    cursor: 'pointer',
  };

  const preguntaStyle = {
    marginBottom: '10px', // Espacio entre pregunta y respuesta
  };

  return (
    <div style={faqStyle} onClick={toggleExpandir}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={preguntaStyle}>{pregunta}</span>
        <span style={{ fontSize: '20px', marginLeft: '8px' }}>{expandir ? '▼' : '▶'}</span>
      </div>
      {expandir && (
        <div style={{ padding: '20px', borderRadius: '8px', background: '#FFF', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
          {respuesta}
        </div>
      )}
    </div>
  );
}

export default Faq;
