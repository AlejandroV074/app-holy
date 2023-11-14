/* eslint-disable react/prop-types */
import './form.css';

function Forma({ backgroundImage, texto, textoAdicional }) {
    return (
        <div className='father'>
            <div className='svg'>
                <img className='svg' src='/images/Rectangle 70.png' alt="imagen-forma" />
            </div>
            <img className="imagen-form" src={backgroundImage} alt="Background" />
            <h1 className='titulo' >
                {texto}
            </h1>
            <p className='fonttext' >
                {textoAdicional}
            </p>
        </div>
    );
}

export default Forma;
