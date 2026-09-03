import { useState } from "react";
import { saveProduct } from "../../services/api";
import styles from "./ProductForm.module.css";

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !quantity || !type) {
      return alert("Preencha todos os campos.");
    }

    try {
      const { data } = await saveProduct({
        name,
        price: parseFloat(price),
        quantity,
        type,
      });
      onProductAdded(data);
      setName("");
      setPrice("");
      setQuantity("");
      setType("");
    } catch {
      alert("Erro ao salvar produto.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formControl}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={styles.input}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.select}
          id="typePdt"
        >
          <option value="">Type pdt</option>
          <option value="phone">Phone</option>
          <option value="console">Console</option>
          <option value="computer">Computer</option>
          <option value="tv">TV</option>
          <option value="Other">Other</option>

        </select>
      </div>
      <button type="submit" className={styles.button}>
        Add <i className="bi bi-plus"></i>
      </button>
    </form>
  );
};

export default ProductForm;