import { useState } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { useAuth } from '../hooks/useAuth';
import { NavLink } from 'react-router';
const Navigator = () => {

    const user = useSessionStore(state => state.user);

    const isAuthenticated = !!user;

    const { logout } = useAuth()

    if (!isAuthenticated) {
        return (
            <nav>
                <NavLink to="/login">Login/SignUp</NavLink>
                <span> | </span>
                <NavLink to="/store">Store</NavLink>
            </nav>
        );
    }
    
    return (
        <nav>
            <button onClick={logout}>Logout</button>
            <span> | </span>
            <NavLink to="/store">Store</NavLink>
            <span> | </span>
            <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
    );
};

export default Navigator;
