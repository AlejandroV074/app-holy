import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Crear() {
    const [nombre, setNombre] = useState("");
    const [marcas, setMarcas] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
    const [volumen, setVolumen] = useState("");
    const [unidad, setUnidad] = useState("ml");

    useEffect(() => {
        fetch("https://holylabelapi.azurewebsites.net/marca/")
            .then((response) => response.json())
            .then((data) => setMarcas(data))
            .catch((error) =>
                console.error("Error al obtener las marcas:", error)
            );
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const marcaEncontrada = marcas.find(marca => marca.name === marcaSeleccionada);

            if (!marcaEncontrada) {
                console.error("Error: No se encontró la marca correspondiente al nombre seleccionado.");
                toast.error("Error inesperado. Por favor, intenta nuevamente más tarde.");
                return;
            }

            const response = await fetch(
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

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                toast.success("Guardado exitosamente");
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

    return (
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
                        />
                    </label>
                    <label>
                        <select
                            style={{ marginTop: "5%", height: "80px", width: "28%" }}
                            className="buscar-pres"
                            value={marcaSeleccionada}
                            onChange={(e) => setMarcaSeleccionada(e.target.value)}
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
                                    required
                                />
                            </div>
                            <div className="unidad">
                                <label htmlFor="unidad"></label>
                                <select
                                    id="unidad"
                                    name="unidad"
                                    onChange={(e) => setUnidad(e.target.value)}
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
    );
}

export default Crear;
