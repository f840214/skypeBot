import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import styles from '../List.module.css';

function AnnounceList({ header, announceList, deleteAnnounce, handleSelect, user }) {
    let DeleteButton = function DeleteButton(announce, user){
        if (user.role==="admin"||announce.username===user.username){
            return (<IconButton onClick={() => deleteAnnounce(announce._id)}><i className="fas fa-trash-alt"></i></IconButton>)
        }
        return null
    }
    return (
        <>
            <Toolbar>
                <Typography variant="h6">{header}</Typography>
                <Link to="/announce/add">
                    <IconButton>
                        <span className="fas fa-plus-square"></span>
                    </IconButton>
                </Link>
            </Toolbar>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>公告 id</TableCell>
                        <TableCell>標題</TableCell>
                        <TableCell>更新日期</TableCell>
                        <TableCell>種類</TableCell>
                        <TableCell>上傳人</TableCell>
                        <TableCell>詳細</TableCell>
                        <TableCell>刪除</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {announceList.map(announce => 
                    {
                        let date = new Date(announce.updated_at);
                        return(
                        <TableRow key={announce._id}>
                            <TableCell>{announce._id}</TableCell>
                            <TableCell>{announce.title}</TableCell>
                            <TableCell>{date.toLocaleDateString()}</TableCell>
                            <TableCell className={styles.tableDetail}>{announce.type}</TableCell>
                            <TableCell className={styles.tableDetail}>{announce.username}</TableCell>
                            <TableCell><Link to="/announce/update"><IconButton onClick={handleSelect(announce._id)}><i className="fas fa-info-circle"></i></IconButton></Link></TableCell>
                            <TableCell>{DeleteButton(announce, user)}</TableCell>
                        </TableRow>
                    )}
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default AnnounceList
