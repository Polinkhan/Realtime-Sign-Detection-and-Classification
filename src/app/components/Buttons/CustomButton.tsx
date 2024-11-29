import { Button, ButtonProps, CircularProgress } from "@mui/material";

import { IconType } from "../../common/types";
import { Link } from "react-router-dom";
import { getIcon } from "../icon/Icons";

// @ts-ignore
interface CustomButtonProps extends ButtonProps {
  icon?: IconType;
  endIcon?: IconType;
  loading?: boolean;
  iconSize?: number;
  routerLink?: any;
  color?: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning" | "main_success";
}

const CustomButton = ({ routerLink, ...rest }: CustomButtonProps) => {
  if (routerLink) {
    return (
      <Link to={routerLink}>
        <MainComponent color="primary" {...rest} />
      </Link>
    );
  }
  return <MainComponent {...rest} />;
};

const MainComponent = ({ icon, endIcon, iconSize, loading, children, color, sx, ...rest }: CustomButtonProps) => {
  return (
    <Button
      // @ts-ignore
      color={color}
      disabled={loading}
      variant="text"
      startIcon={icon && getIcon(icon, iconSize)}
      endIcon={endIcon && getIcon(endIcon, iconSize)}
      sx={{ px: 2, ...sx }}
      {...rest}
    >
      {children} {loading && <CircularProgress color="inherit" size={16} sx={{ ml: 2 }} />}
    </Button>
  );
};

export default CustomButton;
