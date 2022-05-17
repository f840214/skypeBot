import {
    FETCH_CHANNEL,
    SELECT_CHANNEL,
    DELETE_CHANNEL,
    UPDATE_CHANNEL,
    CHANGE_CHANNEL_FILTER,
    TOGGLE_CHANNEL_STATE,
    CHANGE_SELECTED_CHANNEL,
    TOGGLE_CHANNEL_MODAL_STATE
} from '../type';

const initialState = {
    total: [],
    focus: {
        channel: {},
        isUpdating: false,
        modalStatus:false
    },
    filter: ""
};

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CHANNEL_MODAL_STATE:
            return { ...state, focus: {...state.focus, modalStatus:!state.focus.modalStatus} };
        case DELETE_CHANNEL:
            return { ...state, total: state.total.filter(channel=>channel._id !== action._id) };
        case FETCH_CHANNEL:
            return {
                ...state,
                total: action.payload
            }
        case SELECT_CHANNEL:
            return {
                ...state,
                focus: {...state.focus, channel: action.channel}
            }
        case UPDATE_CHANNEL:
            return {
                ...state, total: state.total.map(channel=> channel._id === action.channel._id?action.channel:channel)
            }
        case CHANGE_CHANNEL_FILTER:
            return {
                ...state, filter: action.payload
            }
        case TOGGLE_CHANNEL_STATE:
            return {
                ...state, focus: {...state.focus, isUpdating:!state.focus.isUpdating}
            }
        case CHANGE_SELECTED_CHANNEL:
            return {
                ...state, focus: {...state.focus, channel: {...state.focus.channel, ...action.payload}}
            }
        default:
            return state;
    }
}

export default channelReducer;