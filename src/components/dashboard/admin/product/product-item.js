import React from 'react'
import axios from 'axios';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }

    deleteProduct = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:5000/product/' + this.props.product._id, this.state.config)
            .then(response => {
                console.log(response.data.message);
                alert(response.data.message);
                window.location.reload();
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
    };

    // updateProduct = (e) => {
    //     e.preventDefault();
    //     const {name, price, category} = this.state;

    //     let categoryBody = {category: name, price};

    //     axios.put('http://localhost:5000/category/'+ category._id, categoryBody, this.state.config)
    //         .then(response => {
    //             console.log(response.data.message);
    //             this.setState({
    //                 success: response.data.message
    //             });
    //             setTimeout(function () {
    //                 window.location.reload()
    //             }, 3000);
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 error: "Something went wrong. Try again!"
    //             });
    //             console.log(error.message)
    //         })
    // };


    render() {
        const {_id, name, image, price, category} = this.props.product;
        return (
            <div className="infoWrap">
                <div className="cartSection">
                    <img src={`http://localhost:5000/${image}`} alt={name}
                         className="itemImg"/>

                    <p className="itemNumber">#{_id}</p>
                    <h3>{name}</h3>

                    <p>NRs {price}</p>

                    <p className="stockStatus"> {category && category.category}</p>
                </div>
                <div className="cartSection removeWrap">
                    <button onClick={this.deleteProduct} className="btn btn-inverse-danger btn-fw">Remove</button>
                </div>
                <div className="cartSection removeWrap">
                    <button onClick={this.updateProduct} className="btn btn-primary mr-2 float-left">Update</button>
                </div>
            </div>
        )

    }
}