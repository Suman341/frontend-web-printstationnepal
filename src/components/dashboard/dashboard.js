import React, {Component} from 'react';
import DashHeader from './dashheader';
import ProductBody from "../products/productsbody";

class DashBody extends Component {

    render() {
        return (
            <div>
                <DashHeader/>
                <ProductBody/>
            </div>
        );
    }
}

export default DashBody;