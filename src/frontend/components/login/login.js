import React, { Component } from 'react';
import Navbar from '../../../frontend/components/navbar/navbar';
import './login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            userType: '',
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nombre de usuario:', this.state.username);
        console.log('Contraseña:', this.state.password);
        console.log('Tipo de usuario:', this.state.userType);
        // Aquí puedes agregar la lógica de autenticación, como enviar datos al servidor
        // o autenticar al usuario localmente.
    }

    render() {
        const inputStyle = {
            borderRadius: '28px',
            background: '#646464',
            boxShadow: '0 0 10px #D4AF37',
            color: '#D4AF37'
        };

        return (
            <div className="container mt-5">
                <Navbar />
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card card-style">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className='form-style'>
                                <div className='login'>
                                <h2 className="card-title title-style">Iniciar Sesión</h2>
                                <img src="/images/holy-hd.png" alt="Logo de HolyLabel" className="logo-login"/>
                                <h2 className="title-style-log" >HolyLabel</h2>
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
                                            name="userType"
                                            value={this.state.userType}
                                            onChange={this.handleInputChange}
                                            className="form-select input-style"
                                        >
                                            <option value="" disabled selected>Tipo de Usuario</option>
                                            <option value="Licoreras">Licoreras</option>
                                            <option value="Fabricantes">Fabricantes</option>
                                            <option value="Distribuidoras">Distribuidoras</option>
                                        </select>
                                    </div>
                                    <a className='f-password'>Olvidé mi contraseña</a>
                                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
