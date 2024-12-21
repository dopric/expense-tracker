const transactionsSlice = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_TRANSACTIONS_DATA':
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default transactionsSlice;