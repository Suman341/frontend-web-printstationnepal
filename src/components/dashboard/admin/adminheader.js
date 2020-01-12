import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import '../../css/adminheader.css';


class DashHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            config: {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }

    logoutHandle = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/');
    };

    render() {
        return (


            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand brand-logo mr-5" to="/admin/dashboard">
                    <span>PrintStation Dashboard</span>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink to="/admin/category" className="nav-link">
                                Category
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/products" className="nav-link">
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/users" className="nav-link">
                                User List
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <div className='row' style={{
                                borderStyle: "solid",
                                marginLeft: "8px",
                                borderWidth: '1px'
                            }}>
                                <NavLink to={"/admin/profile/" + localStorage.getItem('id')} className="nav-link">
                                    {localStorage.getItem('name')}
                                </NavLink>
                                <span className="nav-link" onClick={this.logoutHandle}>Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }
}

export default withRouter(DashHeader);