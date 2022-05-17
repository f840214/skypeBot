import React from 'react';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Toolbar } from '@material-ui/core';
import styles from '../List.module.css';
import {checkAdmin} from '../../../helper/admin';
// import ChangeName from './ChangeName';
// import ChangeState from './ChangeState';

function filtChannelName(list, filter){
 return list.filter(channel=>channel.skypeName.includes(filter))
}


function ChannelList({ channelList, deleteChannel, updateChannel, header , filter, changeFilter, user}) {
    const { role } = user;
    let filtedList =filter? filtChannelName(channelList, filter):channelList;
    return (
        <>
            <Toolbar>
                <Typography variant="h6">{header}</Typography>
                <label className={styles.search}>搜尋群組名:</label>
                <input value={filter} onChange={e=>changeFilter(e.target.value)}/>
            </Toolbar>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>群組 id</TableCell>
                        <TableCell>skype 群組名</TableCell>
                        <TableCell>創建日期</TableCell>
                        <TableCell>狀態</TableCell>
                        <TableCell>刪除</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {filtedList.map(group => (
                        <TableRow key={group._id} >
                            <TableCell>{group._id}</TableCell>
                            <TableCell>{group.skypeName}</TableCell>
                            <TableCell>{group.created_at.slice(0,10)}</TableCell>
                            <TableCell>
                                <Button size="small" variant="contained" color={group.active?"secondary":"primary"} onClick={() => 
                                    updateChannel(group._id, {active: !group.active})
                            }>{group.active?"禁用":"啟用"}</Button>
                            </TableCell>
                            <TableCell>
                                {checkAdmin(role,<IconButton onClick={() => deleteChannel(group._id)}><i className="fas fa-trash-alt"></i></IconButton>)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}


export default ChannelList