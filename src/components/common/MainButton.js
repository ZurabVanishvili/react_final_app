import { Button } from "@mui/material";

const MainButton = ({ variant, name, className, icon, onClick }) => {
  return (
    <Button
      variant={variant}
      className={className}
      startIcon={icon}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default MainButton;
