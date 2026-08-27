const BASE_URL = "http://localhost:3000";

const authHeaders = () => ({
    "Content_Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const handleUnauthorized = (res) => {
    if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        window.location.href = "login/index.html"
    }
};

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`, { headers: authHeaders() });
  handleUnauthorized(res);
  if (!res.ok) throw new Error("Erro ao buscar produtos.");
  return res.json();
};

export const saveProduct = async ({ name, price, quantity, type}) => {
    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ name, price, quantity, type }),
    });
    handleUnauthorized(res);
    if(!res.ok) throw new Error("Erro ao salvar produto.");
    return res.json();
}

export const removeProduct = async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    handleUnauthorized(res);
    if(res.status === 403) throw new Error("Apenas admins podem deletar produtos.");
    if(!res.ok) throw new Error("Erro ao remover produto.");
};

export const updateProduct = async(id, { name, price, quantity, type}) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({name, price, quantity, type}),
    });
    handleUnauthorized(res);
    if (!res.ok) throw new Error("Erro ao atualizar produto.");
    return res.json();
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "login/index.html"
};