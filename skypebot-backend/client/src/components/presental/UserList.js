import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './List.module.css';
import {checkAdmin} from '../../helper/admin';

function UserList({ header, userList, deleteUser, user }) {
    let {role} = user;
    return (
        <>
            <Toolbar>
                <Typography variant="h6">{header}</Typography>
                {checkAdmin(role,<Link to="/user/add">
                    <IconButton>
                        <span className="fas fa-plus-square"></span>
                    </IconButton>
                </Link>)}
            </Toolbar>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>使用者 id</TableCell>
                        <TableCell>使用者名</TableCell>
                        <TableCell>角色</TableCell>
                        <TableCell>上傳日期</TableCell>
                        <TableCell>刪除</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {userList.map(user => (
                        <TableRow key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.created_at}</TableCell>
                            <TableCell>{checkAdmin(role,<IconButton onClick={() => deleteUser(user._id)}><i className="fas fa-trash-alt"></i></IconButton>)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default UserList
