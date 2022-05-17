import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Toolbar } from '@material-ui/core';
import styles from '../presental/AnnounceList.module.css';
import UpdateFill from '../UpdateFill'
function ChannelDetail({ header, channel, deleteComment, toggleState, changeSelectedChannel, updateSkypeName }) {
    let selectedChannel = channel.channel;
    let isUpdating = channel.isUpdating;

    return (
        <div>
            <Toolbar>
                <Typography variant="h6">{header}: <UpdateFill selectedChannel={selectedChannel} toggleState={toggleState} isUpdating={isUpdating} changeSelectedChannel={changeSelectedChannel} updateSkypeName={updateSkypeName} /> </Typography>
            </Toolbar>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>comment id</TableCell>
                        <TableCell>月份</TableCell>
                        <TableCell>評分</TableCell>
                        <TableCell>意見</TableCell>
                        <TableCell>上傳人</TableCell>
                        <TableCell>上傳日期</TableCell>
                        <TableCell>刪除</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {channel.comment.map(comment => (
                        <TableRow key={comment._id}>
                            <TableCell>{comment._id}</TableCell>
                            <TableCell>{comment.YM}</TableCell>
                            <TableCell>{comment.rating}</TableCell>
                            <TableCell className={styles.tableDetail}>{comment.content}</TableCell>
                            <TableCell>{comment.respondent}</TableCell>
                            <TableCell>{comment.created_at}</TableCell>
                            <TableCell><IconButton onClick={()=>deleteComment(comment._id)}><i className="fas fa-trash-alt"></i></IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ChannelDetail
