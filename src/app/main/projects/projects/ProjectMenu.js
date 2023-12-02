import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Link } from "react-router-dom";

const MainSidebarMoreMenu = ({ courseId }) => {
  const [moreMenuEl, setMoreMenuEl] = useState(null);

  function handleMoreMenuClick(event) {
    setMoreMenuEl(event.currentTarget);
  }

  function handleMoreMenuClose(event) {
    setMoreMenuEl(null);
  }
  return (
    <>
      <IconButton
        aria-owns={moreMenuEl ? "main-more-menu" : null}
        aria-haspopup="true"
        onClick={handleMoreMenuClick}
        size="large"
      >
        <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
      </IconButton>
      <Menu
        id="chats-more-menu"
        anchorEl={moreMenuEl}
        open={Boolean(moreMenuEl)}
        onClose={handleMoreMenuClose}
      >
        <MenuItem
          component={Link}
          to={`/project/courses/${courseId}`}
          onClick={() => {
            handleMoreMenuClose();
          }}
        >
          Visualizar
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/project/courses/edit/${courseId}`}
          onClick={() => {
            handleMoreMenuClose();
          }}
        >
          Editar
        </MenuItem>
        {/* <MenuItem onClick={handleMoreMenuClose}>Estados</MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>Usuarios</MenuItem> */}
        <MenuItem
          component={Link}
          to={`/project/courses/sendCredentials`}
          onClick={() => {
            handleMoreMenuClose();
          }}
        >
          Datos .env
        </MenuItem>
      </Menu>
    </>
  );
};

export default MainSidebarMoreMenu;
