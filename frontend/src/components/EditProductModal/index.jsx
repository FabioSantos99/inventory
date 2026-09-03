import { useState, useEffect } from "react";
import { updateProduct } from "../../services/api";
import styles from "./EditProductModal.module.css";

const EditProductModal = ({ product, onClose, onUpdated }) => {
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    quantity: "",
    type: "",
  });

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditForm({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        type: product.type,
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();  
    try {
      await updateProduct(product.id, {
        ...editForm,
        price: parseFloat(editForm.price),
      });

      onUpdated({
        ...product,
        ...editForm,
        price: parseFloat(editForm.price).toFixed(2),
      });

      onClose();

    } catch {
      alert("Erro ao atualizar produto.");
    }
  };

  if (!product) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Edit Product:</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.input}
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            className={styles.input}
            value={editForm.price}
            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            placeholder="Price"
          />
          <input
            type="text"
            className={styles.input}
            value={editForm.quantity}
            onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
            placeholder="Quantity"
          />
          <select
            className={styles.select}
            value={editForm.type}
            onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
          >
            <option value="">Type pdt</option>
            <option value="phone">Phone</option>
            <option value="console">Console</option>
            <option value="computer">Computer</option>
            <option value="tv">TV</option>
            <option value="Other">Other</option>

          </select>
          <div className={styles.actions}>
            <button type="submit" className={styles.submitButton}>
              Confirm <i className="bi bi-check-square-fill"></i>
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;