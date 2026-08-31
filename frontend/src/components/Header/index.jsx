import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";

const Header = () => {
  const { role, username, logout } = useAuth();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>INVENTORY</h1>
      <span className={styles.userInfo}>{username} ({role})</span>
      <div className={styles.actions}>
        <button 
         type="button" 
         className={styles.logoutBtn} 
         onClick={logout} 
         title="Logout">
          <i className="bi bi-box-arrow-right"></i>
        </button>

        {role === "admin" && (
          <Link to="/users" className={styles.usersBtn}>
            <i className="bi bi-people"></i> Users
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;