import axios from "axios";
import { ADD_PRODUCT, SET_PRODUCTS, PRODUCT_FETCHED, PRODUCT_UPDATED, PRODUCT_DELETED } from "./types";

export function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        products
    };
}

export function addProduct(product) {
    return{
        type: ADD_PRODUCT,
        product
    }
}

export function productFetched(product) {
    return {
        type: PRODUCT_FETCHED,
        product 
    }
}

export function productUpdated(product) {
    return {
        type: PRODUCT_UPDATED,
        product 
    }
}

export function productDeleted(productId) {
    return {
        type: PRODUCT_DELETED,
        productId 
    }
}

export function saveProduct(data) {

    return dispatch => {
        return axios.post(`https://localhost:44318/api/product`, data)
            .then(resp => {
                console.log("---Data insert by Redux---", resp.data);
                dispatch(addProduct(resp.data))
            });
    };
}

export function updateProduct(data) {

    return dispatch => {
        return axios.put(`https://localhost:44318/api/product/${data.id}`, data)
            .then(resp => {
                console.log("---Data updated by Redux---", resp.data);
                dispatch(productUpdated(resp.data))
            });
    };
}
export function fetchProducts() {
    return dispatch => {
        return axios.get('https://localhost:44318/api/product')
            .then(res => {
                dispatch(setProducts(res.data));
            });
    }
}

export function fetchProduct(id) {
    return dispatch => {
        fetch(`https://localhost:44318/api/product/${id}`)
            .then(res => res.json())
            .then(data => dispatch(productFetched(data)))
            .catch(err => {
                console.log("-----Bad request----1", err);
            });
    }
}

export function deleteProduct(id) {

    return dispatch => {
        return axios.delete(`https://localhost:44318/api/product/${id}`)
            .then(resp => {
                console.log("---Data updated by Redux---", resp.data);
                dispatch(productDeleted(id))
            });
    };
}

