import React from "react";
import axios from "axios";


export default class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderStatus: undefined,
            success: "",
            error: "",
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


    updateOrderStatus = (e) => {
        e.preventDefault();
        if (this.state.orderStatus === undefined) return;

        const requestData = {
            orderId: this.props.order._id,
            status: this.state.orderStatus
        };
        axios.post('http://localhost:5000/order/status', requestData, this.state.config)
            .then(response => {
                this.setState({
                    success: response.data.message,
                    error: undefined
                }, () => {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                });
            })
            .catch(error => {
                this.setState({
                    error: "Could not update the order status"
                });
            })
    };

    render() {
        const {order} = this.props;
        const {name, price, image} = order.product || {};
        const {firstname, lastname} = order.user || {};

        let orderStatus = [];
        const status = (order.status || "").toLowerCase();

        if (status === 'pending') {
            orderStatus = ['proceed'];
        } else if (status === 'proceed') {
            orderStatus = ['delivered'];
        }

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
                <div className="cartSection removeWrap">
                    {
                        status !== 'delivered' &&
                        (
                            <div>
                                <label className="btn btn-primary" data-toggle="modal"
                                       data-target={"#exampleModalCenter" + order._id}>Respond</label>
                                <div className="modal fade" id={"exampleModalCenter" + order._id} tabIndex="-1"
                                     role="dialog"
                                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title first-cap"
                                                    id="exampleModalLongTitle">Response
                                                    for {firstname + " " + lastname}</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            {
                                                this.state.success &&
                                                <div className="alert alert-info">
                                                    {this.state.success}
                                                </div>
                                            }
                                            {
                                                this.state.error &&
                                                <div className="alert alert-danger">
                                                    {this.state.error}
                                                </div>
                                            }

                                            <div className="modal-body">
                                                <form className="forms-sample">
                                                    <div className="form-group">
                                                        <label htmlFor="status">Status</label>
                                                        <select value={this.state.orderStatus} className="form-control"
                                                                name="orderStatus"
                                                                id={"status" + order._id} onChange={this.handleChange}>
                                                            <option value={undefined}>Select Status</option>
                                                            {
                                                                orderStatus.map(status => {
                                                                    return <option key={status}
                                                                                   value={status}>{status}</option>;
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Close
                                                </button>
                                                <button type="submit" onClick={this.updateOrderStatus}
                                                        className="btn btn-primary">
                                                    send Response
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>
        );
    }
}