import React from 'react'
import {Route} from 'react-router-dom'
import Announce from '../containers/Announce'

function AnnounceRouter() {
    return (
        <div>
            <Route path="/announce/:page" exact component={Announce}/>
        </div>
    )
}

export default AnnounceRouter
