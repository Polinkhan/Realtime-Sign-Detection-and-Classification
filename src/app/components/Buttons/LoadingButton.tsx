/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * Component: App
 * Description: Custom component for a loading button that displays a circular progress indicator.
 */

import { Button, ButtonProps, CircularProgress, Stack } from "@mui/material";
import Slide from "../animate/Slide";
import { CheckRounded } from "@mui/icons-material";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  success?: boolean;
}

// -----------------------------------------------------------------------------
// Component: LoadingButton
// Purpose: A custom component for a loading button that displays a circular progress indicator.
// -----------------------------------------------------------------------------
const LoadingButton = (props: LoadingButtonProps) => {
  const { loading, success, children, sx, ...rest } = props;
  const disableStyle = { "&.Mui-disabled": { bgcolor: "primary.light", color: "#fff" } };

  if (success) {
    return (
      // @ts-ignore
      <Button key={"btn_success"} color={"main_success"} {...rest}>
        <Slide from="Down" value={5}>
          <Stack height={28} justifyContent={"center"} alignItems={"center"}>
            <CheckRounded />
          </Stack>
        </Slide>
      </Button>
    );
  }

  return (
    <Button disabled={loading} color={"primary"} sx={{ fontWeight: 500, ...disableStyle, ...sx }} {...rest}>
      <Stack justifyContent={"center"} height={28}>
        {loading ? <CircularProgress color="inherit" size={16} /> : children}
      </Stack>
    </Button>
  );
};

export default LoadingButton;
