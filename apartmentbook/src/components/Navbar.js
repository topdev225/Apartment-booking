import React, { Component } from 'react';

import logo from '../images/apartmentLogo.png';
import { GoThreeBars as Hamburger } from "react-icons/go";
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
    state = {
        isOpen: false,
        authenticated: this.props.isAuthenticated
    }

    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userID");
        this.props.history.push('/');
    }

    render() {
        const role = localStorage.getItem("role");
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/apartments">
                            <img src={logo} alt="apartment book" style={{ width: "250px", height: "auto" }} />
                        </Link>
                        <button type="button" className="nav-btn" onClick={this.handleToggle}>
                            <Hamburger className="nav-icon" />
                        </button>
                    </div>
                    {this.state.authenticated && <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                        <li>
                            <Link to={'#'} onClick={()=>this.props.history.push("/apartments")} >Home</Link>
                        </li>
                        <li>
                            {role === "0" ? 
                                <>
                                    <Link to={'#'} onClick={()=>this.props.history.push("/users")} >Manage</Link> 
                                    <ul className="navbar-dropdown">
                                        <li><Link to={'#'} onClick={()=>this.props.history.push("/users")} >Users</Link></li>
                                        <li><Link to={'#'} onClick={()=>this.props.history.push("/realtors")} >realtors</Link></li>
                                        <li><Link to={'#'} onClick={()=>this.props.history.push("/manageapartments")} >Apartments</Link></li>
                                    </ul>
                                </> 
                                    : 
                            role === "1" ?
                                <Link to={'#'} onClick={()=>this.props.history.push("/manageapartments")} >Manage apartment</Link>
                                    :
                                ''
                            }
                        </li>
                        <li>
                            <Link to={'#'} onClick={this.logout} >Logout</Link>
                        </li>
                    </ul>}
                </div >
            </nav >
        );
    }
}
export default withRouter(Navbar);
