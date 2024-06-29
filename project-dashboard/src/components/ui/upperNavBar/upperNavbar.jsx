import React from "react";
import { Badge, Button } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import styles from "../upperNavBar.module.css";

// notifications
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// notifications

export default function UpperNavBar() {
  // notification sidebar
  const [state, setState] = React.useState({
    right: false,
  });

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  // notification sidebar

  // Assuming that Image is another component you've created
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>
          <React.Fragment key={"right"}>
            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </React.Fragment>
        </div>
        <div
          className={styles.container}
          style={{ display: "flex", justifyContent: "right" }}
        >
          <div className={styles.details}>
            <div>
              <Badge badgeContent={4} color="error">
                <NotificationsNoneIcon
                  color="action"
                  onClick={toggleDrawer("right", true)}
                  style={{ cursor: "pointer" }}
                />
              </Badge>
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
                  Administrator
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
