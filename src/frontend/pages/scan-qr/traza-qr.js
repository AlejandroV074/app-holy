import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../../components/navbar/navbar';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TraceabilityItem from './traceability-item';
import './style.css';
import Loader from '../../components/loader/loading';
import { toast } from 'react-toastify';

function Traza() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [code, setCode] = useState(null);
    const [traceability, setTraceability] = useState(null);
    const [center, setCenter] = useState([0, 0]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    const icon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    useEffect(() => {
        setCode(queryParams.get('code'))
    }, [queryParams])

    useEffect(() => {
        if (code) {
            fetch(`https://holylabelapi.azurewebsites.net/trazabilidadBotella/?code=${code}&format=json`)
                .then((response) => response.json())
                .then((data) => {
                    setTraceability(data?.traceability);

                    const point = data.traceability.sort(compararFechas)[0];
                    setCenter([point?.latitude, point?.length])

                    setLoading(false);
                })
                .catch((error) =>
                    console.error("Error al obtener la trazabilidad:", error)
                );
        }

    }, [code, refresh])

    const compararFechas = (a, b) => {
        const fechaA = new Date(a.traceability_date);
        const fechaB = new Date(b.traceability_date);

        return fechaA - fechaB;
    }

    const addTraceabiliy = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const geolocation = [
                        position.coords.latitude,
                        position.coords.longitude
                    ]

                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    if( localStorage.getItem("token_jwt_holylabel") ) {
                        myHeaders.append("Authorization", 
                            localStorage.getItem("token_jwt_holylabel")
                        );
                    }

                    const fechaHoy = new Date();

                    // Obtiene el año, mes y día
                    const año = fechaHoy.getFullYear();
                    const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 al mes porque en JavaScript los meses van de 0 a 11
                    const dia = fechaHoy.getDate().toString().padStart(2, '0');

                    // Formatea la fecha como un string con el formato deseado
                    const fechaFormateada = `${año}-${mes}-${dia}`;

                    const raw = JSON.stringify({
                        "code": code,
                        "latitude": geolocation[0] + "",
                        "length": geolocation[1] + "",
                        "traceability_date": fechaFormateada
                    });

                    const requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    debugger
                    fetch("https://holylabelapi.azurewebsites.net/trazabilidad/", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            console.log(result)
                            setLoading(true)
                            setRefresh(prev => !prev)
                        })
                        .catch(error => {
                            toast.error(
                                "Error al guardar. Verifica los datos e intenta nuevamente."
                            );
                            console.log('error', error)}
                        );
                },
                (error) => {
                    toast.error("Error al obtener la ubicación");
                }
            );


        } else {
            toast.error("Geolocalización no es compatible en este navegador");
        }
    }

    const ComponentUpdater = () => {
        const map = useMap();

        useEffect(() => {
            map.setView(center, map.getZoom());
        }, [center, map]);

        return null;
    };

    return (
        <>
            <div className="App">
                <header className="header-trazabilidad">
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                    <Navbar />
                    <div
                        style={{
                            marginTop: "150px",
                            width: "100vw",
                            display: 'flex',
                            alignItems: 'start'
                        }}
                    >
                        <div
                            style={{
                                color: "#D4AF37",
                                fontSize: "5rem",
                                fontWeight: "800",
                                width: "50%"
                            }}
                        >
                            Trazabilidad
                        </div>
                    </div>
                </header>
                <main className='main-traceability'>
                    <MapContainer
                        center={center}
                        zoom={13}
                        className='map-container'
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {traceability?.map((point) =>
                            <Marker key={point.id_traceability} position={[point?.latitude, point?.length]} icon={icon}>
                                <Popup>
                                    {point?.name} <br /> {point?.traceability_date}
                                </Popup>
                            </Marker>
                        )}
                        <ComponentUpdater />
                    </MapContainer>
                    <div className='traceability-container'>
                        {traceability?.sort(compararFechas)?.map((point) =>
                            <TraceabilityItem  key={point.id_traceability} point={point} onClick={() => setCenter([point?.latitude, point?.length])} />
                        )}
                        <div className='traceability-item' onClick={addTraceabiliy}>
                            <span className={`Add-icon icon-point`}></span>
                            <div className='traceability-text' >
                                <span> Agregar trazabilidad </span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {loading && <Loader />}
        </>
    );
}

export default Traza;
