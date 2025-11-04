import { NavLink } from "react-router";
import { useState } from "react";
import "../assets/styles/Login.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { login, signup, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (isSignUp) {
                await signup(email, password);
            } else {
                await login(email, password);
            }
        } catch (error) {
            console.error("Error en autenticación:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">{isSignUp ? "Sign Up" : "Login"}</h2>
                
                <div className="input-group">
                    <label className="input-label">Email</label>
                    <input
                        className="login-input"
                        type="email"
                        placeholder="tu@ferreteria.com.ar"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Password</label>
                    <input
                        className="login-input"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <button 
                    className="login-button" 
                    type="submit"
                    disabled={loading}
                >
                    {loading 
                        ? "Cargando..." 
                        : isSignUp ? "Sign Up" : "Log In"
                    }
                </button>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <p onClick={toggleMode} style={{ cursor: 'pointer' }}>
                    {isSignUp
                        ? "¿Ya tenés cuenta? Iniciar sesión"
                        : "¿No tenés cuenta? Registrate"}
                </p>

                <div>
                    <NavLink to="/" replace>
                        Home
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;