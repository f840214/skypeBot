import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

function AnnounceForm({ header, handleReq, handleChange, username, form }) {
  const { title, detail, type } = form;
  const typeList= ["排定維護", "維護結束", "緊急公告", "其他公告"];
  let updatingForm = {...form, username}
  return (
    <div>
      <Toolbar>
        <Typography variant="h6">{header}</Typography>
      </Toolbar>
      <form>
        <TextField
          label="title"
          name="title"
          margin="normal"
          fullWidth
          onChange={handleChange("title")}
          value={title}
        />
        <TextField
          select
          label="type"
          name="type"
          margin="normal"
          fullWidth
          onChange={handleChange("type")}
          value={type}
        >
          {typeList.map(type => (
            <MenuItem  key={type} value={type}>
              {type}
            </MenuItem >
          ))}
        </TextField>

        <TextField
          label="username"
          name="username"
          margin="normal"
          fullWidth
          value={username}
          disabled
        />
        <TextField
          label="detail"
          name="detail"
          margin="normal"
          fullWidth
          multiline
          rowsMax="13"
          onChange={handleChange("detail")}
          value={detail}
        />
        <Button type="button" onClick={handleReq(updatingForm)}>送出</Button>
      </form>
    </div>
  );
}

export default AnnounceForm;
