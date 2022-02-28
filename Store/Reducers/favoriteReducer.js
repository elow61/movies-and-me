const initialState = {favoriteMovie: []}

function toggleFavorite(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favIndex = state.favoriteMovie.findIndex(item => item.id === action.value.id);
            if (favIndex !== -1) {
                nextState = {...state, favoriteMovie: state.favoriteMovie.filter((item, index) => index !== favIndex)}
            } else {
                nextState = {...state, favoriteMovie: [...state.favoriteMovie, action.value]}
            }
            return nextState || state;
        default:
            return state;
    }
}

export default toggleFavorite;
