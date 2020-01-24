import React, { Component } from 'react';
import DashMainHeader from '../dashboard/dashheader';
import Products from './products';

class ProductBody extends Component{

    render(){
        return(
            <div>
                <DashMainHeader/>

                <Products/>
            </div>
        );
    }
}

export default ProductBody;