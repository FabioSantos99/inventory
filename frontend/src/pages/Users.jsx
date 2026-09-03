import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, createUser, deleteUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import styles from "./Users.module.css";

const Users = () => {
    const { username, role, logout } = useAuth();
    const [users, setUsers] =             useState([]);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("");
    const [error, setError] =             useState("");

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadUsers();

    }, []);

    const loadUsers = async () => {
        try {
            const { data } = await getAllUsers();
            setUsers(data);
        } catch {
            console.error("Erro ao carregar usuários.");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newUsername || !newPassword || !newRole) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            const { data } = await createUser({
                username: newUsername,
                password: newPassword,
                role:     newRole,
            });
            setUsers((prev) => [...prev, data]);
            setNewUsername(""); setNewPassword(""); setNewRole("");
            setError("");
        } catch (err) {
            setError(err.response?.data?.error || "Erro ao criar usuário");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Tem certeza qu deseja remover este usuário?")) return;

        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch {
            alert("Erro ao remover usuário.")
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Users</h1>
                <div className={styles.actions}>
                    <Link to="/" className={styles.backBtn}>
                     <i className="bi bi-arrow-left"></i> Back
                    </Link>
                    <span className={styles.userInfo}>{username} ({role})</span>
                    <button 
                        type="button" 
                        className={styles.logoutBtn}  
                        onClick={logout} 
                        title="Logout"
                    >
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </header>

            <form className={styles.form} onSubmit={handleCreate}>
                <div className={styles.formControl}>
                    <input 
                    type="text"
                    placeholder="Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    />

                    <input 
                    type="password"
                    placeholder="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    >
                        <option value="">Role</option>
                        <option value="operator">Operator</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="add">
                    Add User <i className="bi bi-plus"></i>
                </button>
            </form>

            {error && <p className={styles.error}>{error}</p>}

     <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th className="define"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td className={styles.roleCell}>{u.role}</td>
              <td className={styles.actionCell}>
                <button type="button" className="delete-item" onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;