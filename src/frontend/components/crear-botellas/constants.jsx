import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function Presentation() {
    const [searchTerm, setSearchTerm] = useState("");
    const [options, setOptions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://holylabelapi.azurewebsites.net/presentacion/")
            .then((response) => response.json())
            .then((data) => {
                const presentaciones = data.map((presentacion) => presentacion);
                setOptions(presentaciones);
            })
            .catch((error) => console.error("Error fetching data from API:", error));
    }, []);

    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const results = options.filter(
            (option) =>
                option && option.name.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(results);
    };

    const handleResultClick = (presentation) => {
        navigate(`/crear-botellas/`, {
            state: { presentation: presentation },
        });
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
                <div className="search-results" style={{ borderRadius: '10px', padding: '65px', backgroundColor: 'white', boxShadow: '1px 5px 4px 0px #d4af37', height: '230px' }}>
                    {searchResults.map((result) => (
                        <div key={result.id_presentation} style={{ marginBottom: '2%', marginTop: '5%' }}>
                            <div style={{ color: 'black', cursor: 'pointer' }} onClick={() => handleResultClick(result)}>
                                {result.name}
                            </div>
                        </div>
                    ))}
                    {searchResults.length === 0 && searchTerm.length > 0 && (
                        <div style={{ textAlign: 'center', color: 'black', marginTop: '20%' }}>No existen resultados</div>
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
