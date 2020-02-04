import React, {Component} from 'react';
import CartLoopData from './cartloopdata';
import {NavLink} from 'react-router-dom';

import axios from 'axios';

import Order from "./order";
import '../../assets/product.css';

class CartBody extends Component {
    constructor(props) {
        super(props);

        let wishLists = this.loadWishList();

        this.state = {
            wishLists,
            orders: [],
            userId: localStorage.getItem('id'),
            success: undefined,
            error: undefined,
            config: {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/orders', this.state.config)
            .then((response) => {
                this.setState({orders: response.data.data})
            });

    }

    loadWishList() {
        try {
            return JSON.parse(localStorage.getItem('wishlist')) || [];
        } catch (e) {
        }
        return [];
    }

    handleChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        )
    };

    checkout = () => {
        let orders = [];
        this.state.wishLists.forEach(item => {
            orders.push({
                productId: item.productId,
                quantity: item.quantity
            })
        });
        axios.post('http://localhost:5000/product/order', {orders}, this.state.config)
            .then((response) => {
                localStorage.setItem('wishlist', JSON.stringify([]));

                alert(response.data.message);

                this.setState({
                    wishLists: [],
                    success: response.data.message,
                    error: undefined
                }, () => {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                });
            }).catch(error => {
            this.setState({
                error: (error.response && error.response.message) || "Something went wrong, please try again",
                success: undefined
            })
        });
    };

    render() {
        const wishListItems = this.state.wishLists.map((item, index) => {
            return <li className='items'>
                <CartLoopData key={item._id} cid={item._id} product={item} onChange={() => {
                    let wishLists = this.loadWishList();
                    this.setState({wishLists})
                }
                }/>
            </li>
        });
        let totalPrice = 0;
        this.state.wishLists.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        return (
            <div className="cart-body">
                {
                    this.state.success &&
                    <div className="alert alert-info" style={{display: this.state.success !== "" ? "" : "none"}}>
                        {this.state.success}
                    </div>
                }
                {
                    this.state.error &&
                    <div className="alert alert-danger" style={{display: this.state.error !== "" ? "" : "none"}}>
                        {this.state.error}
                    </div>
                }
                <div className="wrap cf">
                    <div className="heading cf">
                        <h1>My Wish lists</h1>
                        <NavLink to="/dashboard" className="continue">Continue Shopping</NavLink>
                    </div>
                    <div className="cart">
                        <ul className="cartWrap">
                            {wishListItems}
                        </ul>
                    </div>
                    <div className='default-margin align-content-end'>
                        <h3><strong>Total</strong></h3>
                        <p className="text-center"><strong>NPR {totalPrice}</strong></p>
                    </div>
                    <div className="col mb-2">
                        <div className="row default-margin">
                            <div className='col-md-6'></div>
                            <div className="wrap col-sm-8 col-md-4 text-right">
                                <button className="btn btn-md btn-block btn-info text-uppercase"
                                        onClick={this.checkout}>Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrap cf">
                    <div className="heading cf">
                        <h1>My Orders</h1>

                    </div>
                    <div className="cart">
                        <ul className="cartWrap">
                            {
                                (this.state.orders || []).map(item => {
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

export default CartBody;