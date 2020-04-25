import axios from 'axios';

import { store } from '../app/store';
import { Product } from "../features/productSlice";

const axiosConfig = () => {
    const state = store.getState();

    const token = state.auth.token;

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

const create = async (name: string, stocked: boolean) => {
    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/`,
        {name, stocked},
        axiosConfig()
    );

    return response.data as Product;
};

const update = async (product: Product) => {
    const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/products/${product.id}/`,
        product,
        axiosConfig()
    );

    return response.data as Product;
};

const remove = async (product: Product) => {
    await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/${product.id}`,
        axiosConfig()
    );

    return product;
};

const retrieveAll = async () => {
    const response = await axios.get<Product[]>(
        `${process.env.REACT_APP_API_URL}/api/products/`,
        axiosConfig()
    );

    return response.data as Product[];
}

export {
    create,
    update,
    remove,
    retrieveAll
}
