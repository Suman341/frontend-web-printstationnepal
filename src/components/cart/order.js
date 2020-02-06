import React from "react";


export default class Order extends React.Component {

    render() {
        const {order} = this.props;
        const {name, price, image} = order.product || {};

        return (
            <div className="infoWrap">
                <div className="cartSection">
                    <img src={`http://localhost:5000/${image}`} alt={name}
                         className="itemImg"/>

                    <p className="itemNumber">#{order._id}</p>
                    <h3>{name}</h3>

                    <p><input type="text" className="qty" disabled value={order.quantity}/> x NRs {price}</p>

                    <p className="stockStatus"> {order.status}</p>
                </div>

                <div className="prodTotal cartSection">
                    <p>NRs {order.quantity * price}</p>
                </div>
            </div>
        );
    }
}