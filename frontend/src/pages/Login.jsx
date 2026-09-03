import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Preencha todos os campos.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await login(username, password);
        } catch (err) {
            setError(err.response?.data?.error || "Servidor indisponível");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>INVENTORY</h1>

            <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            />

            <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            />

            <button
                className={styles.btn}
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Login;