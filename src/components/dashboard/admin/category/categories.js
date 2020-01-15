import React, {Component} from 'react';
import AdminHead from '../adminheader';
import axios from 'axios';
import '../../../css/adminpanel.css';
import {NavLink} from 'react-router-dom';

class ViewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            config: {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/categories', this.state.config)
            .then((response) => {
                this.setState({
                    products: response.data.data
                })
            });
    }

    render() {
        const categoryItems = this.state.products.map((category, index) => {
            return <CategoryItem key={category._id} id={category._id} name={category.category}/>
        });
        return (
            <div>
                <AdminHead/>
                <div className="container-fluid content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="font-weight-bold navbar-brand brand-logo">Category List</h4>
                                </div>
                                <div>
                                    <NavLink to="/addcategory" className="btn btn-primary btn-icon-text btn-rounded">
                                        Add New Category</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card position-relative">
                                <div className="card-body">
                                    <h4 className="card-title">List of available Categories</h4>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-striped">
                                            <thead>
                                            <tr>

                                                <th>Name</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {categoryItems}
                                            </tbody>
                                        </table>
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
            </div>


        );
    }
}

export default ViewCategory;


class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }

    deleteCategory = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:5000/category/' + this.props.id, this.state.config)
            .then(response => {
                console.log(response.data.message);
                alert(response.data.message);
                window.location.reload();
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
    };

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>
                    <button onClick={this.deleteCategory} className="btn btn-inverse-danger btn-fw">Remove</button>
                    <NavLink to={"/updatecategory/" + this.props.id} className="btn btn-primary btn-rounded">
                        Update</NavLink>

                </td>
            </tr>
        )

    }
}