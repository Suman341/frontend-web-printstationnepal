import React, { Component } from 'react';
import AdminHead from '../adminheader';
import axios from 'axios';
import '../../../css/adminpanel.css';
import {NavLink} from 'react-router-dom';

class AddProducts extends Component{
    constructor(){
        super();
        this.state={
            name: "",
            price:"",
            category:"",
            description:"",
            image:"",
            loggedinemail:localStorage.getItem('email'),
            success:"",
            error:"",
            categories: [],
            config: {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        };

        axios.get('http://localhost:5000/categories', this.state.config).then(response =>{
            this.setState({categories: response.data.data});
        });
    }

    handleChange = (e) => {
        this.setState(
            { [e.target.name]: e.target.value }
        )
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    handleImageChange = (e) => {
        this.getBase64(e.target.files[0], (result) =>{
            this.setState({
                image: result
              });
        })
      };

      productADD = (e) =>{
          e.preventDefault();
          const {name, price, category: categoryId, description, image} = this.state;

          let product = {name, price, categoryId, description, image};

          axios.post('http://localhost:5000/product', product, this.state.config)
            .then(response=> {
            console.log(response.data.message)            
            this.setState({
                success:response.data.message
            });
              setTimeout(function() {
                window.location.reload()
               }, 3000);
            })
            .catch(error=>{   
                this.setState({
                    error:"Something went wrong. Try again!"
                  })
                console.log(error.message)
                })
        }


        render(){
            return(
                <div className="container-scroller" id="page-content-wrapper">
                    <AdminHead/>
                    <div className="container-fluid content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="font-weight-bold navbar-brand brand-logo">Add New Product {this.state.success}</h4>
                                    </div>
                                  
                                    <div>
                                        <NavLink to="/admin/products" className="btn btn-primary btn-icon-text btn-rounded">Product List</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card position-relative">
                                    <div className="card-body">
                                        <h4 className="card-title">Enter Product Details</h4> 
                                        <div className="alert alert-info" style={{ display: this.state.success!=="" ? "" : "none" }}>
                                            {this.state.success}
                                        </div>
                                        <div className="alert alert-danger" style={{ display: this.state.error!=="" ? "" : "none" }}>
                                            {this.state.error}
                                        </div>
                                        <form className="forms-sample">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" className="form-control" name="name"
                                                value={this.state.name} onChange={this.handleChange}
                                                id="name" placeholder="Name" autoCapitalize="true" autoFocus/>
                                            </div>    
                                            <div className="form-group">
                                                <label htmlFor="price">Price</label> 
                                                <input type="text" className="form-control" name="price"
                                                value={this.state.price} onChange={this.handleChange}
                                                id="price" placeholder="Product Price"/>
                                            </div>   
                                            <div className="form-group">
                                                <label htmlFor="category">Category</label>
                                                <select value={this.state.category}  className="form-control" name="category" id="category" onChange={this.handleChange}>
                                                <option >Select Category</option>;
                                                    { 
                                                        this.state.categories.map(category => {
                                                            return  <option key={category._id} value={category._id}>{category.category}</option>;
                                                        })
                                                    }
                                                </select>
                                    
                                            </div>   
                                            <div className="form-group">
                                                <label htmlFor="image">Image</label> 
                                                <input type="file" name="image" onChange={this.handleImageChange} 
                                                id="image" className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description">Description</label> 
                                                <textarea className="form-control" id="description" name="description"
                                                onChange={this.handleChange} placeholder="Description"
                                                    rows="4"></textarea>
                                            </div>
                                            <input type="submit" onClick={this.productADD} className="btn btn-primary mr-2 float-left" />
                                            {/* <button className="btn btn-light float-left">Clear</button> */}
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

export default AddProducts;