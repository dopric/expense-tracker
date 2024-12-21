const expensesSlice = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_EXPENSES_LOADING':
            return { ...state, loading: action.payload };
        case 'EXPENSES_LOADED':
            return { ...state, loading: false, data: action.payload };
        case 'ADD_EXPENSE':
            return { ...state, data: [...state.data, action.payload] };
        default:
            return state;
    }
};


export default expensesSlice;