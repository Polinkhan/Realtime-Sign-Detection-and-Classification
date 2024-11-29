/*
 * Project Name: "Aerosphare Suit"
 * Author: [Your Name]
 * Created: [Creation Date]
 * Modified: [Last Modification Date]
 *
 * Component: StyledTable
 * Description: A custom styled table component for rendering tabular data.
 */

import { Stack, SxProps, Table, TableBody, TableCell, TableContainer, TableRow, alpha, styled, tableCellClasses } from "@mui/material";
import { ReactNode } from "react";
import { HeaderTypes } from "../../common/types";
import TableHeadCustom from "./table-head-custom";

// ------------------------------------------------------------------
// Props interface for the StyledTable component.
// ------------------------------------------------------------------
interface StyledTableProps {
  children: ReactNode;
  header: Array<HeaderTypes>;
  sx?: SxProps;
}

// ------------------------------------------------------------------
// Styling for custom table cells.
// ------------------------------------------------------------------
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.9),
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

export const StickyTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.9),
    color: theme.palette.common.white,
    left: 0,
    position: "sticky",
    zIndex: 90,
  },
  [`&.${tableCellClasses.body}`]: {
    // backgroundColor: "#fff",
    fontSize: 13,
    left: 0,
    position: "sticky",
    zIndex: 80,
  },
}));

// ------------------------------------------------------------------
// Styling for custom table rows.
// ------------------------------------------------------------------
export const StyledTableRow = styled(TableRow)(() => ({
  // "&:nth-of-type(odd)": {
  //   backgroundColor: theme.palette.primary.lighter,
  // },
  // "&:nth-of-type(even)": {
  //   backgroundColor: alpha(theme.palette.primary.lighter, 0.3),
  // },
  // // Hide the last border in the table.
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.secondary.lighter, 0.5),
  //   "& .StickyCell": {
  //     backgroundColor: "#f8ddcd",
  //   },
  // },
}));

// ------------------------------------------------------------------
// Main component for the styled table.
// ------------------------------------------------------------------
const StyledTable = ({ children, header, sx }: StyledTableProps) => {
  return (
    <Stack sx={{ height: 1, justifyContent: "space-between" }}>
      <TableContainer sx={{ maxHeight: 1, borderRadius: 1, boxShadow: 1 }}>
        <Table stickyHeader size="small" sx={{ zIndex: 9999, ...sx }}>
          <TableHeadCustom headLabel={header} sx={sx} />
          <TableBody sx={{ height: 1, overflow: "auto" }}>{children}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default StyledTable;
