import React, {Component} from 'react';
import AdminHead from '../adminheader';
import axios from 'axios';

import '../../../../assets/product.css';

import Product from './product-item';
import {NavLink} from 'react-router-dom';

class ViewProducts extends Component {
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
        axios.get('http://localhost:5000/products/getAll', this.state.config)
            .then((response) => {
                this.setState({
                    products: response.data.data
                })
            });
    }

    render() {
        return (
            <div>
                <AdminHead/>
                <div className="container-fluid content-wrapper">
                    <div className="row">
                        <div className="wrap cf">
                            <h1 className="projTitle">Products</h1>
                            <div className="heading cf">                               
                                <NavLink to="/addproducts" className="continue">Add Product</NavLink>
                            </div>
                            <div className="cart">
                                <ul className="cartWrap">
                                    {
                                        (this.state.products || []).map(item => {
                                            return <li className="items">
                                                <Product key={item._id} product={item}/>
                                            </li>
                                        })
                                    }
                                </ul>
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

export default ViewProducts;