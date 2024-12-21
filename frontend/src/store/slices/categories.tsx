const categoriesSlice = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_CATEGORIES_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_CATEGORIES_DATA':
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default categoriesSlice;