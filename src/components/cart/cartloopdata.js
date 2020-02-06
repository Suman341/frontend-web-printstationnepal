import React from 'react';

class ProductRep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            success: "",
            error: "",
            config: {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }


    handleChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value})
    };

    saveProduct(product) {
        let wishList = [];
        try {
            wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
        } catch (e) {
        }
        wishList = wishList.filter(item => {
            return item.productId !== product.productId;
        });
        wishList.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishList));
    }

    stepDown = (e) => {
        e.preventDefault();
        if (this.state.product.quantity <= 0) {
            return;
        }

        let product = this.state.product;
        product.quantity = product.quantity - 1;
        this.saveProduct(product);
        this.setState(product, () => {
            this.props.onChange && this.props.onChange();
        });
    };

    stepUp = (e) => {
        e.preventDefault();

        let product = this.state.product;
        product.quantity = product.quantity + 1;
        this.saveProduct(product);
        this.setState(product, () => {
            this.props.onChange && this.props.onChange();
        });
    };

    deleteCartItem = (e) => {
        e.preventDefault();
        let wishList = [];
        try {
            wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
        } catch (e) {
        }
        wishList = wishList.filter(item => {
            return item.productId !== this.state.product.productId;
        });
        localStorage.setItem('wishlist', JSON.stringify(wishList));

        this.setState({success: "Product removed from cart"}, () => {
            setTimeout(function () {
                window.location.reload()
            }, 1000);
        })
    };

    render() {
        const {name, image, price, quantity} = this.state.product || {};

        return (
            <div className="infoWrap">
                <div className="cartSection">
                    <img src={`http://localhost:5000/${image}`} alt={name} className="itemImg"/>

                    <p className="itemNumber">#{}</p>
                    <h3>{name}</h3>

                    <div className="def-number-input number-input safari_only">
                        <button onClick={this.stepDown} className="minus"></button>
                        <input type="number" name="productQuantity" className="quantity" min="0"
                               value={quantity} onChange={this.handleChange}/>
                        <button onClick={this.stepUp} className="plus"></button>
                    </div>
                    <p><input type="text" className="qty" disabled value={quantity}/> x NRs {price}</p>
                </div>

                <div className="prodTotal cartSection">
                    <p>NRs {quantity * price}</p>
                </div>

                <div>
                    <button className="btn btn-sm btn-danger" onClick={this.deleteCartItem}>Remove</button>
                </div>
            </div>
        );
    }
}

export default ProductRep;