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
                <a href="/store">Store</a>
            </nav>
        );
    }

    return (
        <nav>
            <button onClick={logout}>Logout</button>
            <span> | </span>
            <a href="/store">Store</a>
            <span> | </span>
            <a href="/dashboard">Dashboard</a>
        </nav>
    );
};

export default Navigator;
