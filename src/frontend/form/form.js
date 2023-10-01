import React from 'react';

function Forma({ backgroundImage, texto }) {
    const svgStyle = {
        width: '100%', 
        height: 'auto', 
        flexShrink: 0,
        fill: '#333',
        filter: 'drop-shadow(0px 4px 4px #D4AF37) drop-shadow(0px 4px 4px #D4AF37) drop-shadow(0px 4px 4px #D4AF37)',
    };

    const textStyle = {
        fill: '#D4AF37',
        fontFamily: 'Montserrat',
        fontSize: '4rem', 
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '1.2', 
        letterSpacing: '-0.44px',
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1374" height="951" viewBox="0 0 1374 951" fill="none" style={svgStyle}>
            <g filter="url(#filter0_ddd_25_423)">
                <path d="M4.872 107.871C-3.13386 45.8946 49.85 -6.79696 111.781 1.55182L1118.33 137.242C1156.08 142.331 1187.14 169.477 1197.24 206.207L1366.53 821.967C1383.87 885.044 1333.75 946.365 1268.49 941.932L180.173 868.017C134.953 864.945 98.2 830.357 92.3934 785.406L4.872 107.871Z" fill="#333333" />

                <image href={backgroundImage} x="100" y="0" width="500" height="800" style={{ maxWidth: '100%' }} /> {/* Hacer la imagen adaptable */}

                <text x="500" y="250" style={textStyle}>
                    {texto}
                </text>
            </g>
            <defs>
            </defs>
        </svg>
    );
}

export default Forma;
