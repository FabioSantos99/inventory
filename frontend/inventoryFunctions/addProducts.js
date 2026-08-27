import { saveProduct } from "../api";

const names = document.querySelector("#name");
const price = document.querySelector("#price");
const quantity = document.querySelector("#quantity");
const typePdt = document.querySelector("#typePdt");
const pdtList = document.querySelector("#product-list");
const inventoryForm = document.querySelector("#inventory-form");

// Fixed typo: parseFloat
const isValidPrice = (value) => !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0;

const isValidQuantity = (value) => Number.isInteger(Number(value)) && Number(value) >= 0;

export const putProducts = (name, price, quantity, type, id = null) => {
    const product = document.createElement('tr');
    product.classList.add("prod", type);
    if (id) product.dataset.id = id;

    [name, price, quantity, type].forEach((val) => {
        const td = document.createElement("td");
        td.textContent = val;
        product.appendChild(td);
    });

    const td1 = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.classList.add("edit-item");
    editBtn.textContent = "Edit";
    td1.appendChild(editBtn);
    product.appendChild(td1);

    const td2 = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-item");
    deleteBtn.textContent = "Delete";
    td1.appendChild(deleteBtn);
    product.appendChild(td2);

    pdtList.appendChild(product);
};

inventoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameVal = names.value.trim();
    const priceVal = price.value.trim();
    const quantityVal = quantity.value.trim();
    const typeVal= typePdt.value;

    if(!nameVal) return alert("Por favor insira o nome do produto.");
    if(!isValidPrice(priceVal)) return alert("Por favor insira um preço válido.");
    if(!isValidQuantity(quantityVal)) return alert("Por favor insira uma quantidade.");
    if(!typeVal) return alert("Por favor selecione o tipo do produto.");

    const formatPrice = parseFloat(priceVal).toFixed(2);

    try {
        const saved = await saveProduct({
            name: nameVal,
            price: formatPrice,
            quantity: quantityVal,
            type: typeVal,
        });

        putProducts(saved.name, saved.price, saved.quantity, saved.typ, saved.id);

        names.value = "";
        price.value = "";
        quantity.value = "";
        typePdt.value = "";
    } catch {
        alert("Erro ao salvar produto. Verifique se o servidor está rodando.");
    }
});