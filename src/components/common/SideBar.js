import { ListItemButton, ListItemText } from "@mui/material";

const SideBar = ({ sideBarItem, sideBarCategory, className, categoryName }) => {
  return (
    <ListItemButton
      className={sideBarItem === categoryName ? className : null}
      onClick={() => sideBarCategory(sideBarItem)}
    >
      <ListItemText primary={sideBarItem} />
    </ListItemButton>
  );
};

export default SideBar;
