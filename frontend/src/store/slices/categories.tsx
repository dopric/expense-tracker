const categoriesSlice = (state: any, action: any) => {
    switch (action.type) {
        case 'LOADING_CATEGORIES':
            return { ...state, loading: action.payload };
        case 'CATEGORIES_LOADED':
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default categoriesSlice;