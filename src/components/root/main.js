import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/frontend.css';


import RouteRes from "../interceptor/restrict";

import AdminDashboard from '../dashboard/admin/dashboard';
import ProductBody from '../products/productsbody';
import AddProducts from '../dashboard/admin/product/productsadd';
import ViewProducts from '../dashboard/admin/product/viewproducts';
import ViewCategory from '../dashboard/admin/category/categories';
import AdminProfile from '../dashboard/admin/profile/profile';
import RegisterAdmin from '../dashboard/admin/newuser/newadmin';
import AddCategory from "../dashboard/admin/category/category_add";
import UpdateCategory from "../dashboard/admin/category/category_update";

import MainUserCart from '../cart/cart';
import UserList from '../dashboard/admin/newuser/userlist';

import AuthScreen from "../auth/auth-screen";

class RootComponent extends Component {

    render() {
        return (
            <div style={{
                height: "inherit"
            }}>
                <Switch>
                    <Route path="/" exact component={DefaultContainer}/>

                    {/* links for login */}
                    <RouteRes path="/dashboard" component={ProductBody}/>
                    <RouteRes path="/admin/dashboard" component={AdminDashboard}/>
                    <RouteRes path="/addproducts" component={AddProducts}/>
                    <RouteRes path="/admin/products" component={ViewProducts}/>
                    <RouteRes path="/admin/category" component={ViewCategory}/>
                    <RouteRes path="/addcategory" component={AddCategory}/>
                    <RouteRes path="/updatecategory/:id" component={UpdateCategory}/>
                    <RouteRes path="/admin/profile/:id" component={AdminProfile}/>
                    <RouteRes path="/user/cart" component={MainUserCart}/>
                    <RouteRes path="/registeradmin" component={RegisterAdmin}/>
                    <RouteRes path="/admin/users" component={UserList}/>
                    {/* end */}
                </Switch>
            </div>
        );
    }
}

const DefaultContainer = () => (
    <div style={{height: 'inherit'}}>
        <Route path="/" exact component={AuthScreen}/>
    </div>
);

export default RootComponent;