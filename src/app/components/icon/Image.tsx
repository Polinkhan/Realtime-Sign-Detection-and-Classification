// -----------------------------------------
// Svg Images
// -----------------------------------------
import app from "../../../assets/icons/app.svg";
import menu from "../../../assets/icons/menu.svg";
import image from "../../../assets/icons/image.svg";
import check from "../../../assets/icons/check.svg";
import video from "../../../assets/icons/video.svg";
import camera from "../../../assets/icons/camera.svg";
import warning from "../../../assets/icons/warning.svg";
import cameraRotate from "../../../assets/icons/camera-rotate.svg";

import SvgIcon from "../icon/SvgIcon";
import { Box, BoxProps } from "@mui/material";

interface svgProps extends BoxProps {
  default?: boolean;
  active?: boolean;
  bgcolor?: string;
  size?: number;
}

const getSvgImage = (src: string, props: svgProps) => {
  if (props?.default) {
    const { size, ...rest } = props;
    return <Box component={"img"} height={size} src={src} {...rest} />;
  }

  return (
    <SvgIcon
      src={src}
      height={props.size}
      sx={{ bgcolor: (theme) => (props.active ? props.bgcolor ?? theme.palette.primary.main : "currentColor") }}
    />
  );
};

export const SVG = {
  app: (props: svgProps) => getSvgImage(app, props),
  menu: (props: svgProps) => getSvgImage(menu, props),
  image: (props: svgProps) => getSvgImage(image, props),
  check: (props: svgProps) => getSvgImage(check, props),
  video: (props: svgProps) => getSvgImage(video, props),
  camera: (props: svgProps) => getSvgImage(camera, props),
  warning: (props: svgProps) => getSvgImage(warning, props),
  cameraRotate: (props: svgProps) => getSvgImage(cameraRotate, props),
};
