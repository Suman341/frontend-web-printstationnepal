import React, {Component} from 'react';
import AdminNav from './adminheader';
import '../../css/adminpanel.css';
import MainFooter from '../adminfooter';
import axios from 'axios';
import Orders from "./order/orders";


class AdminDashBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            userId: localStorage.getItem('id'),
            config: {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/order/requests/', this.state.config)
            .then((response) => {
                this.setState({orders: response.data.data})
            });
    }

    render() {
        return (
            <div className="container-scroller" id="page-content-wrapper">
                <AdminNav/>
                <div className="container-fluid content-wrapper">
                    <div className="row">
                        <div className="col-sm-9 col-md-12 col-lg-5 mx-auto">
                            <Orders products={this.state.orders}/>
                        </div>
                    </div>
                </div>
                <MainFooter/>
            </div>
        );
    }
}

export default AdminDashBody;