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
import Axios from 'axios';
import {
    apiUrl
} from '../storage';
import { toggleSubmit } from './state';

export const emptyForm = () => (dispatch) => (dispatch({ type: CHANGE_USER_FORM, payload: { username: "", password: "", role: "" } }))

export const toggleLogin = () => ({
    type: TOGGLE_LOGIN
})

export const changeForm = (form) => (dispatch, getState) => {
    dispatch({
        type: CHANGE_LOGIN_FORM,
        payload: form
    })
}

export const onLogin = () => (dispatch, getState) => {
    let user = getState().user.form
    Axios.post(`${apiUrl}/user/login`, user).then(res => {
        console.log(res)
        let {username, role} = res.data;
        if(res.data.username){
            dispatch({
                type: LOGIN_USER,
                payload: {username, role}
            });
            dispatch(toggleLogin())
        } else {
            alert(res.data)
        }
    }).catch(err => {
        console.log(err);
        window.alert(err);
    })
}

export const initialUser = () => (dispatch, getState) => dispatch({type:INITIAL_USER})

export const fetchUser = () =>(dispatch, getState)=>{
    Axios.get(`${apiUrl}/user`)
    .then(res=>dispatch({type:FETCH_USER, payload: res.data}))
    .catch(err => {
        console.log(err);
        window.alert(err);
    })
}

export const createUser = ({ username, role }) => (dispatch, getState) => {
    dispatch(toggleSubmit())
    Axios.post(`${apiUrl}/user`, { username, role })
        .then(res => {
            // 清除表格內容
            dispatch(emptyForm());
            dispatch({
                type: CREATE_USER,
                payload: { username, role, created_at: "待定", _id: "待定" }
            });
        })
        .catch(err => {
            console.log(err);
            window.alert(err);
        })
};

export const deleteUser = (_id) => (dispatch, getState) => {
    Axios.delete(`${apiUrl}/user`,{params:{_id}}).then(res => {
        dispatch({ type: DELETE_USER, _id })
    }).catch(err => {
        console.log(err);
        window.alert(err);
    })
};

export const onLogout = (_id) => (dispatch, getState) => {
    Axios.delete(`${apiUrl}/user/logout`).then(res => {
        dispatch(initialUser());
    }).catch(err => {
        console.log(err);
        window.alert(err);
    })
};



