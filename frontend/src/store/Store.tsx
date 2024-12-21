import { createContext, useReducer } from "react";
import { ReactNode } from "react";
import expensesSlice from "./slices/expenses";
import categoriesSlice from "./slices/categories";
import transactionsSlice from "./slices/transactions";

export const Store = createContext({});

const initialState = {
    expenses: {
        loading: true,
        data: []
    },
    categories: {
        loading: true,
        data: []
    },
    transactions: {
        loading: true,
        data: []
    }
}

const rootReducer = (state: any, action: any) => ({
    expenses: expensesSlice(state.expenses, action),
    categories: categoriesSlice(state.categories, action),
    transactions: transactionsSlice(state.transactions, action)
});


const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    // const value = { state, dispatch };
    return (
        // <Store.Provider value={value}>
        <Store.Provider value={{ state, dispatch }}>
            {children}
        </Store.Provider>
    )

}

export default StoreProvider;