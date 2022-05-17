import React from 'react'
import {Route} from 'react-router-dom'
import Channel from '../containers/Channel'
function ChannelRouter() {
    return (
        <div>
            <Route path="/channel/list" exact component={Channel}/>
        </div>
    )
}

export default ChannelRouter
