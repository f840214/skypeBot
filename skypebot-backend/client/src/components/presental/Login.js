import React from 'react'
import { Paper, TextField, Typography, Button } from '@material-ui/core';
import styles from './Login.module.css';
function Login({onLogin, handleChange, userform}) {
  let {username,password} = userform;
  console.log(handleChange)
  return (
    <Paper className={styles.login}>
        <Typography className={styles.title} variant="h5">SkypeBot</Typography>
        <Typography className={styles.subtitle} variant="h6">請登入</Typography>
        <TextField
        label="username"
        name="username"
        type="text"
        value={username}
        onChange={handleChange('username')}
        />
        <TextField
        label="password"
        name="password"
        type="password"
        value={password}
        onChange={handleChange('password')}
        />
        <Button className={styles.button} fullWidth onClick={onLogin}>登入</Button>
    </Paper>
  )
}

export default Login
