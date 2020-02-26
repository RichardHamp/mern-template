import React, { Component } from 'react';
//allows linking to different routes
import { Link } from 'react-router-dom';

//navbar from bootstrap
export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark nabvar-expand-lg">
                <Link to="/" className="navbar-brand">ReactApp</Link>
                <div className="">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}