import {
    DELETE_CHANNEL,
    FETCH_CHANNEL,
    SELECT_CHANNEL,
    UPDATE_CHANNEL,
    CHANGE_CHANNEL_FILTER,
    CHANGE_SELECTED_CHANNEL
} from '../type';
import Axios from 'axios';
import {
    apiUrl
} from '../storage';

export const fetchChannel = () => dispatch => {
    Axios.get(`${apiUrl}/channel`).then(res => dispatch({
        type: FETCH_CHANNEL,
        payload: res.data
    })).catch(err => {
        console.log(err);
        window.alert(err);
    })
}

export const deleteChannel = _id => dispatch => {
    Axios.delete(`${apiUrl}/channel`,{params:{_id}}).then(res => {
        dispatch({
            type: DELETE_CHANNEL,
            _id
        })
    }).catch(err => {
        console.log(err);
        window.alert(err);
    })
};

export const updateChannel = (_id, update) => (dispatch, getState) => {
    console.log(_id, update)
    let channel = {
        ...getState().channel.total.filter(channel => channel._id === _id)[0],
        ...update
    }
    console.log(channel)
    Axios.put(`${apiUrl}/channel`, channel).then(res => {
        dispatch({
            type: UPDATE_CHANNEL,
            channel
        })
    }).catch(err => {
        console.log(err);
        window.alert(err);
    })
};

export const selectChannel = _id => (dispatch, getState) => {
    Axios.get(`${apiUrl}/channel`, {
        params: {
            _id
        }
    }).then(res=>{dispatch({
            type: SELECT_CHANNEL,
            channel: res.data
        })}).catch(err => {
        console.log(err);
        window.alert(err);
    })
};

export const changeFilter = filter => dispatch => {
    dispatch({type:CHANGE_CHANNEL_FILTER, payload:filter})
} 

export const changeSelectedChannel = update => dispatch => {
    dispatch({type:CHANGE_SELECTED_CHANNEL, payload: update})
} 
