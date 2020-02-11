import React, { Component } from 'react';
import AdminHead from '../adminheader';
import axios from 'axios';
import '../../../css/adminpanel.css';
import {NavLink} from 'react-router-dom';
import UserListLoop from './userlistloop';
import MainFooter from '../../adminfooter';

class ViewUserList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            success:"",
            error:"",
            allusers: [],
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    } 

    }

        render(){
            const usrlist = this.state.allusers.map((prolist,index)=>{
                return <UserListLoop key={prolist._id} 
                uid={prolist._id} 
                uname={prolist.firstname +" " + prolist.lastname} uemail={prolist.email}
                ucontactnum={prolist.phone} uadmin={prolist.admin}
                uaddress={prolist.address} />
            })
            return( 
                <div>
                    <AdminHead/>
                    <div className="container-fluid content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="font-weight-bold navbar-brand brand-logo">Product List</h4>
                                    </div>
                                    <div>
                                        <NavLink to="/registeradmin" className="btn btn-primary btn-icon-text btn-rounded">
                                        Add Admin</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card position-relative">
                                    <div className="card-body">
                                        <h4 className="card-title">List of available Product</h4>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>User Name</th>
                                                        <th>Email</th>
                                                        <th>Address</th>
                                                        <th>Contact</th>
                                                        <th>User Type</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                              
                                                    {usrlist}
                                          
                                            </table>
                                        </div>        
                                    </div>
                                </div>
                            </div>
                        </div>
                 <MainFooter/>
                </div>
            </div>
   
         
            );
        }
    }

export default ViewUserList;