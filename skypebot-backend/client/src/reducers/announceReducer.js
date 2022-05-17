import { FETCH_ANNOUNCE, DELETE_ANNOUNCE, UPDATE_ANNOUNCE, CREATE_ANNOUNCE, CHANGE_ANNOUNCE } from '../type';
const initialState = { total: [], form: {title: "", detail: "", type: "",}};

const announceReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ANNOUNCE:
            return { ...state, total: state.total.filter(announce=>announce._id!==action._id) };
        case FETCH_ANNOUNCE:
            return { ...state, total: action.payload };
        case CREATE_ANNOUNCE:
            return { ...state, total: state.total.concat(action.payload) }
        case CHANGE_ANNOUNCE:
            return { ...state, form: {...state.form, ...action.payload}  }
        case UPDATE_ANNOUNCE:
            return { ...state, total: state.total.map(announce=>announce._id === action.payload._id?action.payload:announce)  }
        default:
            return state;
    }
}

export default announceReducer;