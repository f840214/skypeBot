import React from "react";
import MenuList from "@material-ui/core/MenuList";
import { MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./Aside.module.css";

function Aside() {
  return (
    <div className={styles.aside}>
      <MenuList>
        <Link to={`/announce/all`} key="announce">
            <MenuItem className={styles.menu_item}>維護公告</MenuItem>
        </Link>
        <Link to={`/channel/list`} key="channel">
            <MenuItem className={styles.menu_item}>對話群列表</MenuItem>
        </Link>
        <Link to={`/user/all`} key="user">
            <MenuItem className={styles.menu_item}>使用者列表</MenuItem>
        </Link>
      </MenuList>
    </div>
  );
}

export default Aside;
