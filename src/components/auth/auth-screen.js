import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from "axios";
import {Redirect} from "react-router-dom";

import '../../assets/auth.css';


export default class AuthScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            currentView: 'login'
        };
    }

    render() {
        const isLoginActive = 'login' === this.state.currentView;
        const registerViewStatus = !isLoginActive ? "active show" : "";
        const loginViewStatus = isLoginActive ? "active show" : "";

        return (
            <div className="register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome To PrintStation Nepal</h3>
                        <p>You are 30 seconds away from getting customised products!</p>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className={"nav-link " + registerViewStatus}
                                   id="home-tab" data-toggle="tab" href="#register"
                                   role="tab"
                                   aria-controls="register"
                                   aria-selected={!isLoginActive}>Registration</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + loginViewStatus}
                                   id="profile-tab" data-toggle="tab" href="#login" role="tab"
                                   aria-controls="login" aria-selected={isLoginActive}>Login</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className={"tab-pane fade " + (!isLoginActive ? "show active" : "")}
                                 id="register" role="tabpanel"
                                 aria-labelledby="home-tab">
                                <RegisterComponent onRegister={() => {
                                    console.log(this.state);
                                    this.setState({currentView: 'login'})
                                }}/>
                            </div>
                            <div className={"tab-pane fade "+ (isLoginActive ? "show active" : "")}
                                 id="login" role="tabpanel"
                                 aria-labelledby="profile-tab">
                                <LoginComponent/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            success: undefined,
            error: undefined,
            loginEmail: undefined,
            loginPassword: undefined,
            loggedIn: false,
            admin: false,
        }
    }

    login = () => {
        const loginData = {
            email: this.state.loginEmail,
            password: this.state.loginPassword,
        };

        axios.post(' http://localhost:5000/user/login', loginData)
            .then(response => {
                console.log("Login Response", response.data);
                const {_id: id, firstname, lastname, email, phone, address, admin} = response.data.data.user;

                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('id', id);
                localStorage.setItem('name', firstname + " " + lastname);
                localStorage.setItem('firstname', firstname);
                localStorage.setItem('lastname', lastname);
                localStorage.setItem('email', email);
                localStorage.setItem('contact', phone);
                localStorage.setItem('address', address);
                localStorage.setItem('super', admin);
                this.setState({loggedIn: true, admin: admin, email: undefined, password: undefined});
            }).catch(error => {
            this.setState({
                error: (error.response && error.response.data.message) || "Something went wrong. Try again!",
                success: undefined
            });
        })
    };

    handleChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        )
    };


    render() {
        if (this.state.loggedIn === true) {
            if (this.state.admin === true) {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/dashboard"/>
            }
        }

        return (
            <div>
                <h3 className="register-heading">Login</h3>
                <div className="row col-md-12 register-form">
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-8 col-sm-10">
                        {
                            this.state.error &&
                            <div className="alert alert-danger">
                                {this.state.error}
                            </div>
                        }
                        {
                            this.state.success &&
                            <div className="alert alert-info">
                                {this.state.success}
                            </div>
                        }
                        <div className="form-group"></div>
                        <div className="form-group"></div>
                        <div className="form-group"></div>
                        <div className="form-group">
                            <input type="email" name='loginEmail' className="form-control" placeholder="Email *"
                                   value={this.state.loginEmail} onChange={this.handleChange} autoFocus/>
                        </div>
                        <div className="form-group">
                            <input type="password" name='loginPassword' className="form-control"
                                   placeholder="Password *"
                                   value={this.state.loginPassword} onChange={this.handleChange} autoFocus/>
                        </div>

                        <input type="submit" className="btnLogin" value="Login" onClick={this.login}/>
                    </div>
                </div>
            </div>
        )
    }
}


class RegisterComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            password: undefined,
            phone: undefined,
            address: undefined,
            success: undefined,
            error: undefined,
        }
    }

    registerUser = (e) => {
        e.preventDefault();

        const userData = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            address: this.state.address
        };

        axios.post('http://localhost:5000/user/register', userData)
            .then(response => {
                this.setState(
                    {
                        success: response.data.message,
                        error: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        address: undefined,
                        phone: undefined,
                        email: undefined,
                        password: undefined,
                    },
                    () => {
                        this.props.onRegister && this.props.onRegister();
                    }
                );
            })
            .catch(error => {
                this.setState({
                    error: (error.response && error.response.data.message) || "Something went wrong. Try again!"
                });


            })
    };


    handleChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        )
    };

    render() {
        return (
            <div>
                <h3 className="register-heading">Sign up</h3>
                <form className="form-signUp" action='#' method='post'>
                    <div className="row col-md-12 register-form">

                        <div className='col-md-12'>
                            {
                                this.state.error &&
                                <div className="alert alert-danger">
                                    {this.state.error}
                                </div>
                            }
                            {
                                this.state.success &&
                                <div className="alert alert-info">
                                    {this.state.success}
                                </div>
                            }
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <input type="text" name='firstName' className="form-control"
                                       placeholder="First Name *" required
                                       value={this.state.firstName} onChange={this.handleChange} autoFocus/>
                            </div>
                            <div className="form-group">
                                <input type="text" name='lastName' className="form-control"
                                       placeholder="Last Name *"
                                       value={this.state.lastName} onChange={this.handleChange} autoFocus/>
                            </div>
                            <div className="form-group">
                                <input type="address" name='address' className="form-control"
                                       placeholder="Address *" value={this.state.address} onChange={this.handleChange}
                                       autoFocus/>
                            </div>
                            <div className="form-group">
                                <input type="text" minLength="10" maxLength="10" name="phone"
                                       className="form-control" placeholder="Your Phone Number *"
                                       value={this.state.phone}
                                       onChange={this.handleChange} autoFocus/>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <input type="email" name='email' className="form-control"
                                       placeholder="Your Email *"
                                       value={this.state.email} onChange={this.handleChange} autoFocus/>
                            </div>
                            <div className="form-group">
                                <input type="password" name='password' className="form-control"
                                       placeholder="Password *"
                                       value={this.state.password} onChange={this.handleChange} autoFocus/>
                            </div>
                            <input type="submit" className="btnRegister" value="Register" onClick={this.registerUser}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}