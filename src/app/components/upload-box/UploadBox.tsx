import { useDropzone, DropzoneOptions, Accept } from "react-dropzone";
import { SxProps, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";
import SvgIcon from "../icon/SvgIcon";
import { SVGICON } from "../images/Image";
import CustomButton from "../Buttons/CustomButton";

interface UploadProps extends DropzoneOptions {
  size?: "small" | "medium";
  placeholder?: string | ReactNode;
  disabled?: boolean;
  error?: any;
  sx?: SxProps;
  onDrop: any;
  file: any;
  reset?: any;
  accept?: {
    [key: string]: string[];
  };
}

const UploadBox = ({ placeholder, error, disabled, sx, accept, file, ...other }: UploadProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ disabled, accept, ...other });

  const hasFile = file != null;

  return (
    <Box
      {...getRootProps()}
      sx={{
        width: 1,
        height: 120,
        flexShrink: 0,
        display: "flex",
        borderRadius: 1,
        cursor: "pointer",
        alignItems: "center",
        color: "text.disabled",
        justifyContent: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.5)}`,
        transition: "0.15s",

        ...(isDragActive && {
          opacity: 0.72,
          color: "secondary.main",
          transform: "scale(0.95)",
          borderColor: "secondary.main",
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
        }),
        ...(hasFile && {
          border: (theme) => `dashed 1px ${alpha(theme.palette.primary.main, 0.5)}`,
        }),
        ...(disabled && {
          opacity: 0.48,
          pointerEvents: "none",
        }),
        "&:hover": {
          opacity: 0.72,
        },
        ...sx,
      }}
    >
      <input {...getInputProps()} />

      <Stack spacing={0.5} alignItems="center" sx={{ color: "text.disabled" }}>
        {file ? (
          <Typography height={40} variant="body2" color={"primary"} fontWeight={"bold"}>
            {file.name}
          </Typography>
        ) : (
          <SvgIcon src={SVGICON.Upload} height={50} sx={{ bgcolor: "currentcolor" }} />
        )}
        {file ? (
          <Typography variant="body2">Drag or click to change file</Typography>
        ) : (
          <Typography variant="body2">{placeholder ?? "Drag or click to upload"}</Typography>
        )}
      </Stack>
    </Box>
  );
};

export const UploadImageBox = ({ size = "medium", placeholder, error, disabled, sx, file, reset, ...other }: UploadProps) => {
  const accept: Accept = {
    jpg: ["image/jpeg"],
    jpeg: ["image/jpeg"],
    png: ["image/png"],
    gif: ["image/gif"],
    bmp: ["image/bmp"],
    tiff: ["image/tiff"],
    webp: ["image/webp"],
    svg: ["image/svg+xml"],
    ico: ["image/x-icon"],
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ disabled, accept, ...other });

  const hasFile = file != null;

  return (
    <Stack gap={2}>
      <Box
        {...getRootProps()}
        sx={{
          width: size === "medium" ? 300 : 250,
          height: size === "medium" ? 300 : 250,
          flexShrink: 0,
          display: "flex",
          borderRadius: 999,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          alignItems: "center",
          color: "text.disabled",
          justifyContent: "center",
          boxShadow: 5,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `dashed 2px ${alpha(theme.palette.grey[500], 0.5)}`,
          transition: "0.15s",

          ...(isDragActive && {
            opacity: 0.72,
            color: "secondary.main",
            transform: "scale(0.95)",
            borderColor: "secondary.main",
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
          }),
          ...(hasFile && {
            border: (theme) => `dashed 1px ${alpha(theme.palette.primary.main, 0.5)}`,
          }),
          ...(disabled && {
            pointerEvents: "none",
          }),
          "&:hover": {
            opacity: 0.72,
            boxShadow: 20,
          },
          ...sx,
        }}
      >
        <input {...getInputProps()} />

        <Stack
          width={1}
          height={1}
          spacing={0.5}
          borderRadius={999}
          overflow={"hidden"}
          alignItems="center"
          border={"6px solid #fff"}
          boxShadow={50}
          justifyContent={"center"}
          sx={{ color: "text.disabled" }}
        >
          {file ? (
            <Stack height={1} width={1}>
              <Box
                component={"img"}
                sx={{ objectFit: "fill", width: 1, height: 1 }}
                src={typeof file === "string" ? file : URL.createObjectURL(file)}
              />
            </Stack>
          ) : (
            <>
              <SvgIcon src={SVGICON.ImgAdd} height={50} sx={{ bgcolor: "currentcolor" }} />
              <Typography variant="body2">{placeholder ?? "Drag or click to upload image"}</Typography>
            </>
          )}
        </Stack>
      </Box>
      {file && reset && (
        <CustomButton icon="delete" color="primary" sx={{ alignSelf: "center" }} onClick={reset}>
          Remove Image
        </CustomButton>
      )}
    </Stack>
  );
};

export default UploadBox;
