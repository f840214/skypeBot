import React from 'react'

import { Button,Typography, Card, CardContent, CardActions, Input } from '@material-ui/core';

function ChangeState({onClose, onConfirm}) {
    return (
        <Card style={{width:'30vw', margin:'auto', marginTop:'10vh'}}>
            <CardContent>
                <Typography variant="h5" component="h2">
                <b>更改狀態</b>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary" onClick={onConfirm}>送出</Button>
                <Button size="small" variant="contained" onClick={onClose}>取消</Button>
            </CardActions>
        </Card>
    )
}


export default ChangeState
