import React, {useState} from 'react'
import { Button, Input } from '@material-ui/core';

function UpdateFill({ _id, content, updateContent, updateProperty}) {
    const [updatedContent, setContent] = useState(content);
    const [isUpdating, toggleState] = useState(false);
    const buttons = isUpdating?
        <Button onClick={async()=>{
            await updateContent(_id, {[updateProperty]: updatedContent});
            toggleState(!isUpdating);
        }}>送出</Button>:
        <Button onClick={e=>toggleState(!isUpdating)}>修改</Button>;
    return (<div style={{display:"flex"}}>
        <Input
            id="standard-adornment-weight"
            value={updatedContent}
            style={{flex:"1"}}
            disabled={!isUpdating}
            onChange={e=>setContent(e.target.value)}
          />
            {buttons}
        </div>
        // <>
        //     <input style={{height:"24px", width:"500px", fontSize:"20px"}} value={skypeName} disabled={!isUpdating} onChange={e=>changeSelectedChannel({skypeName:e.target.value})}/>
        //     
        // </>
    )
}

export default UpdateFill
