import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            type_user: "",
            loginSuccessful: false,
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append(
            "Access-Control-Allow-Methods",
            "DELETE, POST, GET, OPTIONS"
        );
        myHeaders.append(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, X-Requested-With"
        );

        var raw = JSON.stringify({
            user: this.state.username,
            password: this.state.password,
            type_user: this.state.type_user,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://holylabelapi.azurewebsites.net/api-token-auth/", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result === "Login successful") {
                    this.setState({ loginSuccessful: true });
                    toast.success("Logeo exitoso");
                    console.log("Inicio de sesión exitoso");
                } else {
                    toast.error("Usuario inválido");
                    console.log("Usuario inválido");
                }
            })
            .catch((error) => console.log("error", error));
    };

    render() {
        return (
            <div className="">
                <Navbar />
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card card-style">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="form-style">
                                    <div className="login">
                                        <h2 className="card-title title-style">Iniciar Sesión</h2>
                                        <img
                                            src="/images/holy-hd.png"
                                            alt="Logo de HolyLabel"
                                            className="logo-login"
                                        />
                                        <h2 className="title-style-log">HolyLabel</h2>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.handleInputChange}
                                                className="form-control input-style"
                                                placeholder="Nombre de usuario"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleInputChange}
                                                className="form-control input-style"
                                                placeholder="Contraseña"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <select
                                                name="type_user"
                                                value={this.state.type_user}
                                                onChange={this.handleInputChange}
                                                className="form-select input-style"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Tipo de Usuario
                                                </option>
                                                <option value="Decanter">Licoreras</option>
                                                <option value="Factory">Fabricantes</option>
                                                <option value="Distributor">Distribuidoras</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Iniciar Sesión
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default Login;
