import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function Presentation() {
    const options = ["Ron Medellín añejo 3 años", "Ron Medellín dorado", "Medellín crema de ron 8 años"];
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const results = options.filter(option =>
            option.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(results);
    };

    return (
        <div>
            <input
                className="buscar-pres"
                placeholder="Presentación"
                value={searchTerm}
                onChange={handleInputChange}
            />
                {searchTerm.length > 0 && (
                    <div className="search-results">
                        {searchResults.map((result, index) => (
                            <div key={index}>{result}</div>
                        ))}
                        {searchResults.length === 0 && searchTerm.length > 0 && (
                            <div style={{textAlign: 'center'}}>No existen resultados</div>
                        )}
                        <ul>
                            <li>
                                <Link to="/crear-botellas">Crear nueva presentación</Link>
                            </li>
                        </ul>
                    </div>
                )}
        </div>
    );
}

export default Presentation;
