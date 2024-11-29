import { SVG } from "../../components/icon/Image";

interface SideBarItemTypes {
  title: string;
  url: string;
  Icon: any;
  module: Array<string>;
}
const SideBarItems: Array<SideBarItemTypes> = [
  { title: "Realtime", module: ["realtime", "realtime_start"], Icon: SVG.camera, url: "realtime" },
  { title: "Image Processor", module: ["image"], Icon: SVG.image, url: "image" },
  { title: "Video Processor", module: ["video"], Icon: SVG.video, url: "video" },
];

export { SideBarItems };
