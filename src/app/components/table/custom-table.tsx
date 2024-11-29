/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * File: CustomTable.tsx
 * Description: Contains custom table components.
 */

import { SxProps, Typography } from "@mui/material";
import useTable, { UseTableProps } from "../../hooks/use-table";
import PaginatedStylesTable, { StyledTableCell, StyledTableRow } from "./paginated-styled-table";
import { Callback, HeaderTypes, TableBodyKeyType, alignType } from "../../common/types";
import TableSkeleton from "./table-skeleton";
import { FunctionComponent, useEffect } from "react";
import StyledTable from "./styled-table";
import { searchFormetter } from "../../common/constants";
import { SVG } from "../images/Image";
import DefaultTableBody from "./default-table-body";

// ------------------------------------------------------------------
// Interface for the TableBodyProps.
// Parameters:
// - data: Data to be displayed in the table.
// - table: Table configuration.
// - onOpen: Callback function for opening a resource.
// - resource: Resource data (optional).
// ------------------------------------------------------------------
export interface TableBodyProps {
  data: any;
  table: any;
  resource?: any;
  paginated?: boolean;
  header: HeaderTypes[];
  defined?: boolean;
  viewOnly?: boolean;
  onOpen?: (any: any) => any;
}

// ------------------------------------------------------------------
// Interface for the TableProps.
// Parameters:
// - data: Data to be displayed in the table.
// - sx: Styling properties.
// - paginated: Whether the table should be paginated.
// - header: Header configuration.
// - dataFormatter: Function to format data (optional).
// - onOpen: Callback function for opening a resource (optional).
// - TableBody: Component for rendering the table body.
// - resource: Resource data (optional).
// - config: Table configuration.
// - table: Table configuration.
// ------------------------------------------------------------------
interface TableProps {
  data: any;
  error?: any;
  sx?: SxProps;
  paginated?: boolean;
  header: HeaderTypes[];
  dataFormatter?: (any: any) => any;

  enableSearch?: boolean;
  onOpen?: (any: any) => any;
  viewOnly?: boolean;
  TableBody?: FunctionComponent<TableBodyProps>;
  resource: {
    keys: TableBodyKeyType[];
    search?: string;
    permissions?: string[];
    callback?: Callback;
  };
  config?: UseTableProps;
  table?: any;
}

// ------------------------------------------------------------------
// CustomTable component.
// Parameters:
// - data: Data to be displayed in the table.
// - header: Header configuration.
// - sx: Styling properties.
// - paginated: Whether the table should be paginated.
// - config: Table configuration.
// ...rest: Additional props.
// ------------------------------------------------------------------

/**
 *
 * See Documentation:
 *
 * - [Custom Table Component](https://docs.google.com/document/d/1Gx1GEbqPl8X8LwvZ39nyiTz9c4y59_LZ/edit?usp=sharing&ouid=102465306400399914660&rtpof=true&sd=true)
 *
 */

export const CustomTable = (props: TableProps) => {
  const { error, data, header, sx, paginated, config, viewOnly, ...rest } = props;
  const table = useTable(config);

  if (paginated) {
    return (
      <PaginatedStylesTable table={table} header={header} viewOnly={viewOnly} sx={{ ...sx }}>
        {error ? (
          <ErrorCell />
        ) : data ? (
          <RenderBody paginated data={data} table={table} header={header} viewOnly={viewOnly} {...rest} />
        ) : (
          <TableSkeleton header={header} viewOnly={viewOnly} />
        )}
      </PaginatedStylesTable>
    );
  }

  return (
    <StyledTable header={header} sx={{ ...sx }}>
      {data ? (
        <RenderBody data={data} table={table} header={header} viewOnly={viewOnly} {...rest} />
      ) : (
        <TableSkeleton header={header} viewOnly={viewOnly} />
      )}
    </StyledTable>
  );
};

