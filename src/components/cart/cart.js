import React, { Component } from 'react';
import DashMainHeader from '../dashboard/dashheader';
import CartBody from './cartbody';


class UserCart extends Component{

    render(){
        return(
            <div>
                <DashMainHeader/>

                <CartBody/>
            </div>
        );
    }
}

export default UserCart;