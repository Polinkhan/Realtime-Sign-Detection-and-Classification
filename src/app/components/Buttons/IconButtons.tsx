import { IconButton, IconButtonProps, Theme } from "@mui/material";
import { m } from "framer-motion";

interface CustomIconButtonProps extends IconButtonProps {
  open?: boolean;
}

export const CustomIconButton = (props: CustomIconButtonProps) => {
  const { open, children, ...rest } = props;

  const inactive_bg = { background: (theme: Theme) => theme.palette.grey[300] };
  const active_bg = {
    background: (theme: Theme) => `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
  };

  return (
    <IconButton
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      sx={{ width: 32, height: 32, ...inactive_bg, ...(open && active_bg) }}
      {...rest}
    >
      {children}
    </IconButton>
  );
};