// ------------------------------------------------------------------
// CustomDefinedTable component.
// Parameters:
// - data: Data to be displayed in the table.
// - header: Header configuration.
// - sx: Styling properties.
// - paginated: Whether the table should be paginated.
// - table: Table configuration.
// ...rest: Additional props.
// ------------------------------------------------------------------
export const CustomDefinedTable = (props: TableProps) => {
  const { error, data, header, sx, paginated, config, table, viewOnly, ...rest } = props;

  return (
    <PaginatedStylesTable table={table} header={header} viewOnly={viewOnly} sx={{ ...sx }}>
      {error ? (
        <ErrorCell />
      ) : data ? (
        <RenderDefinedBody data={data} table={table} header={header} viewOnly={viewOnly} {...rest} />
      ) : (
        <TableSkeleton header={header} viewOnly={viewOnly} />
      )}
    </PaginatedStylesTable>
  );
};

// ------------------------------------------------------------------
// RenderBody component for rendering the table body.
// Parameters:
// - header: Header configuration.
// - TableBody: Component for rendering the table body.
// - dataFormatter: Function to format data (optional).
// - data: Data to be displayed in the table.
// - table: Table configuration.
// ...rest: Additional props.
// ------------------------------------------------------------------
interface RenderBodyProps extends TableProps {
  table: any;
}

const RenderBody = (props: RenderBodyProps) => {
  let { TableBody, dataFormatter, data, table, resource, enableSearch, ...rest } = props;

  // Memorizing data for not calling formatter function on every render
  // data = useMemo(() => (dataFormatter ? dataFormatter(data) : data), [data]);
  data = dataFormatter ? dataFormatter(data) : data;

  // Applying search formatter if needed
  if (enableSearch) {
    const { keys, search } = resource;
    data = search ? searchFormetter({ data, search, keys }) : data;
  }

  // Update row count in the table.
  useEffect(() => {
    table.setRowCount(data.length);
  }, [data.length]);

  if (data.length === 0) return <NoDataFound />;

  if (TableBody) return <TableBody data={data} table={table} resource={resource} {...rest} />;
  else return <DefaultTableBody data={data} table={table} resource={resource} {...rest} />;
};

// ------------------------------------------------------------------
// RenderDefinedBody component for rendering the defined table body.
// Parameters:
// - header: Header configuration.
// - TableBody: Component for rendering the table body.
// - dataFormatter: Function to format data (optional).
// - data: Data to be displayed in the table.
// - table: Table configuration.
// ...rest: Additional props.
// ------------------------------------------------------------------
const RenderDefinedBody = (props: RenderBodyProps) => {
  let { paginated, TableBody, dataFormatter, data, table, ...rest } = props;

  // Apply data formatting if provided.
  data = dataFormatter ? dataFormatter(data) : data;

  if (data.length === 0) return <NoDataFound />;

  if (TableBody) return <TableBody data={data} table={table} {...rest} />;
  else return <DefaultTableBody data={data} table={table} {...rest} />;
};

// ------------------------------------------------------------------
// NoDataFound component for displaying a message when no data is available.
// ------------------------------------------------------------------
export const NoDataFound = ({ size = "md" }: { size?: "sm" | "md" }) => {
  const valueProp: { align?: alignType; sx?: SxProps } = {
    align: "center",
    sx: { p: size === "md" ? 5 : 0, bgcolor: "#fff" },
  };

  return (
    <StyledTableRow sx={{ height: size === "md" ? "45vh" : 1 }}>
      <StyledTableCell colSpan={99} {...valueProp}>
        <SVG.FileNotFound default size={size === "md" ? 200 : 120} />
        <Typography variant={"h6"} color={"grey.500"} pb={size === "sm" ? 2 : 0}>
          No data available in the table
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

// ------------------------------------------------------------------
// ErrorCell component for displaying a message error occured
// ------------------------------------------------------------------
const ErrorCell = () => {
  const valueProp: { align?: alignType; sx?: SxProps } = { align: "center", sx: { py: 1.1 } };

  return (
    <StyledTableRow>
      <StyledTableCell colSpan={99} {...valueProp}>
        Something went wrong !! Can't Get Table Data
      </StyledTableCell>
    </StyledTableRow>
  );
};
