const names = document.querySelector("#name");
const price = document.querySelector("#price");
const quantity = document.querySelector("#quantity");
const typePdt = document.querySelector("#typePdt");
const pdtList = document.querySelector("#product-list");
const inventoryForm = document.querySelector("#inventory-form");

// Fixed typo: parseFloat
const isValidPrice = (value) => !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0;

const isValidQuantity = (value) => Number.isInteger(Number(value)) && Number(value) >= 0;

export const putProducts = (nameInput, priceInput, quantityInput, typePdtInput) => {
    const product = document.createElement('tr');
    product.classList.add("prod");

    const nameTitle = document.createElement('td');
    nameTitle.textContent = nameInput;
    product.classList.add(`${typePdtInput}`);
    product.appendChild(nameTitle);

    const priceTitle = document.createElement('td');
    priceTitle.textContent = priceInput;
    product.appendChild(priceTitle);

    const quantityTitle = document.createElement('td');
    quantityTitle.textContent = quantityInput;
    product.appendChild(quantityTitle);

    const typeTitle = document.createElement('td');
    typeTitle.textContent = typePdtInput;
    product.appendChild(typeTitle);

    const td1 = document.createElement("td");
    const editBtn = document.createElement("button");
    td1.appendChild(editBtn);
    editBtn.classList.add("edit-item");
    editBtn.textContent = 'Edit';
    product.appendChild(td1);

    const td2 = document.createElement("td");
    const deleteBtn = document.createElement("button");
    td2.appendChild(deleteBtn);
    deleteBtn.classList.add("delete-item");
    deleteBtn.textContent = 'Delete';
    product.appendChild(td2);

    pdtList.appendChild(product);
};

inventoryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = names.value.trim();
    const priceInput = price.value;
    const quantityInput = quantity.value;
    const typePdtInput = typePdt.value;

    if (nameInput && isValidPrice(priceInput) && isValidQuantity(quantityInput) && typePdtInput) {
        putProducts(nameInput, priceInput, quantityInput, typePdtInput);
        names.value = "";
        price.value = "";
        quantity.value = "";
        typePdt.value = "";
    } else {
        alert("Please enter valid product details.");
    }
});