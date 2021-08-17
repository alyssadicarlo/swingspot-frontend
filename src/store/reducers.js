const reducer = (state, action) => {
    switch(action.type) {
        case 'ON_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: true
            }
        case 'ON_LOGGED_OUT':
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default reducer;