import {combineReducers} from 'redux';
import announceReducer from './announceReducer';
import stateReducer from './stateReducer'
import channelReducer from './channelReducer'
import userReducer from './userReducer'

const reducers = combineReducers({
    announce: announceReducer,
    channel:channelReducer,
    state: stateReducer,
    user:userReducer
})

export default reducers