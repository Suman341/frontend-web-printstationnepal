import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';


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
                <NavLink className="navbar-brand brand-logo mr-5" to="/dashboard">
                    <span>PrintStation Nepal Dashboard</span>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item"><NavLink className="navbar-brand sub-navlink" to="/user/cart">Your
                            cart</NavLink></li>
                        <li className="nav-item">
                            <button className="btn btn-primary" type="submit" onClick={this.logoutHandle}>Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>


        );
    }
}

export default withRouter(DashHeader);