import api from "./request";

export const getProducts = async () => {
    const { data } = await api.get("http://localhost:5000/api/products");
    return data;
};

export const getProduct = async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const createProduct = async (product: any) => {
    const { data } = await api.post("/products", product);
    return data;
};
