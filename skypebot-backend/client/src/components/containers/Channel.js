
import React from 'react';
import { connect } from 'react-redux';
import ChannelList from '../presental/Channel/ChannelList'
import { deleteChannel, updateChannel, changeFilter, fetchChannel } from '../../actions/channel';

class Channel extends React.Component {
    componentDidMount() {
        this.props.fetchChannel();
    }
    render() {
        const header= '聊天群列表';
        const { channelList, deleteChannel, updateChannel , filter, changeFilter, channelModalState, user } = this.props;
        return (<ChannelList channelList={channelList} deleteChannel={deleteChannel} updateChannel={updateChannel} header={header}  filter={filter} changeFilter={changeFilter} user={user} channelModalState={channelModalState}/>)
    }
}

const mapStateToProps = (state) => {
    return {
        channelList: state.channel.total,
        user: state.user.user,
        filter:state.channel.filter,
        channelModalState:state.channel.focus.channelModalState
    }
}
const mapDispatchToProps = (dispatch) => {
    return ({
        fetchChannel:()=>dispatch(fetchChannel()),
        deleteChannel:(_id)=>dispatch(deleteChannel(_id)),
        changeFilter:(filter)=>dispatch(changeFilter(filter)),
        updateChannel:(_id,data)=>dispatch(updateChannel(_id,data))
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Channel)

