import { putProducts } from "./addProducts";
import { getAllProducts } from "../api";

export const loadProducts = async () => {

    try {
        const products = await getAllProducts();
        products.forEach((p) => {
            putProducts(p.name, p.price, p.quantity, p.type, p.id);
        })
    } catch (err) {
        console.log(err);
    }
}