import axios from 'axios';
import { Dispatch } from 'redux';
import { BASE_API_URL } from '../../appConfig';

export const loadCategories = async (dispatch: Dispatch) => {
    dispatch({ type: 'LOADING_CATEGORIES' });
    const { data } = await axios.get(`${BASE_API_URL}/categories`);
    dispatch({ type: 'CATEGORIES_LOADED', payload: data });
}