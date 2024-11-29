/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * File: TableHeadCustom.tsx
 * Description: Contains the custom table head component.
 */

import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { StyledTableCell } from "./styled-table";
import { HeaderTypes } from "../../common/types";
import { SxProps, Theme } from "@mui/material";

// ------------------------------------------------------------------
// Interface for the TableHeadCustom component props.
// Parameters:
// - order: Sorting order ("asc" or "desc").
// - orderBy: Field to be sorted by.
// - headLabel: Array of header labels.
// - rowCount: Total row count.
// - numSelected: Number of selected rows.
// - onSort: Callback for sorting.
// - onSelectAllRows: Callback for selecting all rows.
// - sx: Styling properties.
// ------------------------------------------------------------------
type Props = {
  // order?: "asc" | "desc";
  // orderBy?: string;
  headLabel: HeaderTypes[];
  viewOnly?: boolean;
  // rowCount?: number;
  // numSelected?: number;
  // onSort?: (id: string) => void;
  // onSelectAllRows?: (checked: boolean) => void;
  sx?: SxProps<Theme>;
};

// ------------------------------------------------------------------
// TableHeadCustom component for rendering the custom table head.
// Parameters:
// - order: Sorting order ("asc" or "desc").
// - orderBy: Field to be sorted by.
// - rowCount: Total row count.
// - headLabel: Array of header labels.
// - numSelected: Number of selected rows.
// - onSort: Callback for sorting.
// - onSelectAllRows: Callback for selecting all rows.
// - sx: Styling properties.
// ------------------------------------------------------------------
export default function TableHeadCustom({ headLabel, viewOnly, sx }: Props) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {/* {onSelectAllRows && (
          <StyledTableCell padding="checkbox">
            <Checkbox
              indeterminate={!!numSelected && numSelected < rowCount}
              checked={!!rowCount && numSelected === rowCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectAllRows(event.target.checked)}
            />
          </StyledTableCell>
        )} */}

        {headLabel.map(({ label, align, width }, i) => {
          // if (i === 0) {
          //   return (
          //     <StickyTableCell key={i} align={align || "center"} sx={{ ...sx, py: 1.5, minWidth: width }}>
          //       {label}
          //     </StickyTableCell>
          //   );
          // }
          if (viewOnly && label.toLowerCase() === "action") return;

          return (
            <StyledTableCell
              key={i}
              align={align ?? "center"}
              sx={{ py: 2, minWidth: width }}
              // sortDirection={orderBy === headCell.id ? order : false}
              // sx={{ width: headCell.width, minWidth: headCell.minWidth, py: 1.2 }}
            >
              {/* {/* {onSort ? ( */}
              {/* <TableSortLabel */}

              {/* // hideSortIcon
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : "asc"}
              // onClick={() => onSort(headCell.id)}
              // > */}
              {label}

              {/* {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>{order === "desc" ? "sorted descending" : "sorted ascending"}</Box>
                ) : null} */}
              {/* </TableSortLabel> */}
            </StyledTableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
