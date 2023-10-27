import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./style.css";

function Crear() {
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [volumen, setVolumen] = useState("");
    const [unidad, setUnidad] = useState("ml");

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarHolyLabel(nombre, marca, parseInt(volumen), unidad);
    };

    const guardarHolyLabel = async (nombre, marca, volumen, unidad) => {
        try {
            const response = await fetch("/api/holyLabel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    marca,
                    volumen,
                    unidad,
                }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            console.log("HolyLabel saved successfully", data);
        } catch (error) {
            console.error("Error:", error);
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
                            class="buscar-pres"
                            placeholder="Nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            style={{ marginTop: "5%", height: "60px" }}
                            class="buscar-pres"
                            placeholder="Marca"
                            type="text"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                        />
                    </label>
                    <div class="container">
                        <div class="input-container">
                            <div class="volumen">
                                <label for="volumen"></label>
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
                            <div class="unidad">
                                <label for="unidad"></label>
                                <select id="unidad" name="unidad">
                                    <option value="" disabled selected>
                                        Unidad
                                    </option>
                                    <option value="ml">ml</option>
                                    <option value="L">L</option>
                                    onChange={(e) => setUnidad(e.target.value)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary" style={{width: '177%', display: 'block', marginTop: '-247%', marginLeft: '-24%'}} type="submit">Guardar</button>
                </form>
            </main>
        </div>
    );
}

export default Crear;
