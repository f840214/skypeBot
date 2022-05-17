import { TOGGLE_SUMMIT } from '../type';
const initialState = { isSubmit: false};

const announceReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SUMMIT:
            return { ...state, isSubmit: !state.isSubmit }
        default:
            return state;
    }
}

export default announceReducer;