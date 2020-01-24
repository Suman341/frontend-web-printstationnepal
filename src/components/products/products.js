import React, { Component } from 'react';
import '../css/frontend.css';
import ProductList from './product-item';
import axios from 'axios';

class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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

   
    render(){
        const productItems = this.state.products.map((product,index)=>{
            return <ProductList key={product._id} product={product} pid={product._id} pname={product.name} pprice={product.price}
            pcategory={product.category} pimage={product.image} pdescription={product.description}/>
    
        });
        return(
            <section className="testimonials bg-light">
              <div className="container">
                <h1>PrintStation Products</h1>
                <div className="row">
                  
                 {productItems}
                 
                </div>
              </div>
            </section>
        );
    }
}

export default Products;