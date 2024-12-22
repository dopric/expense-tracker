import axios from 'axios';
import { Dispatch } from 'redux';
import { BASE_API_URL } from '../../appConfig';

export const loadCategories = async (dispatch: Dispatch) => {
    dispatch({ type: 'LOADING_CATEGORIES' });
    console.log("loading categories")
    const { data } = await axios.get(`${BASE_API_URL}/categories`);
    console.log("categories loaded")
    dispatch({ type: 'CATEGORIES_LOADED', payload: data });
}

export const updateCategory = async (dispatch: Dispatch, category: any) => {
    dispatch({ type: 'UPDATE_CATEGORY' });
    try {

        const result = await axios.put(`${BASE_API_URL}/categories/${category.id}`, category);
        if (result.status === 200) {
            dispatch({ type: 'CATEGORY_UPDATED', payload: category });
        } else {
            console.log("Error updating category");
        }

        loadCategories(dispatch);
    } catch (error) {
        console.log("Error updating category");
    }
}