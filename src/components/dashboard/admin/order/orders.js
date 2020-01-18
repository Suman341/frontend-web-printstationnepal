import React from "react";
import Order from "./order-item";
import '../../../../assets/product.css';

export default class Orders extends React.Component {
    render() {
        return (
            <div>
                <div className="wrap cf">
                    <h1 className="projTitle">Product Requests</h1>
                    {/*<div className="heading cf">*/}
                    {/*    <h1>My Cart</h1>*/}
                    {/*    <a href="#" className="continue">Continue Shopping</a>*/}
                    {/*</div>*/}
                    <div className="cart">
                        <ul className="cartWrap">
                            {
                                (this.props.products || []).map(item => {
                                    return <li className="items">
                                        <Order key={item._id} order={item}/>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}