import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

function Traza() {
    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            const map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const points = [
                [51.505, -0.09],
                [51.51, -0.1],
                [51.515, -0.12]
            ];

            const polyline = L.polyline(points, { color: 'blue' }).addTo(map);

            map.fitBounds(polyline.getBounds());
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
                <Navbar />
            </header>
            <main>
                <p>
                    {/* ... Tu contenido ... */}
                </p>
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                <Footer />
            </main>
        </div>
    );
}

export default Traza;
