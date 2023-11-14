import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/navbar/navbar';
import Presentation from '../../components/crear-botellas/constants';

function Buscar() {
    useEffect(() => {
        toast.success('¡Login exitoso!');
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
                <Navbar />
                <div style={{ color: '#D4AF37', fontSize: '5rem', fontWeight: '800', marginTop: '-98%' }}>
                    HolyLabel
                </div>
            </header>
            <ToastContainer />
            <main>
                <Presentation />
            </main>
        </div>
    );
}

export default Buscar;
