import React from "react";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import styles from "../upperNavBar.module.css";
import img1 from "../../../assets/images/profileImgs/img1.png";
import SearchBox from "../searchBox/searchBox";

export default function UpperNavbar() {
  // Assuming that Image is another component you've created
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Image = () => {
    return (
      <img
        src={img1}
        alt="Profile"
        className={styles.profileImage}
        style={{ width: 40, height: 40 }}
      />
    );
  };
  return (
    <div className={styles.container}>
      <SearchBox />
      <div className={styles.details}>
        <div>
          <Badge badgeContent={4} color="error">
            <NotificationsNoneIcon color="action" />
          </Badge>
        </div>
        <div className="profileImg">
          <Image />
        </div>
        <div className="name">
          <span style={{ fontWeight: "bold" }}>Dinul Perera</span>
          <br />
          <span style={{ fontSize: 10 }}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              A<span style={{ textTransform: "lowercase" }}>dministrator</span>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Admin Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </span>
        </div>
      </div>
    </div>
  );
}
