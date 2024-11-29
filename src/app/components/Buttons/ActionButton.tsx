/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright: Brotecs Technologies Limited
 *
 * Created: 2024-01-22 21:12:14
 * Modified: 2024-01-22 21:12:14
 *
 * Component : ActionButton
 * Description :
 */

import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { IconType } from "../../common/types";
import { getIcon } from "../icon/Icons";
import { Link } from "react-router-dom";

export interface ActionButtonProps extends IconButtonProps {
  title?: string;
  icon: IconType;
  link?: any;
  routerLink?: any;
  iconSize?: number;
}

const ActionButton = ({ title, icon, link, routerLink, iconSize = 18, ...rest }: ActionButtonProps) => {
  return (
    <Tooltip arrow title={title} placement="top">
      {link ? (
        // @ts-ignore
        <IconButton LinkComponent={"a"} href={link} {...rest}>
          {getIcon(icon, iconSize)}
        </IconButton>
      ) : routerLink ? (
        <Link to={routerLink}>
          <IconButton {...rest}>{getIcon(icon, iconSize)}</IconButton>
        </Link>
      ) : (
        <IconButton {...rest}>{getIcon(icon, iconSize)}</IconButton>
      )}
    </Tooltip>
  );
};

export default ActionButton;
