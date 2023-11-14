
import './Loader.css'; // Estilo CSS para el loader

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        </div>
    );
};

export default Loader;
