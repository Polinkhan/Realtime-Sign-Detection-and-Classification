/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * File: PaginatedStylesTable.tsx
 * Description: Contains the styled paginated table component.
 */

import { Box, Stack, SxProps, Table, TableBody, TableCell, TableContainer, TableRow, alpha, styled, tableCellClasses } from "@mui/material";
import TableHeadCustom from "./table-head-custom";
import { ReactNode } from "react";
import TablePaginationCustom from "./table-pagination-custom";

// ------------------------------------------------------------------
// Interface for the StyledTableProps.
// Parameters:
// - table: The table configuration.
// - header: Header configuration.
// - sx: Styling properties.
// - children: Child components.
// - defined: A boolean indicating if the table is defined (optional).
// ------------------------------------------------------------------
interface StyledTableProps {
  table: any;
  header: any;
  sx: SxProps;
  viewOnly?: boolean;
  children: ReactNode;
}

// ------------------------------------------------------------------
// StyledTableCell component for custom styling of table cells.
// ------------------------------------------------------------------
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.8),
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

// ------------------------------------------------------------------
// StyledTableRow component for custom styling of table rows.
// ------------------------------------------------------------------
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.lighter,
  },
  "&:nth-of-type(even)": {
    backgroundColor: alpha(theme.palette.primary.lighter, 0.3),
  },
  // Hide the last border in the table.
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// ------------------------------------------------------------------
// PaginatedStylesTable component for rendering a paginated table.
// Parameters:
// - children: Child components.
// - defined: A boolean indicating if the table is defined (optional).
// - table: The table configuration.
// - header: Header configuration.
// - sx: Styling properties.
// ------------------------------------------------------------------
const PaginatedStylesTable = ({ children, table, header, viewOnly, sx }: StyledTableProps) => {
  return (
    <Box height={1} overflow={"hidden"} p={1.5}>
      <Stack sx={{ height: 1, justifyContent: "space-between", borderRadius: 1, boxShadow: 2 }}>
        <TableContainer sx={{ maxHeight: 1, borderRadius: 1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
          {/* 
          TableSelectedAction and Tooltip components may be used for additional actions. 
          For example:
          <TableSelectedAction
            numSelected={table.selected.length}
            rowCount={rowCount}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                row_data.map((row: any) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={() => {}}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />
        */}

          <Table stickyHeader size="small" sx={{ zIndex: 9999, ...sx }}>
            <TableHeadCustom
              // order={table.order}
              // orderBy={table.orderBy}
              viewOnly={viewOnly}
              headLabel={header}
              // rowCount={table.rowCount}
              // numSelected={table.selected.length}
              // onSort={table.onSort}
              // onSelectAllRows={(checked) =>
              //   table.onSelectAllRows(
              //     checked,
              //     tableData.map((row, i) => i)
              //   )
              // }
            />
            <TableBody sx={{ height: 1, overflow: "auto" }}>{children}</TableBody>
          </Table>
        </TableContainer>

        <TablePaginationCustom defined table={table} count={table.rowCount} />
      </Stack>
    </Box>
  );
};

export default PaginatedStylesTable;
