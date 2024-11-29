import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import banner from "../../../assets/images/banner.svg";
import bannerBg from "../../../assets/images/banner-bg.svg";
import { Link } from "react-router-dom";
import { SVG } from "../../components/icon/Image";
import Slide from "../../components/animate/Slide";

const Landing = () => {
  return (
    <Box
      height={1}
      sx={{ backgroundImage: `url(${bannerBg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      <Container sx={{ height: 1 }}>
        <Stack py={6} height={1} gap={6}>
          <Stack component={"header"} alignItems={"center"} gap={1} textAlign={"center"}>
            <Typography variant="h2">Computer Vision</Typography>
            <Typography variant="h3">Bangla Sign Language Recognition</Typography>
          </Stack>
          <Stack component={"main"} gap={10} flex={1} direction={{ md: "row" }}>
            <Stack gap={5} flex={1} justifyContent={"center"} alignItems={{ xs: "center", md: "start" }}>
              <Slide from="Up" withFade value={20} duration={0.75} style={{}}>
                <Typography textAlign={"justify"} color={"grey.700"}>
                  Welcome to the development version of our browser-based sign language detection app. This prototype
                  runs AI models natively, performing real-time hand detection and sign classification directly on your
                  device. No external servers are needed, allowing you to explore its functionality as we continue
                  refining its performance and accuracy.
                </Typography>
              </Slide>
              <Slide from="Down" withFade value={20} duration={0.75} style={{}}>
                {
                  //@ts-ignore
                  <Button
                    to="/app"
                    size="large"
                    color="primary"
                    variant="contained"
                    LinkComponent={Link}
                    endIcon={<SVG.app size={32} />}
                  >
                    Open in APP
                  </Button>
                }
              </Slide>
            </Stack>
            <Stack flex={1} alignItems={{ xs: "center", md: "end" }} justifyContent={"center"}>
              <Slide withFade value={120} duration={0.75}>
                <Box component={"img"} src={banner} sx={{ width: { xs: 350, md: 450 } }} />
              </Slide>
            </Stack>
          </Stack>

          <Stack component={"footer"} direction={"row"} gap={1} justifyContent={"center"}>
            <Typography variant="body2">@2024, All right reserved</Typography>
            <Divider orientation="vertical" />
            <Typography
              component={"a"}
              variant="body2"
              fontWeight={500}
              color={"primary.main"}
              href="https://polinkhan.com"
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              Abu Sayed Polin
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Landing;
