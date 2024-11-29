import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import no_camera from "../../../assets/icons/no-camera.svg";
import SvgIcon from "../../components/icon/SvgIcon";
import { SVG } from "../../components/icon/Image";
import Slide from "../../components/animate/Slide";
import Fade from "../../components/animate/Fade";
import { Link } from "react-router-dom";

const RealtimeView = () => {
  const videoRef: any = useRef(null);

  const [loading, setLoading] = useState(true);
  const [hasCamera, setHasCamera] = useState(false);
  const [hasCameraPermission, setCameraPermission] = useState(false);

  useEffect(() => {
    const checkCameraAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");

        console.log(videoDevices);

        if (videoDevices && videoDevices[0]) {
          setHasCamera(true);
          if (videoDevices[0].deviceId) setCameraPermission(true);
        }
      } catch (err) {
        //
      } finally {
        setLoading(false);
      }
    };

    checkCameraAvailability();
  }, []);

  useEffect(() => {
    let stream: any = null;
    const openCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: "environment" },
        });
        console.log(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    };

    if (videoRef.current && hasCamera && hasCameraPermission) {
      openCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track: any) => track.stop());
      }
    };
  }, [hasCamera, hasCameraPermission]);

  const getCameraAccess = async () => {
    try {
      // Request access to the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {}
  };

  if (loading) return;

  if (!hasCamera) {
    return (
      <Stack gap={4} flex={1} justifyContent={"center"} alignItems={"center"}>
        <SvgIcon src={no_camera} height={240} sx={{ bgcolor: (theme) => theme.palette.grey[300] }} />
        <Stack alignItems={"center"}>
          <Typography fontWeight={"bold"}>We couldn't detect any camera at the moment.</Typography>
          <Typography variant="caption" fontWeight={500} color={"grey.500"}>
            A camera is required to continue the real-time test.
          </Typography>
        </Stack>
      </Stack>
    );
  }

  if (hasCamera && !hasCameraPermission) {
    return (
      <Container sx={{ height: 1, display: "flex" }}>
        <Stack gap={6} flex={1} alignItems={"center"} direction={{ md: "row" }}>
          <Stack width={1} flex={1} justifyContent={"center"}>
            <Fade key={"fade1"} value={0.3} duration={0.3} style={{}}>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                height={{ xs: 240, sm: 420 }}
                width={{ xs: 1, sm: 640 }}
                bgcolor={"grey.200"}
                borderRadius={2}
              >
                <SVG.warning active size={200} bgcolor="grey.500" />
              </Stack>
            </Fade>
          </Stack>

          <Slide key={"slide1"} withFade style={{ flex: 1 }}>
            <Stack gap={6} flex={1} justifyContent={"center"} alignItems={"center"}>
              <Stack gap={1} direction={"row"} alignItems={"center"}>
                <Typography variant="h4" fontWeight={500}>
                  Camera Found
                </Typography>
                <SVG.check active bgcolor="primary.main" size={32} />
              </Stack>
              <Stack alignItems={"center"}>
                <Typography fontWeight={"bold"}>You don't have the camera permission.</Typography>
                <Typography variant="caption" fontWeight={500} color={"grey.500"}>
                  Camera permission is required for accessing the video output.
                </Typography>

                <Typography pt={3} variant="caption" color={"grey.600"} textAlign={"center"} maxWidth={300}>
                  NOTE : If no popup comes out after clicking the button, then go the <b>site settings</b> and{" "}
                  <b>allow camera permission</b>
                </Typography>
              </Stack>

              <Stack>
                <Button variant="contained" color="primary" onClick={getCameraAccess}>
                  Give Permission
                </Button>
              </Stack>
            </Stack>
          </Slide>
        </Stack>
      </Container>
    );
  }

  return (
    <Container sx={{ height: 1, display: "flex" }}>
      <Stack py={6} gap={6} flex={1} alignItems={"center"} direction={{ lg: "row" }}>
        <Stack flex={1}>
          <Fade key={"fade2"} value={0.3} duration={0.3}>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              height={{ xs: 1, sm: 420 }}
              width={{ xs: 1, sm: 640 }}
              overflow={"hidden"}
              borderRadius={{ xs: 0, sm: 2 }}
            >
              <Box autoPlay muted component={"video"} ref={videoRef} width={1} zIndex={99} borderRadius={2}></Box>
            </Stack>
          </Fade>
        </Stack>

        <Slide key={"slide2"} withFade style={{ flex: 1 }}>
          <Stack gap={4} height={1} justifyContent={{ md: "center" }} alignItems={"center"}>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography variant="h4" fontWeight={500}>
                Camera Found
              </Typography>
              <SVG.check active bgcolor="primary.main" size={32} />
            </Stack>

            <Stack alignItems={"center"}>
              <Typography variant="body2" fontWeight={500} color={"grey.500"}>
                Your setup is ready, and you can start the test.
              </Typography>
            </Stack>

            <Stack>
              {
                // @ts-ignore
                <Button
                  color="primary"
                  variant="contained"
                  LinkComponent={Link}
                  to={"/app/realtime_start"}
                  onClick={getCameraAccess}
                >
                  Start Testing
                </Button>
              }
            </Stack>
          </Stack>
        </Slide>
      </Stack>
    </Container>
  );
};

export default RealtimeView;
