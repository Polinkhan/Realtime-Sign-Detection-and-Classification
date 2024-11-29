import { Box, CircularProgress, circularProgressClasses, Stack, Typography } from "@mui/material";
import Fade from "../../components/animate/Fade";

const Loading = ({ loading }: any) => {
  return (
    <Fade value={0.3}>
      <Stack gap={6} height={1} justifyContent={"center"} alignItems={"center"}>
        <Box position={"relative"}>
          <CircularProgress
            disableShrink
            variant="determinate"
            value={loading.progress}
            sx={(theme) => ({
              color: theme.palette.primary.main,
              animationDuration: "550ms",
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            })}
            size={240}
            thickness={2}
          />
          <Typography
            top={"50%"}
            left={"50%"}
            variant={"h2"}
            color={"grey.700"}
            position={"absolute"}
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            {loading.progress}%
          </Typography>
        </Box>

        <Typography variant="h3">Loading model</Typography>
      </Stack>
    </Fade>
  );
};

export default Loading;
