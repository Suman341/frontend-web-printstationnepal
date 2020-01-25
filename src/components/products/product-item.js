import React from 'react';
import './product.css';

class ProductRep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productid: this.props.pid,
            productname: this.props.pname,
            productprice: this.props.pprice,
            productcategory: this.props.pcategory,
            productimage: this.props.pimage,
            addedbyName: localStorage.getItem('name'),
            addedbyID: localStorage.getItem('id'),
            success: "",
            error: "",
            productQuantity: 0,
            config: {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }

    handleChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        )
    };

    stepDown = (e) => {
        e.preventDefault();
        if (this.state.productQuantity <= 0) {
            return;
        }
        this.setState({productQuantity: this.state.productQuantity - 1});
    };

    stepUp = (e) => {
        e.preventDefault();
        this.setState({productQuantity: this.state.productQuantity + 1});
    };

    cartAdd = (e) => {
        e.preventDefault();
        if (this.state.productQuantity <= 0) {
            alert("Please Choose Product Quantity first");
        } else {
            let product = {
                productId: this.state.productid,
                name: this.state.productname,
                price: this.state.productprice,
                category: this.state.productcategory,
                quantity: this.state.productQuantity,
                orderedBy: this.state.addedbyName,
                userId: this.state.addedbyID,
                image: this.state.productimage
            };
            let wishList = [];
            try {
                wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
            } catch (e) {
            }
            wishList = wishList.filter(item => {
                const isSelectedItem = item.productId === product.productId;
                if (isSelectedItem) {
                    product.quantity += item.quantity;
                }
                return !isSelectedItem;
            });
            wishList.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishList));
            alert("Product added to cart");
            setTimeout(function () {
                window.location.reload()
            }, 1000);

        }
    };

    render() {
        const {name, image, price
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            , category} = this.props.product;
        return (
            <div>
                <div className="product">
                    <div className="img-container">
                        <img className="img-fluid mb-3" src={`http://localhost:5000/${image}`} alt={name}/>
                    </div>
                    <div className="product-info">
                        <div className="col product-content " style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            flex: '1'
                        }}>
                            <div style={{flex: "1"}}>
                                <h1>{name}</h1>
                            </div>
                            <div className='col' style={{flex: "1"}}>
                                <div className='default-margin'>
                                    <p>{category && category.category}</p>
                                </div>
                                <div>
                                    <p>NRs. {price}</p>
                                </div>
                            </div>
                            <div style={{flex: "1"}}>
                                <div className='default-margin'>
                                    <form>
                                        <div className="def-number-input number-input safari_only">
                                            <button onClick={this.stepDown} className="minus"></button>
                                            <input type="number" name="productQuantity" className="quantity" min="0"
                                                   value={this.state.productQuantity} onChange={this.handleChange}/>
                                            <button onClick={this.stepUp} className="plus"></button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="buttons" style={{flex: "1"}}>
                                <input type="submit" className="button add" onClick={this.cartAdd}
                                       value="Add to cart"/>
                                <span className="button" id="price">NRs. {price * this.state.productQuantity}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )

    }
}

export default ProductRep;