import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

function UserForm(props) {
  const { header, handleChange, form, createUser } = props;
  const { username, role } = form;
  const roleList= ["admin", "user"]
  return (
    <div>
      <Toolbar>
        <Typography variant="h6">{header}</Typography>
      </Toolbar>
      <form>
        <TextField
          label="username"
          name="username"
          margin="normal"
          fullWidth
          onChange={handleChange("username")}
          value={username}
        />
        <TextField
          select
          label="role"
          name="role"
          margin="normal"
          fullWidth
          onChange={handleChange("role")}
          value={role}
        >
          {roleList.map(role => (
            <MenuItem  key={role} value={role}>
              {role}
            </MenuItem >
          ))}
        </TextField>
        <Button type="button" onClick={()=>createUser({username,role})}>送出</Button>
      </form>
    </div>
  );
}

export default UserForm;