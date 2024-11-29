import { Drawer, Fab, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import MenuButton from "../../components/Buttons/MenuButton";
import { SideBarItems } from "./SideBar_Lists";
import SvgIcon from "../../components/icon/SvgIcon";
import app from "../../../assets/icons/app.svg";
import useToggle from "../../hooks/use-toggle";
import { SVG } from "../../components/icon/Image";

// -----------------------------------------------------------------------------
// Component: SideBar
// Purpose: The sidebar component for rendering the application's navigation menu.
// Parameters:
// - onClose: A function to close the sidebar.
// -----------------------------------------------------------------------------
const SideBar = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();

  return (
    <Stack p={2} gap={2} flex={1}>
      <Stack gap={1} direction={"row"} alignItems={"center"}>
        <SvgIcon src={app} height={60} sx={{ bgcolor: (theme) => theme.palette.primary.main }} />
        <Stack>
          <Typography variant="body2" fontWeight={500}>
            Computer Vision
          </Typography>
          <Typography color={"grey.600"} variant="caption" fontWeight={500}>
            Bangla Sign Language Recognition
          </Typography>
        </Stack>
      </Stack>
      <MenuList currentPath={location.pathname} onClose={onClose} />
    </Stack>
  );
};

// -----------------------------------------------------------------------------
// Component: MenuList
// Purpose: Component to render the list of menu items in the sidebar.
// Parameters:
// - currentPath: The current URL path.
// - onClose: A function to close the sidebar.
// -----------------------------------------------------------------------------
const MenuList = ({ currentPath, onClose }: { currentPath: string; onClose: any }) => {
  const paths = currentPath.split("/");

  return (
    <Stack flex={1} gap={1}>
      {SideBarItems.map(({ title, url, Icon, module }, i) => {
        return (
          <MenuButton
            key={i}
            active={paths.some((path) => module.includes(path))}
            title={title}
            Icon={Icon}
            url={url}
            onClose={onClose}
          />
        );
      })}
    </Stack>
  );
};

// -----------------------------------------------------------------------------
// Component: MobileSideBar
// Purpose: Component to render the mobile sidebar.
// Parameters:
// - open: A boolean indicating whether the sidebar is open.
// - onClose: A function to close the sidebar.
// -----------------------------------------------------------------------------
interface MobileSideBarProps {}

const MobileSideBar = ({}: MobileSideBarProps) => {
  const { open, onClose, onOpen } = useToggle();
  return (
    <>
      <Drawer PaperProps={{ sx: { p: 2, width: 300 } }} anchor={"left"} open={open} onClose={onClose}>
        <SideBar onClose={onClose} />
      </Drawer>
      <Fab color="primary" sx={{ position: "absolute", left: 20, bottom: 20 }} onClick={onOpen}>
        <SVG.menu />
      </Fab>
    </>
  );
};

export { SideBar, MobileSideBar };
