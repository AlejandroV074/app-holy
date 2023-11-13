import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router";
import Modal from "../../components/modal/modal";

function Crear() {
    const [nombre, setNombre] = useState("");
    const [marcas, setMarcas] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
    const [volumen, setVolumen] = useState("");
    const [unidad, setUnidad] = useState("");

    const [presentacionCargada, setPresentacionCargada] = useState(null);
    const [botellaCreada, setBotellaCreada] = useState(null);

    const [geolocation, setGeolocation] = useState(null);

    const location = useLocation();

    useEffect(() => {
        fetch("https://holylabelapi.azurewebsites.net/marca/")
            .then((response) => response.json())
            .then((data) => setMarcas(data))
            .catch((error) =>
                console.error("Error al obtener las marcas:", error)
            );

        let presentacionCargada = location.state?.presentation;
        setPresentacionCargada(presentacionCargada ?? null)

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeolocation([
                        position.coords.latitude,
                        position.coords.longitude
                    ])
                },
                (error) => {
                    toast.error("Error al obtener la ubicación");
                }
            );
        } else {
            toast.error("Geolocalización no es compatible en este navegador");
        }
    }, []);

    useEffect(() => {
        if (presentacionCargada) {
            const marcaCargada = marcas.find((marca) => marca.id_brand === presentacionCargada.brand);
            setMarcaSeleccionada(marcaCargada.name);
        }
    }, [marcas])

    useEffect(() => {
        if (presentacionCargada) {
            setNombre(presentacionCargada.name)
            setVolumen(presentacionCargada.volume);
            setUnidad(presentacionCargada.unit);
        }
    }, [presentacionCargada])

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const marcaEncontrada = marcas.find(marca => marca.name === marcaSeleccionada);

            if (!marcaEncontrada) {
                console.error("Error: No se encontró la marca correspondiente al nombre seleccionado.");
                toast.error("Error inesperado. Por favor, intenta nuevamente más tarde.");
                return;
            }

            if (!geolocation) {
                console.error("Error: No se encontró la marca correspondiente al nombre seleccionado.");
                toast.error("Error inesperado. Localizacion no calculada.");
                return;
            }

            let response = null

            if (!presentacionCargada) {
                const responsePresentacion = await fetch(
                    "https://holylabelapi.azurewebsites.net/presentacion/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: nombre,
                            volume: volumen,
                            unit: unidad,
                            brand: marcaEncontrada.id_brand,
                        }),
                    }
                );

                response = await responsePresentacion.json().then((presentacion) => {
                    return fetch(
                        "https://holylabelapi.azurewebsites.net/botella/",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                batch: 3,
                                id_presentation: presentacion.id_presentation,
                            }),
                        })
                })
            } else {
                response = await fetch(
                    "https://holylabelapi.azurewebsites.net/botella/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            batch: 3,
                            id_presentation: presentacionCargada.id_presentation,
                        }),
                    })
            }

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setBotellaCreada(result)
                toast.success("Guardado exitosamente");

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", 
                    localStorage.getItem("token_jwt_holylabel")
                );

                const fechaHoy = new Date();

                // Obtiene el año, mes y día
                const año = fechaHoy.getFullYear();
                const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 al mes porque en JavaScript los meses van de 0 a 11
                const dia = fechaHoy.getDate().toString().padStart(2, '0');

                // Formatea la fecha como un string con el formato deseado
                const fechaFormateada = `${año}-${mes}-${dia}`;

                var raw = JSON.stringify({
                    "code": result.code,
                    "latitude": geolocation[0] + "",
                    "length": geolocation[1] + "",
                    "traceability_date": fechaFormateada
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://holylabelapi.azurewebsites.net/trazabilidad/", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => {
                        toast.error(
                            "Error al guardar. Verifica los datos e intenta nuevamente."
                        );
                        console.log('error', error)
                    });
            } else {
                toast.error(
                    "Error al guardar. Verifica los datos e intenta nuevamente."
                );
                console.log("Error al guardar");
            }
        } catch (error) {
            console.error("Error inesperado", error);
            toast.error(
                "Error inesperado. Por favor, intenta nuevamente más tarde."
            );
        }
    };

    useEffect(() => {
        if (botellaCreada) {
            openModal()
        }
    }, [botellaCreada])

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                    <Navbar />
                    <div
                        style={{
                            color: "#D4AF37",
                            fontSize: "5rem",
                            fontWeight: "800",
                            marginTop: "-80%",
                        }}
                    >
                        HolyLabel
                    </div>
                </header>
                <main>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                style={{ marginTop: "-2%", height: "60px" }}
                                className="buscar-pres"
                                placeholder="Nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                disabled={presentacionCargada}
                            />
                        </label>
                        <label>
                            <select
                                style={{ marginTop: "5%", height: "80px", width: "28%" }}
                                className="buscar-pres"
                                value={marcaSeleccionada}
                                onChange={(e) => setMarcaSeleccionada(e.target.value)}
                                disabled={presentacionCargada}
                            >
                                <option value="">Selecciona una marca</option>
                                {marcas.map((marca) => (
                                    <option key={marca.id_brand} value={marca.name} style={{ borderRadius: "110px" }}>
                                        {marca.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="container">
                            <div className="input-container">
                                <div className="volumen">
                                    <label htmlFor="volumen"></label>
                                    <input
                                        type="number"
                                        id="volumen"
                                        name="volumen"
                                        step="0.01"
                                        placeholder="Volumen"
                                        onChange={(e) => setVolumen(e.target.value)}
                                        value={volumen}
                                        required
                                        disabled={presentacionCargada}
                                    />
                                </div>
                                <div className="unidad">
                                    <label htmlFor="unidad"></label>
                                    <select
                                        id="unidad"
                                        name="unidad"
                                        value={unidad}
                                        onChange={(e) => setUnidad(e.target.value)}
                                        disabled={presentacionCargada}
                                    >
                                        <option value="" disabled selected>
                                            Unidad
                                        </option>
                                        <option value="1">ml</option>
                                        <option value="2">L</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn-primary"
                            style={{
                                width: "177%",
                                display: "block",
                                marginTop: "-247%",
                                marginLeft: "-24%",
                            }}
                            type="submit"
                        >
                            Guardar
                        </button>
                    </form>
                </main>
                <ToastContainer />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Botella creada</h2>
                <img src={`data:image/png;base64, ${botellaCreada?.qr_str}`} alt="Descripción de la imagen"></img>
                <span className="label_codigo"><b>Codigo:</b> {botellaCreada?.code}</span>
                <a className="btn_descargar_img" download={`qr_bottle_${botellaCreada?.code}.png`} href={`data:image/png;base64, ${botellaCreada?.qr_str}`}>
                    Descargar
                </a>
            </Modal>
        </>
    );
}

export default Crear;
