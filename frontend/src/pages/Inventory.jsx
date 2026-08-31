import { useState, useEffect } from "react";
import { getAllProducts, removeProduct, saveProduct } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import * as XLSX from "xlsx";

import ProductForm from "../components/ProductForm";
import InventoryToolbar from "../components/InventoryToolbar";
import ProductTable from "../components/ProductTable"
import EditProductModal from "../components/EditProductModal";
import './Inventory.css';

const Inventory = () => {
    // eslint-disable-next-line no-unused-vars
    const { role } = useAuth();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [editingProduct, seEditingProduct] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await getAllProducts();
            setProducts(data);
        } catch {
            console.error("Erro ao carregar produtos.");
        }
    };

    const handleProductAdded = (newProduct) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    const handleEditOpen = (product) => {
        seEditingProduct(product);
    };

    const handleEditSave = (updatedProduct) => {
        setProducts((prev) => 
            prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } :p))
        );
        seEditingProduct(null);
    };

    const handleDelete = async (id) => {
        try {
            await removeProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !==id));
        } catch (err) {
            alert(err.response?.data?.error || "Erro ao remover produto.");
        }
    };

    const handleExport = () => {
        const csvString = [
            ["Name", "Price", "Quantity", "Type"],
            ...products.map((p) => [p.name, p.price, p.quantity, p.type]),
        ]
        .map((row) => row.join(","))
        .join("\n");

        const element = document.createElement("a");
        element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
        element.download = "products.csv";
        element.click();
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (ev) => {
            const data = new Uint8Array(ev.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { defval: ""});

            let imported = 0;
            for (const row of rows) {

                try {
                    const { data: saved } = await saveProduct({
                        name: String(row.name || row.Nome || ""),
                        price: parseFloat(row.price || row.preco || 0).toFixed(2),
                        quantity: String(row.quantity || row.quantidade || 0),
                        type: String(row.type || row.tipo || ""),
                    });
                    setProducts((prev) => [...prev, saved]);
                    imported++
                } catch {
                    console.error("Erro ao importar linha:", row);
                }
            }
            alert(`${imported} produto(s) importado(s)!`);
        };
        reader.readAsArrayBuffer(file);
        e.target.value = "";
    };

    const filteredProducts = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || p.type === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className=".container">
            <Header />

            <ProductForm onProductAdded={handleProductAdded} />

            <InventoryToolbar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                onImport={handleImport}
                onExport={handleExport}
            />
            <ProductTable 
                products={filteredProducts}
                onEdit={handleEditOpen}
                onDelete={handleDelete}
            />

            <EditProductModal
                product={editingProduct}
                onClose={() => seEditingProduct(null)}
                onUpdated={handleEditSave}
            />
        </div>
    );
};

export default Inventory;