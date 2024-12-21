const expensesSlice = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_EXPENSES_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_EXPENSES_DATA':
            return { ...state, data: action.payload };
        default:
            return state;
    }
};


export default expensesSlice;