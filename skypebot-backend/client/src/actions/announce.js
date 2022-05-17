import { FETCH_ANNOUNCE, DELETE_ANNOUNCE, UPDATE_ANNOUNCE, CREATE_ANNOUNCE, CHANGE_ANNOUNCE } from '../type';
import Axios from 'axios';
import { apiUrl } from '../storage'
import { toggleSubmit } from './state';

export const emptyForm = () => (dispatch) => (dispatch({ type: CHANGE_ANNOUNCE, payload: { detail: "", title: "", type: "", username: "" } }))

export const fetchAnnounce = () => (dispatch, getState) => {
    Axios.get(`${apiUrl}/announce`).then(res => {
        dispatch({ type: FETCH_ANNOUNCE, payload: res.data })
    }).catch(err => {
        console.log(err);
        window.alert(err);
    })
};

export const deleteAnnounce = (_id) => (dispatch, getState) => {
    Axios.delete(`${apiUrl}/announce`,{params:{_id}}).then(res => {
        dispatch({ type: DELETE_ANNOUNCE, _id })
    }).catch(err => {
        console.log(err);
        window.alert(err);
    })
};

export const updateAnnounce = ({ _id, detail, title, type, username, created_at }) => (dispatch, getState) => {
    dispatch(toggleSubmit())
    console.log(_id)
    Axios.put(`${apiUrl}/announce`, { _id, detail, title, type, username })
    .then(res => {
        console.log(res.data)
        emptyForm();
        dispatch({
            type: UPDATE_ANNOUNCE,
            payload: {...res.data, detail, title}
        });
    })
    .catch(err => {
        console.log(err);
        window.alert(err);
    })
};

export const createAnnounce = ({ detail, title, type, username }) => (dispatch, getState) => {
    dispatch(toggleSubmit())
    Axios.post(`${apiUrl}/announce`, { detail, title, type, username })
        .then(res => {
            // 清除表格內容
            emptyForm(dispatch);
            dispatch({
                type: CREATE_ANNOUNCE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            window.alert(err);
        })
};

export const changeForm = (form) => (dispatch, getState) => {
    dispatch({ type: CHANGE_ANNOUNCE, payload: form })
}

