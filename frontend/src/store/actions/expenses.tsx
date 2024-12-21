import axios from 'axios';
import { BASE_API_URL } from '../../appConfig';

import { Dispatch } from 'redux';
import exp from 'constants';

export const loadExpenses = async (dispatch: Dispatch) => {
    dispatch({ type: 'LOADING_EXPENSES' });

    const { data } = await axios.get(`${BASE_API_URL}/expenses`);
    // const response = await fetch('http://localhost:3001/expenses');
    // const data = await response.json();

    dispatch({ type: 'EXPENSES_LOADED', payload: data });

}


export const addExpense = async (dispatch: Dispatch, expense: any) => {
    dispatch({ type: 'LOADING_EXPENSES' });
    try {
        const { data } = await axios.post(`${BASE_API_URL}/expenses`, expense);
        dispatch({ type: 'ADD_EXPENSE', payload: data });
    } catch (e) {
        debugger;
        console.log(e);
    }


}