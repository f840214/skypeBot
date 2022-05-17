import React from 'react'
import AnnounceRouter from '../router/AnnounceRouter';
import ChannelRouter from '../router/ChannelRouter';
import UserRouter from '../router/UserRouter';

function Main (){
    return (
      <div style={{paddingTop:"64px",height:'calc(100vh - 64px)', width:'100%'}}>
        <div style={{padding:"20px"}}>
          <AnnounceRouter />
          <ChannelRouter />
          <UserRouter />
        </div>
      </div>
    )
}

export default Main
