import {
    CHANGE_LOGIN_FORM,
    CHANGE_USER_FORM,
    CREATE_USER,
    DELETE_USER,
    FETCH_USER,
    LOGIN_USER,
    INITIAL_USER,
    TOGGLE_LOGIN
} from '../type';
const initialState = {
    user: {
        username: "",
        role: "",
        _id:""
    },
    form: {
        username: "",
        password: ""
    },
    total: [],
    isLogin: false
};

const announceReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_FORM:
            return {
                ...state,
                form: {...state.form, ...action.payload}
            }
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case TOGGLE_LOGIN:
            return {
                ...state, isLogin: !state.isLogin
            }
        case INITIAL_USER:
            return initialState;
        case FETCH_USER:
            return {
                ...state, total: action.payload
            }
        case CHANGE_USER_FORM:
            return {
                    ...state, form: action.payload
            }
        case CREATE_USER:
            return {
                ...state, total: [...state.total, action.payload]
            }
        case DELETE_USER:
            return {
                ...state, total: state.total.filter(user=>user._id !== action._id)
            }
        default:
            return state;
    }
}



export default announceReducer;