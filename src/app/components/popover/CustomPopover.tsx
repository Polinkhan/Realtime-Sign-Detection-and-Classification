// @mui
import { menuItemClasses } from "@mui/material/MenuItem";
import Popover, { PopoverOrigin, PopoverProps } from "@mui/material/Popover";
//

import { StyledArrow, getPopoverPosition } from "../../common/constants";
import { arrowPlacement } from "../../common/types";
interface MenuPopoverProps extends PopoverProps {
  arrow?: arrowPlacement;
  hiddenArrow?: boolean;
}

export default function CustomPopover({ open, children, arrow = "right-top", hiddenArrow, sx, ...other }: MenuPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPopoverPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open as any}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      slotProps={{
        paper: {
          sx: {
            width: "auto",
            overflow: "inherit",
            ...style,
            [`& .${menuItemClasses.root}`]: {
              "& svg": {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} />}

      {children}
    </Popover>
  );
}
