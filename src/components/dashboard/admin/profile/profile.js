import React, {Component} from 'react';
import AdminHead from '../adminheader';
import axios from 'axios';
import '../../../css/adminpanel.css';

class AdminProfileUpdate extends Component {
    constructor() {
        super();
        this.state = {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            phone: undefined,
            address: "",
            admin: "",
            success: "",
            error: "",
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        }
    }

    handleChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        )
    };

    updateUser = (e) => {
        e.preventDefault();
        const userdata = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            phone: this.state.phone,
            address: this.state.address
        };
        axios.put('http://localhost:5000/user/profile', userdata, this.state.config)
            .then(response => {
                this.setState({
                    success: response.data.message
                });
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
                this.setState({
                    error: (error.response && error.response.data.message) || "Could not update profile"
                });
            })
    };

    componentDidMount() {
        axios.get("http://localhost:5000/user/profile", this.state.config)
            .then(res => {
                console.log(res.data);
                this.setState({
                    firstName: res.data.data.firstname,
                    lastName: res.data.data.lastname,
                    email: res.data.data.email,
                    phone: res.data.data.phone,
                    address: res.data.data.address,
                    admin: res.data.data.admin
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return (
            <div>
                <AdminHead/>
                <div className="container-fluid content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            {/* <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="font-weight-bold navbar-brand brand-logo">User Profile Details</h4>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card position-relative">
                                {
                                    this.state.success &&
                                    <div className="alert alert-info">
                                        {this.state.success}
                                    </div>
                                }
                                {
                                    this.state.error &&
                                    <div className="alert alert-danger">
                                        {this.state.error}
                                    </div>
                                }
                                <div className="card-body">
                                    <h4 className="card-title">User Profile Details</h4>
                                    <form className="forms-sample">
                                        <div className="form-group">
                                            <label htmlFor="firstname">First Name</label>
                                            <input type="text" className="form-control" name="firstName"
                                                   value={this.state.firstName} onChange={this.handleChange}
                                                   id="firstname" placeholder="firstname" autoCapitalize="true"
                                                   autoFocus/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input type="text" className="form-control" name="lastName"
                                                   value={this.state.lastName} onChange={this.handleChange}
                                                   id="lastname" placeholder="lastname" autoCapitalize="true"
                                                   autoFocus/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Contact</label>
                                            <input type="text" className="form-control" name="phone"
                                                   value={this.state.phone} onChange={this.handleChange}
                                                   id="Phone" placeholder="Phone Number"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input type="text" className="form-control" name="address"
                                                   value={this.state.address} onChange={this.handleChange}
                                                   id="address" placeholder="Address" autoCapitalize="true"/>
                                        </div>
                                        <input type="submit" onClick={this.updateUser}
                                               className="btn btn-primary mr-2 float-left"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                            Copyright © 2020 Custom Printing Store.</span>
                    </div>
                </footer>
            </div>


        );
    }
}

export default AdminProfileUpdate;