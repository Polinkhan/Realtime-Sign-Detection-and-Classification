import Fade from "./Fade";
import { LinearProgress, Stack, StackProps } from "@mui/material";

interface LoadingScreenProps extends StackProps {
  name?: string;
  removePadding?: boolean;
  sm?: boolean;
}

// -----------------------------------------------------------------------------
// Component: LoadingScreen
// Purpose: A custom component for displaying a loading screen with a progress bar.
// -----------------------------------------------------------------------------
const LoadingScreen = ({ sm, sx, name, removePadding, ...other }: LoadingScreenProps) => {
  if (removePadding) {
    return (
      <Fade style={{ width: sm ? 100 : "auto" }}>
        <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360, borderRadius: 99 }} />
      </Fade>
    );
  }

  return (
    <Stack
      sx={{
        px: 5,
        width: 1,
        flexGrow: 1,
        minHeight: 1,
        ...sx,
      }}
      {...other}
    >
      <Fade style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360, borderRadius: 99 }} />
      </Fade>
    </Stack>
  );
};

export default LoadingScreen;
