/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * Component: App
 * Description: Custom dialog component for displaying content with a header and cancel button.
 */

import { ButtonProps, Dialog, DialogActions, DialogTitle, SxProps } from "@mui/material";
import { ReactNode } from "react";
import CustomButton from "../Buttons/CustomButton";

type modal = {
  open: boolean;
  onOpenModal: (res?: any) => void;
  onCloseModal: () => void;
  resource: any;
  setResource: React.Dispatch<any>;
  loadingState: boolean;
  setLoadingState: React.Dispatch<any>;
};

type Props = {
  width?: number;
  modal: modal;
  autoHeight?: boolean;
  autoWidth?: boolean;
  DialogBody: ReactNode;
  header: string;
  sx?: SxProps;

  actions?: Array<
    {
      name: string;
      onClick: () => void | Promise<void>;
      shouldLoading?: boolean;
    } & ButtonProps
  >;
};

// -----------------------------------------------------------------------------
// Component: CustomModal
// Purpose: A custom modal component for displaying content with a header and cancel button.
// Parameters:
// - DialogBody: The content to be displayed in the modal.
// - header: The header text for the modal.
// -----------------------------------------------------------------------------
const CustomModal = ({ width, modal, DialogBody, header, actions = [], sx }: Props) => {
  return (
    <Dialog PaperProps={{ sx: { minWidth: width || { xs: 0.95, sm: 500 }, ...sx } }} open={modal.open} onClose={modal.onCloseModal}>
      <DialogTitle>{header}</DialogTitle>

      {/* <Stack p={{ xs: 0, sm: 1 }} height={1} justifyContent={"center"}> */}
      {DialogBody}
      {/* </Stack> */}

      {actions.length > 0 && (
        <DialogActions>
          {actions?.map(({ name, onClick, shouldLoading, ...rest }, i) => (
            // @ts-ignore
            <CustomButton key={i} {...rest} variant="text" onClick={onClick} loading={shouldLoading && modal.loadingState}>
              {name}
            </CustomButton>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomModal;
