const initialState = {favoriteMovie: []}

function favoriteReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const index = state.favoriteMovie.findIndex(item => item.id === action.value.id);
            if (index !== -1) {
                nextState = {...state, favoriteMovie: state.favoriteMovie.filter((item, i) => i.id !== index)}
            } else {
                nextState = {...state, favoriteMovie: [...state.favoriteMovie, action.value]}
            }
            return nextState || state;
        default:
            return state;
    }
}

export default favoriteReducer;
