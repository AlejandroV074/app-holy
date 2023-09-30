import React from 'react';

function Forma(backgroundImage) {
    const svgStyle = {
        width: '1413px',
        height: '966px',
        flexShrink: 0,
        fill: '#333',
        filter: 'drop-shadow(0px 4px 4px #D4AF37) drop-shadow(0px 4px 4px #D4AF37) drop-shadow(0px 4px 4px #D4AF37)',
        backgroundImage: `url(${backgroundImage})`,
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1374" height="951" viewBox="0 0 1374 951" fill="none" style={svgStyle}>
            {/* Contenido del SVG */}
            <g filter="url(#filter0_ddd_25_423)">
                <path d="M4.872 107.871C-3.13386 45.8946 49.85 -6.79696 111.781 1.55182L1118.33 137.242C1156.08 142.331 1187.14 169.477 1197.24 206.207L1366.53 821.967C1383.87 885.044 1333.75 946.365 1268.49 941.932L180.173 868.017C134.953 864.945 98.2 830.357 92.3934 785.406L4.872 107.871Z" fill="#333333" />
            </g>
            <defs>
                {/* Definiciones del filtro */}
            </defs>
        </svg>
    );
}

export default Forma;
