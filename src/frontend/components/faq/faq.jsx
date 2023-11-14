/* eslint-disable react/prop-types */
import   { useState } from 'react';
import './faq.css';

function Faq({ pregunta, respuesta }) {
    const [expandir, setExpandir] = useState(false);

    const toggleExpandir = () => {
        setExpandir(!expandir);
    };

    return (
        <div className={`faq-container ${expandir ? 'expanded' : ''}`} onClick={toggleExpandir}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>{pregunta}</span>
                <span className="arrow-icon">{expandir ? '➤' : '➤'}</span>
            </div>
            {expandir && (
                <div>
                    <div className="faq-line"></div>
                    <div className="faq-answer">
                        {respuesta}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Faq;
