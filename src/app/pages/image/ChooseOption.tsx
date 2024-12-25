import { Divider, Stack, Typography } from "@mui/material";
import { SVG } from "../../components/icon/Image";

const ChooseOption = ({ setOption }: any) => {
  return (
    <Stack
      height={1}
      direction={"row"}
      justifyContent={"center"}
      divider={<Divider orientation="vertical" />}
      sx={{ cursor: "pointer" }}
    >
      <Stack
        flex={1}
        sx={{
          "&:hover": {
            flex: 1.25,
            "& .label": {
              fontSize: 64,
              color: "primary.main",
            },
            "& .icon": {
              width: 240,
              height: 240,
              bgcolor: "primary.main",
            },
          },
          transition: "0.3s all ease",
        }}
      >
        <Stack flex={1} justifyContent={"center"} alignItems={"center"} onClick={() => setOption("choose_image")}>
          <Typography className="label" sx={{ color: "grey.400", fontSize: 46, transition: "0.3s all ease" }}>
            Choose an image
          </Typography>
          <SVG.image active className="icon" size={160} bgcolor="grey.400" sx={{ transition: "0.3s all ease" }} />
        </Stack>
      </Stack>
      <Stack
        flex={1}
        sx={{
          "&:hover": {
            flex: 1.25,
            "& .label": {
              fontSize: 64,
              color: "primary.main",
            },
            "& .icon": {
              width: 240,
              height: 240,
              bgcolor: "primary.main",
            },
          },
          transition: "0.3s all ease",
        }}
      >
        <Stack flex={1} justifyContent={"center"} alignItems={"center"} onClick={() => setOption("take_image")}>
          <Typography className="label" sx={{ color: "grey.400", fontSize: 46, transition: "0.3s all ease" }}>
            Take a photo
          </Typography>
          <SVG.camera active className="icon" size={160} bgcolor="grey.400" sx={{ transition: "0.3s all ease" }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChooseOption;
