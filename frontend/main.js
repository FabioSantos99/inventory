import './css/body.css';
import './css/container.css';
import './css/header.css';
import './css/responsive.css';
import './css/theme.css';
import './css/form.css';
import './css/table.css';
import './css/toolbar.css';
import './css/edit.css';
import './css/utilities.css';
import './css/rowButtons.css';

import { loadProducts } from './inventoryFunctions/loadProducts.js';

window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (token) {
        await loadProducts();
    }
})


