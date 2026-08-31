import { useAuth } from "../../context/AuthContext";
import styles from "./ProductTable.module.css";

const ProductTable = ({ products, onEdit, onDelete }) => {
    const { role } = useAuth();

    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    <th className={styles.th}>Product</th>
                    <th className={styles.th}>Price</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Type</th>
                    <th colSpan="2" className={styles.define}></th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {products.map((p) => (
                    <tr key={p.id} className={`prod ${p.type}`}>
                        <td className={styles.td}>{p.name}</td>
                        <td className={styles.td}>{p.price}</td>
                        <td className={styles.td}>{p.quantity}</td>
                        <td className={styles.td}>{p.type}</td>
                        <td className={styles.td}>
                            <button 
                            type="button"
                            className="edit-item"
                            onClick={() => onEdit(p)}
                            >
                                Edit
                            </button>
                        </td>

                        <td className={styles.td}>
                            { role === "admin" && (
                                <button
                                type="button"
                                className={styles.deleteButton}
                                onClick={() => onDelete(p.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;