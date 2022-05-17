import React from 'react'
import {Route} from 'react-router-dom'
import User from '../containers/User'

function UserRouter() {
    return (
        <>
            <Route path="/user/:page" exact component={User}/>
        </>
    )
}

export default UserRouter
