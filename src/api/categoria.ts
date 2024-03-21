import axios from "axios";
import { API_BASE_URL } from "./API";

type Categoria = {
    id?: number,
    nombre: string,
    descripcion: string,
}

export const fetchCategorias = async () => {
    try {
        const categorias = await axios.get(`${API_BASE_URL}/categorias`);
        const res = categorias ;
        return res;
    } catch (error) {
        console.error(error);
    }
}