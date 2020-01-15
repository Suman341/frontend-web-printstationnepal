import React, {Component} from 'react';
import AdminHead from '../adminheader';
import axios from 'axios';
import '../../../css/adminpanel.css';
import {NavLink} from 'react-router-dom';

class AddCategory extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            success: "",
            error: "",
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        };
    }

    handleChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        )
    };

    addCategory = (e) => {
        e.preventDefault();
        const {name} = this.state;

        let category = {category: name};

        axios.post('http://localhost:5000/category', category, this.state.config)
            .then(response => {
                console.log(response.data.message);
                this.setState({
                    success: response.data.message
                });
                setTimeout(function () {
                    window.location.reload()
                }, 3000);
            })
            .catch(error => {
                this.setState({
                    error: "Something went wrong. Try again!"
                });
                console.log(error.message)
            })
    };


    render() {
        return (
            <div className="container-scroller" id="page-content-wrapper">
                <AdminHead/>
                <div className="container-fluid content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="font-weight-bold navbar-brand brand-logo">Add New
                                        Category {this.state.success}</h4>
                                </div>

                                <div>
                                    <NavLink to="/admin/category" className="btn btn-primary btn-icon-text btn-rounded">Category
                                        List</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card position-relative">
                                <div className="card-body">
                                    <h4 className="card-title">Enter Category Details</h4>
                                    <div className="alert alert-info"
                                         style={{display: this.state.success !== "" ? "" : "none"}}>
                                        {this.state.success}
                                    </div>
                                    <div className="alert alert-danger"
                                         style={{display: this.state.error !== "" ? "" : "none"}}>
                                        {this.state.error}
                                    </div>
                                    <form className="forms-sample">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" name="name"
                                                   value={this.state.name} onChange={this.handleChange}
                                                   id="name" placeholder="Name" autoCapitalize="true" autoFocus/>
                                        </div>
                                        <input type="submit" onClick={this.addCategory}
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

export default AddCategory;